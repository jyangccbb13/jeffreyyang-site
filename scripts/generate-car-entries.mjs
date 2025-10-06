#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../public/photography');

function getOrientation(width, height) {
  const ratio = height / width;
  if (ratio >= 0.9 && ratio <= 1.1) return 'square';
  return ratio > 0.85 ? 'vertical' : 'horizontal';
}

async function generateEntry(filename, id) {
  const imagePath = path.join(OUTPUT_DIR, filename);
  const metadata = await sharp(imagePath).metadata();
  const orientation = getOrientation(metadata.width, metadata.height);

  const title = filename.replace(/\.(jpg|JPG|jpeg)$/, '').replace(/_/g, ' ');

  return `  {
    id: 'car-${id}',
    title: '${title}',
    category: 'cars',
    imagePath: '/photography/${filename}',
    price: 150,
    dimensions: '16x20"',
    orientation: '${orientation}',
    available: true,
  }`;
}

async function main() {
  const files = fs.readdirSync(OUTPUT_DIR)
    .filter(f => f.match(/^(2L9A|IMG_1|IMG_2235|IMG_4|IMG_8|R6__5)/));

  const entries = [];
  for (let i = 0; i < files.length; i++) {
    const entry = await generateEntry(files[i], i + 1);
    entries.push(entry);
  }

  console.log(entries.join(',\n'));
}

main().catch(console.error);
