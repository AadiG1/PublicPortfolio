# Setup Instructions

This document provides step-by-step instructions to set up and run the Vibe Portfolio project.

## Prerequisites

- Node.js 20.x or higher (check with `node --version`)
- npm or yarn
- Git (for version control)

## Initial Setup

### 1. Install Dependencies

```bash
cd vibe-portfolio
npm install
```

### 2. Seed Images

Generate placeholder images from Picsum Photos:

```bash
npm run seed:images
```

This will:

- Create `public/images/` directory
- Download deterministic placeholder images
- Update `content/projects.json` with correct image paths

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run seed:images` - Seed placeholder images

## Git Initialization

### 1. Initialize Git Repository

```bash
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Create Initial Commit

```bash
git commit -m "Initial commit: Vibe Portfolio"
```

### 4. Add Remote Repository

```bash
git remote add origin <your-repository-url>
```

### 5. Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Code Quality

### Linting

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors (if possible)
npm run lint -- --fix
```

### Formatting

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### Type Checking

```bash
npm run type-check
```

## Pre-commit Hooks

Husky is configured to run linting, formatting, and type checking before each commit. This ensures code quality.

To bypass hooks (not recommended):

```bash
git commit --no-verify
```

## Production Build

### 1. Build for Production

```bash
npm run build
```

### 2. Start Production Server

```bash
npm run start
```

The server will start on port 3000 (or the PORT environment variable if set).

## Deployment

### Cloud Run

See the main README.md for Cloud Run deployment instructions.

### Other Platforms

- **Vercel**: Connect your GitHub repository to Vercel
- **Netlify**: Use Netlify's Next.js build settings
- **Docker**: Use the provided Dockerfile

## Troubleshooting

### Images Not Loading

1. Ensure images are seeded: `npm run seed:images`
2. Check that images exist in `public/images/`
3. Verify image paths in `content/projects.json`

### Build Failures

1. Run `npm run type-check` to check for TypeScript errors
2. Run `npm run lint` to check for linting errors
3. Ensure all dependencies are installed: `npm install`
4. Clear Next.js cache: `rm -rf .next`

### Tests Failing

1. Ensure test dependencies are installed
2. Check that mocks are properly configured
3. Verify test environment setup in `vitest.setup.ts`

### Port Already in Use

If port 3000 is already in use:

```bash
# Use a different port
PORT=3001 npm run dev
```

## Next Steps

1. Customize content in `content/resume.json` and `content/projects.json`
2. Replace placeholder images in `public/images/` with your own
3. Update metadata in `app/layout.tsx` for SEO
4. Customize styling in `tailwind.config.ts` and component files
5. Deploy to your preferred platform

## Support

For issues and questions, please open an issue on GitHub.
