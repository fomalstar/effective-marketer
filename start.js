#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, readdirSync } from 'fs';
import { cwd } from 'process';

console.log('🚀 Starting application...');
console.log('📁 Current working directory:', cwd());
console.log('🌍 Environment:', process.env.NODE_ENV);

// Check if we're in production and if dist exists
const isProduction = process.env.NODE_ENV === 'production';
const distExists = existsSync('./dist/client/index.html');

console.log('📦 Production mode:', isProduction);
console.log('📁 Dist directory exists:', distExists);

// Always check if we need to build (in case Render skipped build step)
if (isProduction && !distExists) {
  console.log('⚠️ WARNING: Production mode but no dist directory found!');
  console.log('🔧 This suggests Render did not run the build command properly.');
  console.log('💡 Please check Render dashboard build settings.');
}

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
    
    // Verify build output
    console.log('🔍 Verifying build output...');
    if (existsSync('./dist')) {
      console.log('📁 Dist directory exists after build');
      const distContents = readdirSync('./dist');
      console.log('📁 Dist contents:', distContents);
      
      if (existsSync('./dist/client')) {
        const clientContents = readdirSync('./dist/client');
        console.log('📁 Client contents:', clientContents);
      }
      
      if (existsSync('./dist/server')) {
        const serverContents = readdirSync('./dist/server');
        console.log('📁 Server contents:', serverContents);
      }
    } else {
      console.log('❌ Dist directory still missing after build!');
    }
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

console.log('🌐 Starting SSR server...');
execSync('node server-setup/ssr-server.mjs', { stdio: 'inherit' });
