#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🚀 Starting SSR server...');

// Check if dist exists, if not, run build
if (!existsSync('./dist/client/index.html')) {
  console.log('📦 Dist directory missing, running build...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Start the SSR server
execSync('node server-setup/ssr-server.mjs', { stdio: 'inherit' });
