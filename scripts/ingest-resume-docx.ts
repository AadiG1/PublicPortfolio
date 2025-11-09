import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import { z } from "zod";

// Try multiple possible paths for the resume file
const possiblePaths = [
  path.join(process.cwd(), "assets", "resume.docx"),
  path.join(process.cwd(), "..", "assets", "resume.docx"),
  path.join(process.cwd(), "..", "assets", "Aditya Gupta - Resume.docx"),
  path.join(process.cwd(), "assets", "Aditya Gupta - Resume.docx"),
];

let RESUME_DOCX: string | null = null;
for (const possiblePath of possiblePaths) {
  if (fs.existsSync(possiblePath)) {
    RESUME_DOCX = possiblePath;
    break;
  }
}

// If not found, try to find any .docx file in assets
if (!RESUME_DOCX) {
  const assetsDirs = [
    path.join(process.cwd(), "assets"),
    path.join(process.cwd(), "..", "assets"),
  ];

  for (const assetsDir of assetsDirs) {
    if (fs.existsSync(assetsDir)) {
      const files = fs.readdirSync(assetsDir);
      const docxFile = files.find((f) => f.toLowerCase().endsWith(".docx"));
      if (docxFile) {
        RESUME_DOCX = path.join(assetsDir, docxFile);
        break;
      }
    }
  }
}

if (!RESUME_DOCX) {
  throw new Error(
    `Resume DOCX file not found. Tried: ${possiblePaths.join(", ")}`
  );
}

const OUTPUT_FILE = path.join(process.cwd(), "content", "resume.json");

// Schema for validation
const ResumeSchema = z.object({
  summaryText: z.string().optional(),
  summaryHtml: z.string().optional(),
  skills: z
    .array(
      z.object({
        name: z.string(),
        level: z.number().optional(),
        category: z.string().optional(),
      })
    )
    .optional(),
  experience: z
    .array(
      z.object({
        title: z.string(),
        company: z.string(),
        location: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().nullable().optional(),
        current: z.boolean().optional(),
        bullets: z.array(z.string()).optional(),
        bulletsHtml: z.array(z.string()).optional(),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        degree: z.string(),
        school: z.string(),
        location: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        description: z.string().optional(),
        descriptionHtml: z.string().optional(),
      })
    )
    .optional(),
  projects: z
    .array(
      z.object({
        name: z.string(),
        role: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        bullets: z.array(z.string()).optional(),
        bulletsHtml: z.array(z.string()).optional(),
        links: z.array(z.string()).optional(),
      })
    )
    .optional(),
  awards: z
    .array(
      z.object({
        title: z.string(),
        organization: z.string().optional(),
        date: z.string().optional(),
        description: z.string().optional(),
        descriptionHtml: z.string().optional(),
      })
    )
    .optional(),
});

type ResumeData = z.infer<typeof ResumeSchema>;

// Robust heading matcher
const HEADING_PATTERNS = {
  summary: /^(summary|profile|about|objective|overview)$/i,
  skills: /^(skills?|technical skills?|competencies)$/i,
  experience:
    /^(experience|work experience|professional experience|employment|work history)$/i,
  education: /^(education|academic|qualifications)$/i,
  projects: /^(projects?|portfolio|work samples)$/i,
  awards: /^(awards?|honors?|achievements?|recognition)$/i,
};

function normalizeHeading(heading: string): string | null {
  const normalized = heading.trim().toLowerCase();
  for (const [section, pattern] of Object.entries(HEADING_PATTERNS)) {
    if (pattern.test(normalized)) {
      return section;
    }
  }
  return null;
}

