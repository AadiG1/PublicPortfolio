# Quick Start Guide

## Run the Site Locally

### Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:

- Next.js, React, TypeScript
- Tailwind CSS
- Mammoth (for DOCX parsing)
- And all other dependencies

### Step 2: Ingest Your Resume (Required)

```bash
npm run ingest:docx
```

This will:

- Find your resume DOCX file (looks in `assets/resume.docx` or `../assets/`)
- Parse it and generate `content/resume.json`
- Display a log of what was extracted

**Note**: If you haven't placed your resume yet, the site will still work but with empty/placeholder content.

### Step 3: Seed Images (Optional but Recommended)

```bash
npm run seed:images
```

This downloads placeholder images to `public/images/`:

- `headshot.jpg` - Profile picture
- `project-1.jpg`, `project-2.jpg`, `project-3.jpg` - Project images
- `gallery-*.jpg` - Gallery images
- `og-image.jpg` - Open Graph image

### Step 4: Start Development Server

```bash
npm run dev
```

The server will start on **http://localhost:3000**

Open that URL in your browser to see your portfolio!

## Complete Command Sequence

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Ingest resume from DOCX
npm run ingest:docx

# 3. Seed placeholder images
npm run seed:images

# 4. Start dev server
npm run dev
```

Then open **http://localhost:3000** in your browser.

## Troubleshooting

### Port 3000 Already in Use

```bash
# Use a different port
PORT=3001 npm run dev
```

### Missing Dependencies

```bash
# Remove and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Resume Not Found

Make sure your resume DOCX is at one of these locations:

- `assets/resume.docx`
- `../assets/resume.docx`
- `../assets/Aditya Gupta - Resume.docx`

### Images Not Loading

```bash
# Re-seed images
npm run seed:images
```

## Other Useful Commands

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run tests
npm test

# Check code formatting
npm run format:check

# Type check
npm run type-check

# Lint code
npm run lint
```

## Need Help?

- Check `README.md` for detailed documentation
- Check `DOCX_INGESTION.md` for resume ingestion details
- Check `SETUP.md` for setup instructions
