#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ORIGINALS_DIR = path.join(__dirname, '../public/photography/originals');
const OUTPUT_DIR = path.join(__dirname, '../public/photography');
const MAX_DIMENSION = 2500;
const QUALITY = 85;

const VERTICAL_THRESHOLD = 0.85;
const SQUARE_THRESHOLD_MIN = 0.9;
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

async function processImage(inputPath, outputPath, category) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const { width, height, size } = metadata;
    const orientation = getOrientation(width, height);
    const aspectRatio = getAspectRatioString(width, height);
    const sizeMB = (size / (1024 * 1024)).toFixed(2);

    console.log(`\n📸 Processing: ${path.basename(inputPath)} [${category}]`);
    console.log(`   Original: ${width}x${height} (${aspectRatio}) - ${sizeMB}MB`);
    console.log(`   Orientation: ${orientation}`);

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
      category,
      originalSize: { width, height },
      resizedSize: { width: newWidth, height: newHeight },
    };
  } catch (error) {
    console.error(`   ❌ Error processing ${path.basename(inputPath)}:`, error.message);
    return null;
  }
}

async function processCategory(categoryName) {
  const categoryDir = path.join(ORIGINALS_DIR, categoryName);

  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  const files = fs.readdirSync(categoryDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.tif'].includes(ext);
  });

  if (files.length === 0) {
    return [];
  }

  console.log(`\n📁 Processing ${categoryName} (${files.length} images)...\n`);

  const results = [];
  for (const file of files) {
    const inputPath = path.join(categoryDir, file);
    const outputFilename = path.basename(file, path.extname(file)) + '.jpg';
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    const result = await processImage(inputPath, outputPath, categoryName);
    if (result) {
      results.push(result);
    }
  }

  return results;
}

async function main() {
  console.log('🖼️  Photo Resize Script v2 (Multi-Category)');
  console.log('=============================================\n');

  if (!fs.existsSync(ORIGINALS_DIR)) {
    fs.mkdirSync(ORIGINALS_DIR, { recursive: true });
    console.log(`📁 Created directory: ${ORIGINALS_DIR}\n`);
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Process each category
  const categories = ['nature', 'cars'];
  const allResults = [];

  for (const category of categories) {
    const results = await processCategory(category);
    allResults.push(...results);
  }

  if (allResults.length === 0) {
    console.log('⚠️  No images found.');
    console.log(`   Add images to: ${ORIGINALS_DIR}/nature/ or ${ORIGINALS_DIR}/cars/\n`);
    return;
  }

  // Summary
  console.log('\n\n📊 Summary');
  console.log('=======================');

  const orientationCounts = allResults.reduce((acc, r) => {
    acc[r.orientation] = (acc[r.orientation] || 0) + 1;
    return acc;
  }, {});

  const categoryCounts = allResults.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});

  console.log(`Total processed: ${allResults.length}`);
  console.log(`By orientation:`);
  console.log(`  Horizontal: ${orientationCounts.horizontal || 0}`);
  console.log(`  Vertical: ${orientationCounts.vertical || 0}`);
  console.log(`  Square: ${orientationCounts.square || 0}`);
  console.log(`By category:`);
  Object.entries(categoryCounts).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
  });

  console.log('\n✨ Done! Your photos are ready in public/photography/');
  console.log('   Update app/photography/photos.ts to add them to your gallery.\n');

  // Generate sample config by category
  console.log('📝 Sample photos.ts entries:\n');

  categories.forEach(category => {
    const categoryResults = allResults.filter(r => r.category === category);
    if (categoryResults.length > 0) {
      console.log(`// ${category.toUpperCase()}`);
      categoryResults.slice(0, 2).forEach((r, i) => {
        console.log(`  {
    id: '${category}-${i + 1}',
    title: 'Your Photo Title',
    category: '${category}',
    imagePath: '/photography/${r.filename}',
    orientation: '${r.orientation}',
    available: true,
  },`);
      });
      console.log('');
    }
  });
}

main().catch(console.error);
