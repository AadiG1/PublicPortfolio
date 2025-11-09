# Vibe Portfolio

A production-ready Next.js + TypeScript + Tailwind CSS personal portfolio that is fully responsive and accessible.

## Features

- 🎨 Modern, responsive design with dark mode support
- ♿ Fully accessible (WCAG compliant)
- 🚀 Built with Next.js 14 (App Router)
- 💅 Styled with Tailwind CSS
- 📱 Mobile-first, fully responsive
- 🔍 SEO optimized with metadata, sitemap, and robots.txt
- 📝 Contact form with validation
- 🧪 Tested with Vitest and React Testing Library
- 🔧 ESLint, Prettier, and Husky for code quality
- 🖼️ Automatic image seeding with placeholder service

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd vibe-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Ingest resume from DOCX file:

```bash
npm run ingest:docx
```

This will parse `assets/resume.docx` and generate `content/resume.json`.

4. Seed images (downloads placeholder images):

```bash
npm run seed:images
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
- `npm run ingest:docx` - Parse resume DOCX file and generate resume.json

## Project Structure

```
vibe-portfolio/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── projects/          # Projects page
│   ├── skills/            # Skills page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── __tests__/        # Component tests
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── PhotoGrid.tsx
│   ├── ProjectCard.tsx
│   ├── SkillsGrid.tsx
│   ├── ThemeProvider.tsx
│   └── Timeline.tsx
├── content/               # Content data
│   ├── projects.json
│   └── resume.json
├── lib/                   # Utility functions
│   ├── data.ts
│   └── utils.ts
├── public/                # Static assets
│   └── images/           # Seeded images
├── scripts/               # Utility scripts
│   ├── seed-images.ts
│   └── ingest-resume-docx.ts
├── assets/                # Source assets (optional)
│   └── resume.docx       # Your resume DOCX file
└── ...
```

## Updating Resume Content

The portfolio pulls content from your resume DOCX file:

1. Place your resume DOCX file at `assets/resume.docx` (or in the parent directory's `assets/` folder).

2. Run the ingestion script:

   ```bash
   npm run ingest:docx
   ```

3. The script will:
   - Parse your DOCX file using mammoth
   - Extract sections: Summary, Skills, Experience, Education, Projects, Awards
   - Generate `content/resume.json` with both HTML and text versions
   - Display a parse log showing what was found

4. The script supports flexible heading formats:
   - "Summary" or "Profile" or "About"
   - "Skills" or "Technical Skills"
   - "Experience" or "Professional Experience" or "Work History"
   - "Education" or "Academic" or "Qualifications"
   - "Projects" or "Portfolio"
   - "Awards" or "Honors" or "Achievements"

5. After ingestion, all pages (Home, About, Skills, Projects) will automatically use the parsed data.

## Replacing Images

To replace placeholder images with your own:

1. Replace the images in `public/images/` directory:
   - `headshot.jpg` - Your profile picture
   - `project-1.jpg`, `project-2.jpg`, `project-3.jpg` - Project images
   - `gallery-*.jpg` - Gallery images

2. Update `content/projects.json` if you add/remove projects or change image paths (or update your resume DOCX and re-run ingestion).

3. For Open Graph image, replace `public/images/og-image.jpg` (1200x630px recommended).

## Deployment

### Cloud Run (Recommended)

The project is configured for Cloud Run with buildpacks or Docker. The `server.js` automatically reads the `PORT` environment variable that Cloud Run provides.

**Option 1: Using Buildpacks (Simplest)**

```bash
gcloud run deploy vibe-portfolio \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

**Option 2: Using Docker**

```bash
# Build and deploy with Docker
gcloud run deploy vibe-portfolio \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

The Dockerfile is already configured and will:

- Install dependencies
- Seed images during build
- Build the Next.js application
- Start the server on the PORT provided by Cloud Run

### Other Platforms

- **Vercel**: Connect your GitHub repository to Vercel for automatic deployments
- **Netlify**: Use Netlify's Next.js build settings
- **Docker**: Use the Dockerfile above for containerized deployments

## Customization

### Update Content

1. **Update Resume**: Edit `assets/resume.docx` and run `npm run ingest:docx` to regenerate `content/resume.json`
2. **Update Projects**: Either edit `content/projects.json` directly, or add projects to your resume DOCX and re-run ingestion
3. **Update Metadata**: Edit `app/layout.tsx` for SEO and site-wide metadata

### Styling

- Modify `tailwind.config.ts` for theme customization
- Update `app/globals.css` for global styles
- Component styles are in individual component files

### Dark Mode

Dark mode is handled by the `ThemeProvider` component and uses system preferences by default. Users can toggle it manually using the button in the navbar.

## Testing

Run tests with:

```bash
npm test
```

Tests are located in `components/__tests__/` and use Vitest with React Testing Library.

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Support

For issues and questions, please open an issue on GitHub.
