# DOCX Resume Ingestion

This document describes the DOCX resume ingestion system implemented for the Vibe Portfolio.

## Overview

The portfolio now pulls all content from your resume DOCX file instead of using placeholder data. The ingestion script parses your DOCX file and generates a structured JSON file that powers all pages.

## How It Works

1. **Place your resume DOCX file** at `assets/resume.docx` (or in the parent directory's `assets/` folder)
2. **Run the ingestion script**: `npm run ingest:docx`
3. **The script**:
   - Converts DOCX to HTML and plain text using mammoth
   - Parses sections using flexible heading matching
   - Extracts structured data (dates, locations, bullets, links)
   - Generates `content/resume.json` with both HTML and text versions
   - Displays a parse log showing what was found

## Supported Sections

The script recognizes these sections with flexible heading formats:

- **Summary/Profile**: "Summary", "Profile", "About", "Objective", "Overview"
- **Skills**: "Skills", "Technical Skills", "Competencies"
- **Experience**: "Experience", "Professional Experience", "Employment", "Work History"
- **Education**: "Education", "Academic", "Qualifications"
- **Projects**: "Projects", "Portfolio", "Work Samples"
- **Awards**: "Awards", "Honors", "Achievements", "Recognition"

## Data Structure

The generated `resume.json` includes:

```json
{
  "summaryText": "Plain text summary",
  "summaryHtml": "<p>HTML formatted summary</p>",
  "skills": [
    {
      "name": "TypeScript",
      "level": 90,
      "category": "Language"
    }
  ],
  "experience": [
    {
      "title": "Software Engineer",
      "company": "Company Name",
      "location": "City, State",
      "startDate": "2024-01",
      "endDate": "2024-12",
      "current": false,
      "bullets": ["Achievement 1", "Achievement 2"],
      "bulletsHtml": ["<p>Achievement 1</p>", "<p>Achievement 2</p>"]
    }
  ],
  "education": [...],
  "projects": [...],
  "awards": [...]
}
```

## Features

### Flexible Parsing
- Handles various date formats (MM/YYYY, Month YYYY, YYYY)
- Extracts locations from parentheses or after commas
- Recognizes bullet points in multiple formats
- Detects URLs and links automatically

### HTML Preservation
- Preserves formatting (bold, italic, lists) in HTML form
- Provides plain text versions for fallback
- Safely sanitizes HTML before rendering

### Robust Error Handling
- Validates parsed data with Zod schemas
- Provides detailed parse logs
- Handles missing sections gracefully

## Usage

### First Time Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Place your resume DOCX at `assets/resume.docx`

3. Run ingestion:
   ```bash
   npm run ingest:docx
   ```

4. Verify output:
   ```bash
   cat content/resume.json
   ```

### Updating Resume

1. Edit `assets/resume.docx`
2. Run `npm run ingest:docx`
3. All pages will automatically update

## Page Integration

All pages now use the parsed resume data:

- **Home**: Summary, skills, featured projects
- **About**: Summary, experience, education, awards, gallery
- **Skills**: All skills with categories and proficiency levels
- **Projects**: Projects from resume (or fallback to portfolio projects)

## HTML Rendering

HTML content is safely rendered using the `SafeHtml` component, which:
- Sanitizes HTML to prevent XSS attacks
- Allows safe tags (p, br, strong, em, ul, ol, li, a, headings)
- Preserves formatting while ensuring security

## Troubleshooting

### No Sections Found
- Check that your DOCX has clear headings
- Try using standard section names (Summary, Skills, Experience, etc.)
- The script will attempt to parse the whole document if sections aren't found

### Missing Data
- Verify your DOCX structure matches expected formats
- Check the parse log for warnings
- Some fields are optional and won't break the site if missing

### Date Parsing Issues
- Use consistent date formats (MM/YYYY or Month YYYY)
- Include "Present" or "Current" for ongoing positions
- Dates are normalized to YYYY-MM format

## Technical Details

### Dependencies
- `mammoth`: DOCX to HTML conversion
- `zod`: Schema validation
- `isomorphic-dompurify`: HTML sanitization

### Script Location
- `scripts/ingest-resume-docx.ts`

### Output Location
- `content/resume.json`

### Integration Points
- `lib/data.ts`: Data access functions
- `components/SafeHtml.tsx`: HTML rendering component
- All page components: Use `getResume()` to access data

## Future Enhancements

Potential improvements:
- Support for PDF resumes
- Automatic image extraction from DOCX
- More sophisticated date/location parsing
- Skill level detection from context
- Link validation and formatting

