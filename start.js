#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🚀 Starting application...');

// Check if we're in production and if dist exists
const isProduction = process.env.NODE_ENV === 'production';
const distExists = existsSync('./dist/client/index.html');

if (isProduction && !distExists) {
  console.log('📦 Production mode detected but dist directory missing');
  console.log('🔨 Running build process...');
  
  try {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('🗺️ Generating sitemap...');
    execSync('npm run sitemap', { stdio: 'inherit' });
    
    console.log('🔨 Building client and server...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('📡 Submitting to IndexNow...');
    try {
      execSync('npm run indexnow', { stdio: 'inherit' });
    } catch (indexnowError) {
      console.log('⚠️ IndexNow submission failed (this is optional):', indexnowError.message);
    }
    
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

console.log('🌐 Starting SSR server...');
execSync('node server-setup/ssr-server.mjs', { stdio: 'inherit' });
