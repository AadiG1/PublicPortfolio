# How to Replace the Headshot Image

## Quick Steps

1. **Prepare your photo:**
   - Format: JPG or PNG
   - Recommended size: 400x400px to 800x800px (square aspect ratio works best)
   - File size: Keep under 500KB for best performance

2. **Replace the file:**
   - Save your photo as: `public/images/headshot.jpg`
   - This will replace the placeholder image

3. **Verify:**
   - Run `npm run dev` and check the homepage
   - The image will automatically appear in the Hero section and About page

## File Location

```
vibe-portfolio/
└── public/
    └── images/
        └── headshot.jpg  ← Replace this file
```

## Notes

- The image will be automatically optimized by Next.js Image component
- The image is used in:
  - Homepage (Hero section)
  - About page
- Make sure the image is a square or near-square for best appearance
- The image will be cropped to a circle in the UI

## After Replacing

The seed-images script will automatically skip downloading a new headshot if your custom image exists.
