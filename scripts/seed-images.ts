import fs from "fs";
import path from "path";
import { getPlaceholderImageUrl } from "../lib/utils";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const PROJECTS_FILE = path.join(process.cwd(), "content", "projects.json");

interface ImageConfig {
  filename: string;
  seed: string;
  width: number;
  height: number;
}

const imagesToSeed: ImageConfig[] = [
  { filename: "headshot.jpg", seed: "headshot-vibe-portfolio", width: 400, height: 400 },
  { filename: "project-1.jpg", seed: "project-1-ecommerce", width: 800, height: 600 },
  { filename: "project-2.jpg", seed: "project-2-taskapp", width: 800, height: 600 },
  { filename: "project-3.jpg", seed: "project-3-weather", width: 800, height: 600 },
  { filename: "gallery-1.jpg", seed: "gallery-1-portfolio", width: 600, height: 400 },
  { filename: "gallery-2.jpg", seed: "gallery-2-portfolio", width: 600, height: 400 },
  { filename: "gallery-3.jpg", seed: "gallery-3-portfolio", width: 600, height: 400 },
  { filename: "gallery-4.jpg", seed: "gallery-4-portfolio", width: 600, height: 400 },
  { filename: "gallery-5.jpg", seed: "gallery-5-portfolio", width: 600, height: 400 },
  { filename: "gallery-6.jpg", seed: "gallery-6-portfolio", width: 600, height: 400 },
  { filename: "og-image.jpg", seed: "og-vibe-portfolio", width: 1200, height: 630 },
];

async function downloadImage(url: string, filepath: string): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filepath, buffer);
    console.log(`✓ Downloaded: ${path.basename(filepath)}`);
  } catch (error) {
    console.error(`✗ Failed to download ${url}:`, error);
    throw error;
  }
}

async function seedImages(): Promise<void> {
  console.log("🌱 Starting image seeding process...\n");

  // Create images directory if it doesn't exist
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    console.log("📁 Created images directory\n");
  }

  // Download all images
  for (const imageConfig of imagesToSeed) {
    const filepath = path.join(IMAGES_DIR, imageConfig.filename);
    const url = getPlaceholderImageUrl(
      imageConfig.seed,
      imageConfig.width,
      imageConfig.height
    );

    // Skip if image already exists
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Skipped (already exists): ${imageConfig.filename}`);
      continue;
    }

    await downloadImage(url, filepath);
    // Small delay to be respectful to the API
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  // Verify projects.json references local images
  if (fs.existsSync(PROJECTS_FILE)) {
    const projectsData = JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf-8"));
    let updated = false;

    projectsData.projects?.forEach((project: any, index: number) => {
      const expectedPath = `/images/project-${index + 1}.jpg`;
      if (project.image !== expectedPath) {
        project.image = expectedPath;
        updated = true;
      }
    });

    if (updated) {
      fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projectsData, null, 2));
      console.log("\n✓ Updated projects.json with local image paths");
    }
  }

  console.log("\n✨ Image seeding completed successfully!");
}

seedImages().catch((error) => {
  console.error("❌ Error seeding images:", error);
  process.exit(1);
});

