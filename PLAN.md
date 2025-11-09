# Project Plan: Vibe Portfolio

## Overview

This document outlines the assumptions, architecture decisions, and implementation details for the Vibe Portfolio project.

## Assumptions

1. **Image Seeding**: Images are fetched from Picsum Photos using deterministic seeds to ensure reproducible builds. The seed is based on the image name/purpose (e.g., "headshot-vibe-portfolio", "project-1-ecommerce").

2. **Content Structure**: Content is stored in JSON files (`content/resume.json` and `content/projects.json`) for easy editing without code changes.

3. **Dark Mode**: Dark mode preference is stored in localStorage and respects system preferences on first visit.

4. **Contact Form**: The contact form API endpoint (`/api/contact`) currently logs submissions. In production, this should be integrated with an email service (e.g., SendGrid, Resend) or database.

5. **Deployment**: The application is configured for Cloud Run with the `PORT` environment variable, but can be deployed to any platform that supports Next.js.

6. **Testing**: Tests are written for key components (Navbar, ProjectCard, ContactForm) to ensure basic functionality.

## Image Seeding Strategy

### How It Works

1. **Deterministic Seeds**: Each image uses a unique seed string (e.g., "headshot-vibe-portfolio") that ensures the same image is fetched every time.

2. **Seeding Script**: The `scripts/seed-images.ts` script:
   - Fetches images from `https://picsum.photos/seed/<seed>/<width>/<height>`
   - Downloads and saves them to `public/images/`
   - Updates `content/projects.json` to reference local image paths
   - Skips already downloaded images to allow re-running

3. **Image Types**:
   - `headshot.jpg` - Profile picture (400x400)
   - `project-*.jpg` - Project images (800x600)
   - `gallery-*.jpg` - Gallery images (600x400)
   - `og-image.jpg` - Open Graph image (1200x630) - should be created manually

4. **Build Reproducibility**: Since images are seeded locally and committed to the repository (or generated during build), builds are reproducible.

### Replacing Images

To replace placeholder images:
1. Replace files in `public/images/` with your own images
2. Maintain the same filenames or update references in code
3. For projects, update `content/projects.json` if paths change

## Architecture Decisions

### Next.js App Router
- Uses the new App Router for better performance and developer experience
- Server components by default for better SEO and performance
- Client components marked with `"use client"` where needed (forms, theme toggle)

### Styling
- Tailwind CSS for utility-first styling
- Dark mode via `dark:` prefix and CSS variables
- Responsive design with mobile-first approach

### State Management
- React Context for theme management
- React Hook Form for form state
- Zod for schema validation

### Testing
- Vitest for test runner (faster than Jest)
- React Testing Library for component testing
- jsdom for DOM simulation

### Code Quality
- ESLint for linting
- Prettier for formatting
- Husky for pre-commit hooks
- TypeScript for type safety

## File Structure

```
vibe-portfolio/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── contact/       # Contact form endpoint
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── projects/          # Projects page
│   ├── skills/            # Skills page
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.txt         # Robots.txt
├── components/            # React components
│   ├── __tests__/        # Component tests
│   ├── ContactForm.tsx   # Contact form with validation
│   ├── Footer.tsx        # Footer component
│   ├── Hero.tsx          # Hero section
│   ├── Navbar.tsx        # Navigation bar
│   ├── PhotoGrid.tsx     # Gallery grid
│   ├── ProjectCard.tsx   # Project card component
│   ├── SkillsGrid.tsx    # Skills display
│   ├── ThemeProvider.tsx # Dark mode provider
│   └── Timeline.tsx      # Experience/education timeline
├── content/               # Content data
│   ├── projects.json     # Project data
│   └── resume.json       # Resume data
├── lib/                   # Utility functions
│   ├── data.ts           # Data fetching functions
│   └── utils.ts          # Utility functions
├── public/                # Static assets
│   └── images/           # Seeded images
├── scripts/               # Utility scripts
│   └── seed-images.ts    # Image seeding script
├── .github/               # GitHub configuration
│   └── workflows/        # CI/CD workflows
├── .husky/                # Git hooks
│   └── pre-commit        # Pre-commit hook
└── ...
```

## SEO Optimization

1. **Metadata**: Each page has unique metadata in `layout.tsx` and page files
2. **Sitemap**: Dynamic sitemap generated at `/sitemap.xml`
3. **Robots.txt**: Configured for search engine crawling
4. **Open Graph**: OG tags for social media sharing
5. **Semantic HTML**: Proper heading hierarchy and semantic elements
6. **Alt Text**: All images have descriptive alt text

## Accessibility

1. **ARIA Labels**: Interactive elements have proper ARIA labels
2. **Keyboard Navigation**: All interactive elements are keyboard accessible
3. **Focus Styles**: Visible focus indicators for keyboard navigation
4. **Color Contrast**: Sufficient contrast ratios for text
5. **Semantic HTML**: Proper use of HTML5 semantic elements
6. **Screen Reader Support**: Proper labeling and structure

## Deployment Considerations

### Cloud Run
- Uses `PORT` environment variable (defaults to 3000)
- Build command: `npm run build`
- Start command: `npm start` (uses PORT env var)
- Can use buildpacks or Dockerfile

### Environment Variables
- No required environment variables for basic functionality
- Contact form can be enhanced with email service API keys
- Image seeding uses public API (no API keys needed)

## Future Enhancements

1. **Email Integration**: Integrate contact form with email service
2. **Analytics**: Add Google Analytics or similar
3. **Blog**: Add blog functionality with MDX
4. **CMS Integration**: Integrate with headless CMS for content management
5. **Internationalization**: Add i18n support
6. **Animation**: Add smooth scroll animations
7. **PWA**: Make it a Progressive Web App

## Troubleshooting

### Images Not Loading
- Ensure `npm run seed:images` has been run
- Check that images exist in `public/images/`
- Verify image paths in `content/projects.json`

### Build Failures
- Run `npm run type-check` to check for TypeScript errors
- Run `npm run lint` to check for linting errors
- Ensure all dependencies are installed with `npm install`

### Tests Failing
- Ensure test dependencies are installed
- Check that mocks are properly configured
- Verify test environment setup

## Conclusion

This portfolio is designed to be production-ready, accessible, and easily customizable. The image seeding strategy ensures reproducible builds while allowing for easy replacement with custom images. The modular structure makes it easy to add new features and customize content.

