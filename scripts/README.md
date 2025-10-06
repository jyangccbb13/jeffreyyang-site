# Photography Scripts

## Resizing Photos

This script automatically resizes your high-resolution photos, detects their orientation, and optimizes them for web display.

### Setup

1. Place your original high-resolution photos in:
   ```
   public/photography/originals/
   ```

2. Run the resize script:
   ```bash
   node scripts/resize-photos.mjs
   ```

### What it does

- **Detects orientation automatically:**
  - **Horizontal**: Width > Height (e.g., 3:2, 16:9, 10:8)
  - **Vertical**: Height > Width (e.g., 2:3, 9:16, 8:10)
  - **Square**: ~1:1 ratio (e.g., 1:1, close to square)

- **Resizes images:**
  - Maximum dimension: 2500px (maintains aspect ratio)
  - Quality: 85% JPEG
  - Uses mozjpeg for better compression

- **Saves optimized images to:**
  ```
  public/photography/
  ```

### Example Output

```
📸 Processing: IMG_4532.jpg
   Original: 6000x4000 (3:2) - 24.5MB
   Orientation: horizontal
   Resized: 2500x1667 - 1.8MB
   ✅ Saved 22.7MB (92.7% reduction)
```

### Adding Photos to Your Gallery

After running the script, update `app/photography/photos.ts`:

```typescript
export const photos: Photo[] = [
  {
    id: '1',
    title: 'Sunset Over Mountains',
    category: 'framed',
    imagePath: '/photography/IMG_4532.jpg',
    price: 150,
    dimensions: '16x20"',
    orientation: 'horizontal', // Auto-detected!
    description: 'Beautiful sunset captured in the Rocky Mountains',
    available: true,
  },
];
```

### Grid Layout Behavior

The gallery automatically adjusts based on orientation:

- **Horizontal photos**: Take 2 columns width
- **Vertical photos**: Take 2 rows height (tall)
- **Square photos**: Take 2x2 grid space (large)

This creates a dynamic, Pinterest-style masonry layout that looks professional!

### Tips

- Keep originals in the `originals/` folder as backups
- Run script whenever you add new photos
- Script converts all formats (PNG, TIFF, etc.) to optimized JPEG
