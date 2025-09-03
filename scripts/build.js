#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting custom build process...');

// Run Astro build
console.log('📦 Building with Astro...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Astro build completed successfully');
} catch (error) {
  console.error('❌ Astro build failed:', error.message);
  process.exit(1);
}

// Create html directory if it doesn't exist
const htmlDir = path.join('dist', 'html');
if (!fs.existsSync(htmlDir)) {
  fs.mkdirSync(htmlDir, { recursive: true });
}

// Move HTML files to html subdirectory
console.log('📁 Organizing HTML files...');
const distDir = 'dist';

try {
  // Move index.html
  if (fs.existsSync(path.join(distDir, 'index.html'))) {
    fs.renameSync(
      path.join(distDir, 'index.html'),
      path.join(htmlDir, 'index.html')
    );
    console.log('✅ Moved index.html to dist/html/');
  }

  // Move privacy/index.html
  const privacyDir = path.join(distDir, 'privacy');
  if (fs.existsSync(privacyDir)) {
    if (fs.existsSync(path.join(privacyDir, 'index.html'))) {
      fs.renameSync(
        path.join(privacyDir, 'index.html'),
        path.join(htmlDir, 'privacy.html')
      );
      console.log('✅ Moved privacy/index.html to dist/html/privacy.html');
    }
    // Remove empty privacy directory
    fs.rmdirSync(privacyDir);
  }

  // Move terms/index.html
  const termsDir = path.join(distDir, 'terms');
  if (fs.existsSync(termsDir)) {
    if (fs.existsSync(path.join(termsDir, 'index.html'))) {
      fs.renameSync(
        path.join(termsDir, 'index.html'),
        path.join(htmlDir, 'terms.html')
      );
      console.log('✅ Moved terms/index.html to dist/html/terms.html');
    }
    // Remove empty terms directory
    fs.rmdirSync(termsDir);
  }

  console.log('🎉 Build process completed successfully!');
  console.log('📁 HTML files are now in: dist/html/');
  console.log('📁 Static assets are in: dist/');

} catch (error) {
  console.error('❌ Error organizing files:', error.message);
  process.exit(1);
}