// Extract dates (supports various formats)
function extractDates(text: string): {
  startDate?: string;
  endDate?: string | null;
  current?: boolean;
} {
  const datePatterns = [
    /(\w+\s+\d{4})\s*[-–—]\s*(\w+\s+\d{4}|Present|Current)/i,
    /(\d{4})\s*[-–—]\s*(\d{4}|Present|Current)/i,
    /(\w+\/\d{4})\s*[-–—]\s*(\w+\/\d{4}|Present|Current)/i,
  ];

  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      const start = match[1].trim();
      const end = match[2].trim();
      const isCurrent = /present|current/i.test(end);
      return {
        startDate: normalizeDate(start),
        endDate: isCurrent ? null : normalizeDate(end),
        current: isCurrent,
      };
    }
  }

  // Try to find just a start date
  const startMatch = text.match(/(\w+\s+\d{4}|\d{4})/i);
  if (startMatch) {
    return {
      startDate: normalizeDate(startMatch[1]),
    };
  }

  return {};
}

function normalizeDate(dateStr: string): string {
  // Convert "Jan 2024" to "2024-01", "2024" to "2024-01", etc.
  const monthMap: Record<string, string> = {
    jan: "01",
    january: "01",
    feb: "02",
    february: "02",
    mar: "03",
    march: "03",
    apr: "04",
    april: "04",
    may: "05",
    jun: "06",
    june: "06",
    jul: "07",
    july: "07",
    aug: "08",
    august: "08",
    sep: "09",
    september: "09",
    oct: "10",
    october: "10",
    nov: "11",
    november: "11",
    dec: "12",
    december: "12",
  };

  // Try "Month YYYY" format
  const monthYearMatch = dateStr.match(/(\w+)\s+(\d{4})/i);
  if (monthYearMatch) {
    const month = monthMap[monthYearMatch[1].toLowerCase()] || "01";
    return `${monthYearMatch[2]}-${month}`;
  }

  // Try "YYYY" format
  const yearMatch = dateStr.match(/(\d{4})/);
  if (yearMatch) {
    return `${yearMatch[1]}-01`;
  }

  // Try "MM/YYYY" format
  const slashMatch = dateStr.match(/(\d{1,2})\/(\d{4})/);
  if (slashMatch) {
    const month = slashMatch[1].padStart(2, "0");
    return `${slashMatch[2]}-${month}`;
  }

  return dateStr;
}

// Extract location (usually in parentheses or after a comma)
function extractLocation(text: string): string | undefined {
  const locationPatterns = [
    /\(([^)]+)\)/,
    /,\s*([A-Z][^,]+(?:,\s*[A-Z][^,]+)?)$/,
  ];

  for (const pattern of locationPatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return undefined;
}

// Convert HTML to plain text (simple version)
function htmlToText(html: string): string {
  return html
    .replace(/<[^>]+>/g, "") // Remove HTML tags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

// Parse bullets from HTML
function extractBullets(html: string): {
  bullets: string[];
  bulletsHtml: string[];
} {
  const bulletMatches = html.match(/<li[^>]*>(.*?)<\/li>/gs);
  if (!bulletMatches) {
    // Try to find bullet points in plain text
    const lines = html.split(/\n/).filter((line) => line.trim());
    const bullets: string[] = [];
    const bulletsHtml: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (
        trimmed.match(/^[•·\-\*]\s+/) ||
        trimmed.match(/^\d+[\.\)]\s+/) ||
        (trimmed.length > 0 && !trimmed.match(/^<h/))
      ) {
        const cleanBullet = trimmed.replace(/^[•·\-\*\d+\.\)]\s+/, "").trim();
        if (cleanBullet) {
          bullets.push(htmlToText(cleanBullet));
          bulletsHtml.push(cleanBullet);
        }
      }
    }

    return { bullets, bulletsHtml };
  }

  const bullets: string[] = [];
  const bulletsHtml: string[] = [];

  for (const match of bulletMatches) {
    const content = match.replace(/<[^>]+>/g, "").trim();
    if (content) {
      bullets.push(htmlToText(match));
      bulletsHtml.push(match);
    }
  }

  return { bullets, bulletsHtml };
}

