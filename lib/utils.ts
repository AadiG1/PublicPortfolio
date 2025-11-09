import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import sanitizeHtmlLib from "sanitize-html";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPlaceholderImageUrl(
  seed: string,
  width: number,
  height: number,
  type: "headshot" | "project" | "gallery" | "og" = "project"
): string {
  // Use different services for different image types
  if (type === "headshot") {
    // Use Pravatar for professional-looking person images
    // Generate a consistent seed number from the seed string
    const seedNum = seed
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Use a range that gives good professional-looking photos (1-70 works well)
    return `https://i.pravatar.cc/${width}?img=${(seedNum % 70) + 1}`;
  }

  // For all other types, use Picsum with deterministic seeds
  // This ensures consistent, high-quality images that are reproducible
  // The seed parameter ensures the same image is returned every time
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

/**
 * Sanitize HTML content for safe rendering
 * Uses sanitize-html which works well in Next.js server-side rendering
 */
export function sanitizeHtmlContent(dirty: string): string {
  return sanitizeHtmlLib(dirty, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "b",
      "i",
      "ul",
      "ol",
      "li",
      "a",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "span",
      "div",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      a: ["http", "https", "mailto"],
    },
  });
}
