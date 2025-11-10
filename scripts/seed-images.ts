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
  type: "headshot" | "project" | "gallery" | "og";
}

const imagesToSeed: ImageConfig[] = [
  {
    filename: "headshot.jpeg",
    seed: "headshot-aditya-gupta",
    width: 400,
    height: 400,
    type: "headshot",
  },
  {
    filename: "project-1.jpg",
    seed: "project-1-ecommerce",
    width: 800,
    height: 600,
    type: "project",
  },
  {
    filename: "project-2.jpg",
    seed: "project-2-taskapp",
    width: 800,
    height: 600,
    type: "project",
  },
  {
    filename: "project-3.jpg",
    seed: "project-3-weather",
    width: 800,
    height: 600,
    type: "project",
  },
  {
    filename: "gallery-1.jpg",
    seed: "gallery-1-portfolio",
    width: 600,
    height: 400,
    type: "gallery",
  },
  {
    filename: "gallery-2.jpg",
    seed: "gallery-2-portfolio",
    width: 600,
    height: 400,
    type: "gallery",
  },
  {
    filename: "gallery-3.jpg",
    seed: "gallery-3-portfolio",
    width: 600,
    height: 400,
    type: "gallery",
  },
  {
    filename: "gallery-4.jpg",
    seed: "gallery-4-portfolio",
    width: 600,
    height: 400,
    type: "gallery",
  },
  {
    filename: "gallery-5.jpg",
    seed: "gallery-5-portfolio",
    width: 600,
    height: 400,
    type: "gallery",
  },
  {
    filename: "gallery-6.jpg",
    seed: "gallery-6-portfolio",
    width: 600,
    height: 400,
    type: "gallery",
  },
  {
    filename: "og-image.jpg",
    seed: "og-vibe-portfolio",
    width: 1200,
    height: 630,
    type: "og",
  },
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

    // Always skip headshot if it exists - user should replace with their own photo
    if (
      (imageConfig.filename === "headshot.jpg" ||
        imageConfig.filename === "headshot.jpeg") &&
      fs.existsSync(filepath)
    ) {
      console.log(
        `⏭️  Skipped ${imageConfig.filename} (using custom photo - replace manually if needed)`
      );
      continue;
    }

    // Skip other images if they already exist
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Skipped (already exists): ${imageConfig.filename}`);
      continue;
    }

    const url = getPlaceholderImageUrl(
      imageConfig.seed,
      imageConfig.width,
      imageConfig.height,
      imageConfig.type
    );

    try {
      await downloadImage(url, filepath);
      // Small delay to be respectful to the API
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error(
        `Failed to download ${imageConfig.filename}, using fallback...`
      );
      // Fallback to Picsum if Unsplash/Pravatar fails
      const fallbackUrl = `https://picsum.photos/seed/${imageConfig.seed}/${imageConfig.width}/${imageConfig.height}`;
      try {
        await downloadImage(fallbackUrl, filepath);
      } catch (fallbackError) {
        console.error(`Fallback also failed for ${imageConfig.filename}`);
      }
    }
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
