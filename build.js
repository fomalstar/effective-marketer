#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🚀 Starting build process...');

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
