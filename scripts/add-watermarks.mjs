#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PHOTO_DIR = path.join(__dirname, '../public/photography');

async function createWatermarkSVG(width, height) {
  // Calculate font sizes based on image dimensions
  const diagonalFontSize = Math.floor(width / 15);
  const instagramFontSize = Math.floor(width / 50);

  return Buffer.from(`
    <svg width="${width}" height="${height}">
      <defs>
        <style>
          .diagonal-text {
            font-family: 'Arial Black', 'Arial', sans-serif;
            font-weight: bold;
            font-size: ${diagonalFontSize}px;
            fill: white;
            opacity: 0.3;
            letter-spacing: 3px;
          }
          .instagram-text {
            font-family: 'Arial', sans-serif;
            font-weight: bold;
            font-size: ${instagramFontSize}px;
            fill: white;
            opacity: 0.7;
          }
        </style>
      </defs>

      <!-- Diagonal watermark -->
      <g transform="translate(${width/2}, ${height/2}) rotate(-30)">
        <text
          class="diagonal-text"
          text-anchor="middle"
          dominant-baseline="middle"
          style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5);"
        >
          JEFFREY YANG PHOTOGRAPHY
        </text>
      </g>

      <!-- Instagram handle - bottom right -->
      <text
        class="instagram-text"
        x="${width - 20}"
        y="${height - 20}"
        text-anchor="end"
        style="text-shadow: 1px 1px 3px rgba(0,0,0,0.5);"
      >
        @shotswithjeff
      </text>
    </svg>
  `);
}

async function addWatermark(imagePath) {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    const { width, height } = metadata;

    console.log(`🖼️  Processing: ${path.basename(imagePath)}`);
    console.log(`   Size: ${width}x${height}`);

    // Create watermark SVG
    const watermarkSVG = await createWatermarkSVG(width, height);

    // Create backup
    const backupPath = imagePath + '.backup';
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(imagePath, backupPath);
      console.log(`   ✓ Backup created`);
    }

    // Apply watermark
    await image
      .composite([{
        input: watermarkSVG,
        gravity: 'northwest'
      }])
      .toFile(imagePath + '.tmp');

    // Replace original
    fs.renameSync(imagePath + '.tmp', imagePath);

    console.log(`   ✅ Watermark added\n`);
    return true;

  } catch (error) {
    console.error(`   ❌ Error: ${error.message}\n`);
    return false;
  }
}

async function main() {
  console.log('💧 Adding Watermarks to Photos');
  console.log('================================\n');

  // Get all photos
  const files = fs.readdirSync(PHOTO_DIR)
    .filter(f => f.endsWith('.jpg') && !f.endsWith('.backup'))
    .map(f => path.join(PHOTO_DIR, f));

  if (files.length === 0) {
    console.log('⚠️  No photos found in public/photography/\n');
    return;
  }

  console.log(`Found ${files.length} photos\n`);

  let processed = 0;
  for (const file of files) {
    const success = await addWatermark(file);
    if (success) processed++;
  }

  console.log('================================');
  console.log(`✨ Complete! ${processed}/${files.length} photos watermarked`);
  console.log('\n💡 Original files backed up as .backup');
  console.log('   To restore: find public/photography -name "*.backup" -exec bash -c \'mv "$0" "${0%.backup}"\' {} \\;\n');
}

main().catch(console.error);
