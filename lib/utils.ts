import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import createDOMPurify from "isomorphic-dompurify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPlaceholderImageUrl(
  seed: string,
  width: number,
  height: number
): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

/**
 * Sanitize HTML content for safe rendering
 */
export function sanitizeHtml(dirty: string): string {
  const DOMPurify = createDOMPurify();
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
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
    ALLOWED_ATTR: ["href", "target", "rel"],
    ALLOW_DATA_ATTR: false,
  });
}