async function parseResume(): Promise<ResumeData> {
  console.log("📄 Reading DOCX file...");

  if (!RESUME_DOCX) {
    throw new Error("Resume DOCX file path not determined");
  }

  const buffer = fs.readFileSync(RESUME_DOCX);

  console.log("🔄 Converting DOCX to HTML and text...");
  const result = await mammoth.convertToHtml({ buffer });
  const html = result.value || "";
  const textResult = await mammoth.extractRawText({ buffer });
  const text = textResult.value || "";

  console.log("📝 Parsing sections...");

  const resumeData: ResumeData = {
    skills: [],
    experience: [],
    education: [],
    projects: [],
    awards: [],
  };

  // Split HTML into sections by headings
  const htmlSections = html.split(/(<h[1-6][^>]*>.*?<\/h[1-6]>)/i);
  const textLines = text
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line);

  let currentSection: string | null = null;
  let currentSectionContent: string[] = [];
  let currentSectionHtml: string[] = [];

  // Process HTML sections
  for (let i = 0; i < htmlSections.length; i++) {
    const part = htmlSections[i];

    // Check if this is a heading
    const headingMatch = part.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i);
    if (headingMatch) {
      // Save previous section
      if (currentSection && currentSectionContent.length > 0) {
        const content = currentSectionContent.join("\n");
        const contentHtml = currentSectionHtml.join("");

        await processSection(currentSection, content, contentHtml, resumeData);
      }

      // Start new section
      const headingText = htmlToText(headingMatch[1]);
      currentSection = normalizeHeading(headingText);
      currentSectionContent = [];
      currentSectionHtml = [];
    } else if (currentSection && part.trim()) {
      currentSectionContent.push(htmlToText(part));
      currentSectionHtml.push(part);
    }
  }

  // Process last section
  if (currentSection && currentSectionContent.length > 0) {
    const content = currentSectionContent.join("\n");
    const contentHtml = currentSectionHtml.join("");

    await processSection(currentSection, content, contentHtml, resumeData);
  }

  // If no sections were found, try parsing the whole document
  if (
    !resumeData.summaryText &&
    !resumeData.experience?.length &&
    !resumeData.education?.length
  ) {
    console.log("⚠️  No sections found, attempting full document parse...");
    await processSection("summary", text, html, resumeData);
  }

  // Parse summary if we have the full text
  if (!resumeData.summaryText && text) {
    const firstParagraph = text.split(/\n\n/)[0];
    if (firstParagraph && firstParagraph.length > 50) {
      resumeData.summaryText = firstParagraph.trim();
      const firstParagraphHtml =
        html.split(/<p[^>]*>/)[1]?.split("</p>")[0] || "";
      resumeData.summaryHtml = firstParagraphHtml.trim();
    }
  }

  return resumeData;
}

async function processSection(
  section: string | null,
  text: string,
  html: string,
  resumeData: ResumeData
): Promise<void> {
  if (!section) return;

  console.log(`   Processing section: ${section}`);

  switch (section) {
    case "summary":
      resumeData.summaryText = text.substring(0, 500).trim();
      resumeData.summaryHtml = html.substring(0, 1000).trim();
      break;

    case "skills":
      const skills = parseSkills(text, html);
      resumeData.skills = skills;
      console.log(`      Found ${skills.length} skills`);
      break;

    case "experience":
      const experiences = parseExperience(text, html);
      resumeData.experience = experiences;
      console.log(`      Found ${experiences.length} experiences`);
      break;

    case "education":
      const education = parseEducation(text, html);
      resumeData.education = education;
      console.log(`      Found ${education.length} education entries`);
      break;

    case "projects":
      const projects = parseProjects(text, html);
      resumeData.projects = projects;
      console.log(`      Found ${projects.length} projects`);
      break;

    case "awards":
      const awards = parseAwards(text, html);
      resumeData.awards = awards;
      console.log(`      Found ${awards.length} awards`);
      break;
  }
}

