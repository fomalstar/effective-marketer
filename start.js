#!/usr/bin/env node

console.log('🚀 Starting SSR server...');
import { execSync } from 'child_process';

// Simply start the SSR server - Render should handle the build
execSync('node server-setup/ssr-server.mjs', { stdio: 'inherit' });
