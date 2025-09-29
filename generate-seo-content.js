#!/usr/bin/env node

/**
 * 🤖 AUTOMATIC SEO CONTENT GENERATOR
 * 
 * This script automatically generates SEO content for ALL pages.
 * It runs as part of the build process to ensure content is always up-to-date.
 */

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🤖 Automatic SEO Content Generator');
console.log('📄 Generating content for ALL pages...');

try {
  // Run the content extractor
  execSync('node COMPLETE-ALL-SECTIONS-EXTRACTOR.cjs', { stdio: 'inherit' });
  
  console.log('\n✅ SEO content generation completed successfully!');
  console.log('🚀 All pages now have complete SEO content in view source');
  
} catch (error) {
  console.error('❌ Error generating SEO content:', error.message);
  process.exit(1);
}
