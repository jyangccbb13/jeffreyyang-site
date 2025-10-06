#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SOURCE_DIR = path.join(__dirname, '../public/photography/originals');
const OUTPUT_DIR = path.join(__dirname, '../public/photography');
const MAX_DIMENSION = 2500; // Max width or height in pixels
const QUALITY = 85; // JPEG quality (1-100)

// Aspect ratio thresholds
const VERTICAL_THRESHOLD = 0.85; // height/width ratio > 0.85 is considered vertical
const SQUARE_THRESHOLD_MIN = 0.9; // Between 0.9 and 1.1 is square
const SQUARE_THRESHOLD_MAX = 1.1;

function getOrientation(width, height) {
  const ratio = height / width;

  if (ratio >= SQUARE_THRESHOLD_MIN && ratio <= SQUARE_THRESHOLD_MAX) {
    return 'square';
  } else if (ratio > VERTICAL_THRESHOLD) {
    return 'vertical';
  } else {
    return 'horizontal';
  }
}

function getAspectRatioString(width, height) {
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

async function processImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    const { width, height, format, size } = metadata;
    const orientation = getOrientation(width, height);
    const aspectRatio = getAspectRatioString(width, height);
    const sizeMB = (size / (1024 * 1024)).toFixed(2);

    console.log(`\n📸 Processing: ${path.basename(inputPath)}`);
    console.log(`   Original: ${width}x${height} (${aspectRatio}) - ${sizeMB}MB`);
    console.log(`   Orientation: ${orientation}`);

    // Calculate new dimensions while maintaining aspect ratio
    let newWidth = width;
    let newHeight = height;

    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      if (width > height) {
        newWidth = MAX_DIMENSION;
        newHeight = Math.round((height * MAX_DIMENSION) / width);
      } else {
        newHeight = MAX_DIMENSION;
        newWidth = Math.round((width * MAX_DIMENSION) / height);
      }
    }

    // Resize and optimize
    await image
      .resize(newWidth, newHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSizeMB = (outputStats.size / (1024 * 1024)).toFixed(2);
    const savedMB = (sizeMB - outputSizeMB).toFixed(2);
    const savedPercent = ((savedMB / sizeMB) * 100).toFixed(1);

    console.log(`   Resized: ${newWidth}x${newHeight} - ${outputSizeMB}MB`);
    console.log(`   ✅ Saved ${savedMB}MB (${savedPercent}% reduction)`);

    return {
      filename: path.basename(outputPath),
      orientation,
      aspectRatio,
      originalSize: { width, height },
      resizedSize: { width: newWidth, height: newHeight },
    };

  } catch (error) {
    console.error(`   ❌ Error processing ${path.basename(inputPath)}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🖼️  Photo Resize Script');
  console.log('=======================\n');

  // Create directories if they don't exist
  if (!fs.existsSync(SOURCE_DIR)) {
    fs.mkdirSync(SOURCE_DIR, { recursive: true });
    console.log(`📁 Created directory: ${SOURCE_DIR}`);
    console.log('   Place your original high-res photos in this folder!\n');
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all image files from source directory
  const files = fs.readdirSync(SOURCE_DIR).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'].includes(ext);
  });

  if (files.length === 0) {
    console.log('⚠️  No images found in the originals folder.');
    console.log(`   Add images to: ${SOURCE_DIR}\n`);
    return;
  }

  console.log(`Found ${files.length} image(s) to process...\n`);

  const results = [];

  for (const file of files) {
    const inputPath = path.join(SOURCE_DIR, file);
    const outputFilename = path.basename(file, path.extname(file)) + '.jpg';
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    const result = await processImage(inputPath, outputPath);
    if (result) {
      results.push(result);
    }
  }

  // Summary
  console.log('\n\n📊 Summary');
  console.log('=======================');

  const orientationCounts = results.reduce((acc, r) => {
    acc[r.orientation] = (acc[r.orientation] || 0) + 1;
    return acc;
  }, {});

  console.log(`Total processed: ${results.length}`);
  console.log(`Horizontal: ${orientationCounts.horizontal || 0}`);
  console.log(`Vertical: ${orientationCounts.vertical || 0}`);
  console.log(`Square: ${orientationCounts.square || 0}`);

  console.log('\n✨ Done! Your photos are ready in public/photography/');
  console.log('   Update app/photography/photos.ts to add them to your gallery.\n');

  // Generate sample config
  console.log('📝 Sample photos.ts entries:\n');
  results.slice(0, 3).forEach((r, i) => {
    console.log(`  {
    id: '${i + 1}',
    title: 'Your Photo Title',
    category: 'framed',
    imagePath: '/photography/${r.filename}',
    price: 150,
    dimensions: '16x20"',
    orientation: '${r.orientation}',
    available: true,
  },`);
  });
}

main().catch(console.error);
