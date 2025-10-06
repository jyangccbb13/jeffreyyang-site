#!/usr/bin/env node

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagePath = path.join(__dirname, '../public/photography/IMG_2610.jpg');

async function rotateImage() {
  try {
    console.log('Rotating IMG_2610.jpg 90° counterclockwise...');

    await sharp(imagePath)
      .rotate(-90)
      .toFile(imagePath + '.tmp');

    // Replace original with rotated version
    const fs = await import('fs');
    fs.renameSync(imagePath + '.tmp', imagePath);

    console.log('✅ Image rotated successfully!');
  } catch (error) {
    console.error('Error rotating image:', error);
  }
}

rotateImage();
