# Quick Start Commands

## Initial Setup

```bash
# 1. Navigate to project directory
cd vibe-portfolio

# 2. Install dependencies
npm install

# 3. Seed images (downloads placeholder images)
npm run seed:images

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Git Setup

```bash
# 1. Initialize Git repository
git init

# 2. Add all files
git add .

# 3. Create initial commit
git commit -m "Initial commit: Vibe Portfolio"

# 4. Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/vibe-portfolio.git

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run tests
npm test

# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

## Deployment to Cloud Run

```bash
# Deploy using buildpacks (simplest)
gcloud run deploy vibe-portfolio \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Or deploy using Docker
gcloud run deploy vibe-portfolio \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Image Management

```bash
# Seed images (downloads placeholder images)
npm run seed:images

# Images are saved to public/images/
# - headshot.jpg
# - project-1.jpg, project-2.jpg, project-3.jpg
# - gallery-1.jpg through gallery-6.jpg
# - og-image.jpg
```

## Testing

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Code Quality

```bash
# Check linting
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check

# Type check
npm run type-check
```

## Troubleshooting

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear and reseed images
rm -rf public/images
npm run seed:images
```
