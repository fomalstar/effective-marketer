#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, readdirSync } from 'fs';
import { cwd } from 'process';

console.log('🚀 Starting SSR server...');
console.log('📁 Current directory:', cwd());

// Check if dist exists
const distExists = existsSync('./dist');
const clientExists = existsSync('./dist/client');
const indexExists = existsSync('./dist/client/index.html');

console.log('📁 Dist directory exists:', distExists);
console.log('📁 Client directory exists:', clientExists);
console.log('📁 Index.html exists:', indexExists);

if (distExists) {
  try {
    const distContents = readdirSync('./dist');
    console.log('📁 Dist contents:', distContents);
  } catch (e) {
    console.log('❌ Error reading dist directory:', e.message);
  }
}

// Always run build in production to ensure we have the latest files
console.log('🔨 Running build to ensure dist directory exists...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Start the SSR server
console.log('🌐 Starting SSR server...');
execSync('node server-setup/ssr-server.mjs', { stdio: 'inherit' });