function parseSkills(
  text: string,
  html: string
): Array<{ name: string; level?: number; category?: string }> {
  const skills: Array<{ name: string; level?: number; category?: string }> = [];

  // Try to extract skills from bullet points or comma-separated lists
  const lines = text.split(/\n/).filter((line) => line.trim());
  const skillPatterns = [
    /([A-Za-z\s+.#]+?)\s*[:\-]\s*(\d+)%/i, // "Skill: 90%"
    /([A-Za-z\s+.#]+?)\s*\((\d+)%\)/i, // "Skill (90%)"
  ];

  for (const line of lines) {
    // Try pattern matching first
    let matched = false;
    for (const pattern of skillPatterns) {
      const match = line.match(pattern);
      if (match) {
        const name = match[1].trim();
        const level = parseInt(match[2], 10);
        skills.push({ name, level });
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Try comma-separated list
      const items = line
        .split(/[,;•·\-\*]/)
        .map((item) => item.trim())
        .filter((item) => item);
      for (const item of items) {
        if (item.length > 2 && item.length < 50) {
          skills.push({ name: item });
        }
      }
    }
  }

  return skills.length > 0 ? skills : [{ name: "See resume for details" }];
}

function parseExperience(
  text: string,
  html: string
): Array<{
  title: string;
  company: string;
  location?: string;
  startDate?: string;
  endDate?: string | null;
  current?: boolean;
  bullets?: string[];
  bulletsHtml?: string[];
}> {
  const experiences: Array<{
    title: string;
    company: string;
    location?: string;
    startDate?: string;
    endDate?: string | null;
    current?: boolean;
    bullets?: string[];
    bulletsHtml?: string[];
  }> = [];

  // Split by double newlines or clear separators
  const entries = text
    .split(/\n\n+/)
    .filter((entry) => entry.trim().length > 20);

  for (const entry of entries) {
    const lines = entry
      .split(/\n/)
      .map((line) => line.trim())
      .filter((line) => line);

    if (lines.length < 2) continue;

    const firstLine = lines[0];
    const secondLine = lines[1];

    // Extract title, company, dates, location
    const dates = extractDates(firstLine + " " + secondLine);
    const location = extractLocation(firstLine) || extractLocation(secondLine);

    // Title is usually the first significant line
    let title = firstLine;
    let company = secondLine;

    // Check if first line contains both title and company
    const titleCompanyMatch = firstLine.match(/^([^–—\-]+?)\s*[-–—]\s*(.+)$/);
    if (titleCompanyMatch) {
      title = titleCompanyMatch[1].trim();
      company = titleCompanyMatch[2].trim();
    }

    // Remove dates and location from title/company
    title = title
      .replace(/\d{4}.*$/, "")
      .replace(/\([^)]+\)/, "")
      .trim();
    company = company
      .replace(/\d{4}.*$/, "")
      .replace(/\([^)]+\)/, "")
      .trim();

    // Extract bullets (remaining lines)
    const bullets = lines.slice(2).filter((line) => {
      return (
        line.match(/^[•·\-\*]\s+/) ||
        line.match(/^\d+[\.\)]\s+/) ||
        line.length > 20
      );
    });

    const { bullets: bulletsText, bulletsHtml: bulletsHtmlArray } =
      extractBullets(entry);

    experiences.push({
      title: title || "Position",
      company: company || "Company",
      location,
      ...dates,
      bullets: bulletsText.length > 0 ? bulletsText : bullets,
      bulletsHtml: bulletsHtmlArray.length > 0 ? bulletsHtmlArray : undefined,
    });
  }

  return experiences;
}

function parseEducation(
  text: string,
  html: string
): Array<{
  degree: string;
  school: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  descriptionHtml?: string;
}> {
  const education: Array<{
    degree: string;
    school: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    descriptionHtml?: string;
  }> = [];

  const entries = text
    .split(/\n\n+/)
    .filter((entry) => entry.trim().length > 10);

  for (const entry of entries) {
    const lines = entry
      .split(/\n/)
      .map((line) => line.trim())
      .filter((line) => line);

    if (lines.length < 1) continue;

    const firstLine = lines[0];
    const dates = extractDates(entry);
    const location = extractLocation(entry);

    // Degree is usually first line, school is second
    const degree = firstLine;
    const school = lines[1] || "";
    const description = lines.slice(2).join(" ");

    education.push({
      degree: degree.replace(/\d{4}.*$/, "").trim(),
      school: school.replace(/\d{4}.*$/, "").trim(),
      location,
      startDate: dates.startDate,
      endDate: dates.endDate || undefined,
      description: description || undefined,
      descriptionHtml: html.substring(0, 500) || undefined,
    });
  }

  return education;
}

function parseProjects(
  text: string,
  html: string
): Array<{
  name: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  bullets?: string[];
  bulletsHtml?: string[];
  links?: string[];
}> {
  const projects: Array<{
    name: string;
    role?: string;
    startDate?: string;
    endDate?: string;
    bullets?: string[];
    bulletsHtml?: string[];
    links?: string[];
  }> = [];

  const entries = text
    .split(/\n\n+/)
    .filter((entry) => entry.trim().length > 10);

  for (const entry of entries) {
    const lines = entry
      .split(/\n/)
      .map((line) => line.trim())
      .filter((line) => line);

    if (lines.length < 1) continue;

    const firstLine = lines[0];
    const dates = extractDates(entry);

    // Extract links (URLs)
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const links: string[] = [];
    const linkMatches = entry.match(urlPattern);
    if (linkMatches) {
      links.push(...linkMatches);
    }

    const { bullets: bulletsText, bulletsHtml: bulletsHtmlArray } =
      extractBullets(entry);

    projects.push({
      name: firstLine.replace(/\d{4}.*$/, "").trim(),
      startDate: dates.startDate,
      endDate: dates.endDate || undefined,
      bullets: bulletsText,
      bulletsHtml: bulletsHtmlArray.length > 0 ? bulletsHtmlArray : undefined,
      links: links.length > 0 ? links : undefined,
    });
  }

  return projects;
}

function parseAwards(
  text: string,
  html: string
): Array<{
  title: string;
  organization?: string;
  date?: string;
  description?: string;
  descriptionHtml?: string;
}> {
  const awards: Array<{
    title: string;
    organization?: string;
    date?: string;
    description?: string;
    descriptionHtml?: string;
  }> = [];

  const entries = text
    .split(/\n\n+/)
    .filter((entry) => entry.trim().length > 5);

  for (const entry of entries) {
    const lines = entry
      .split(/\n/)
      .map((line) => line.trim())
      .filter((line) => line);

    if (lines.length < 1) continue;

    const firstLine = lines[0];
    const dateMatch = entry.match(/(\d{4})/);
    const date = dateMatch ? dateMatch[1] : undefined;

    // Try to extract organization (usually in parentheses or after dash)
    const orgMatch =
      firstLine.match(/[–—\-]\s*(.+?)(?:\s*\(|$)/) ||
      firstLine.match(/\(([^)]+)\)/);
    const organization = orgMatch ? orgMatch[1].trim() : undefined;

    awards.push({
      title: firstLine
        .replace(/[–—\-].*$/, "")
        .replace(/\([^)]+\)/, "")
        .trim(),
      organization,
      date,
      description: lines.slice(1).join(" ") || undefined,
    });
  }

  return awards;
}

async function main() {
  try {
    console.log("🚀 Starting DOCX ingestion...\n");
    console.log(`📄 Using resume file: ${RESUME_DOCX}\n`);

    const resumeData = await parseResume();

    // Validate data
    console.log("\n✅ Validation:");
    console.log(`   Summary: ${resumeData.summaryText ? "✓" : "✗"}`);
    console.log(`   Skills: ${resumeData.skills?.length || 0} items`);
    console.log(`   Experience: ${resumeData.experience?.length || 0} items`);
    console.log(`   Education: ${resumeData.education?.length || 0} items`);
    console.log(`   Projects: ${resumeData.projects?.length || 0} items`);
    console.log(`   Awards: ${resumeData.awards?.length || 0} items`);

    // Write to file
    console.log(`\n💾 Writing to ${OUTPUT_FILE}...`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(resumeData, null, 2));

    console.log("\n✨ DOCX ingestion completed successfully!");
  } catch (error) {
    console.error("\n❌ Error:", error);
    process.exit(1);
  }
}

main();
