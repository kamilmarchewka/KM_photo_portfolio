import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Category } from "@/types";

const ALLOWED_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
]);
const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// --- INTERFEJSY TYPÓW ---
export interface CategoryData {
  slug: string;
  title: string;
  [key: string]: any; // Dla dodatkowych pól z frontmatter
}

export interface EventData {
  slug: string;
  categorySlug: string;
  title: string;
  gallery_dir?: string;
  content: string;
  images: string[];
  [key: string]: any;
}

// --- 1. STRONA GŁÓWNA: Get Categories ---
export function getCategories() {
  // Get folder names under /content
  const folderNames = fs.readdirSync(CONTENT_DIR);

  // Take all index.md files under /content/* and get their front matter
  const allCategories = folderNames.map((fname) => {
    // Full absolute path to index.md file under /content/*
    const indexFullPath = path.join(CONTENT_DIR, fname, "index.md");

    // Do nothing if index.md or /content/* folder doesn't exist
    if (!fs.existsSync(indexFullPath)) {
      return null;
    }

    // Read index.md and get its front matter
    const fileContents = fs.readFileSync(indexFullPath, "utf8");
    const { data } = matter(fileContents);

    // Return the front matter data as a Category object
    return {
      ...data,
    } as Category;
  });

  // Filter out null values (if any index.md files were missing)
  return allCategories.filter(Boolean) as Category[];
}

// --- 2. STRONA KATEGORII: Get Events for each category ---
export function getEventsForCategory(categorySlug: string): EventData[] {
  const categoryDir = path.join(CONTENT_DIR, categorySlug);

  if (!fs.existsSync(categoryDir)) return [];

  const files = fs.readdirSync(categoryDir);

  return (
    files
      // Ignore index.md files
      .filter((file) => file.endsWith(".md") && file !== "index.md")
      .map((file) => {
        const eventSlug = path.basename(file, ".md");
        const eventData = getEventDetails(categorySlug, eventSlug);
        return eventData;
      })
      .filter(Boolean) as EventData[]
  );
}

// --- 3. STRONA EVENTU: Get Event Details & Photos ---
export function getEventDetails(
  categorySlug: string,
  eventSlug: string,
): EventData | null {
  try {
    const filePath = path.join(CONTENT_DIR, categorySlug, `${eventSlug}.md`);

    if (!fs.existsSync(filePath)) return null;

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Automatyczna ścieżka do galerii, jeśli nie ma jej w markdownie: /gallery/koncerty/avi
    const relativeGalleryPath =
      data.gallery_dir || `gallery/${categorySlug}/${eventSlug}`;
    const absoluteGalleryPath = path.join(PUBLIC_DIR, relativeGalleryPath);

    let images: string[] = [];

    // Skkanowanie folderu ze zdjęciami
    if (fs.existsSync(absoluteGalleryPath)) {
      const fileNames = fs.readdirSync(absoluteGalleryPath);

      images = fileNames
        .filter((file) =>
          ALLOWED_EXTENSIONS.has(path.extname(file).toLowerCase()),
        )
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((file) => path.posix.join("/", relativeGalleryPath, file));
    }

    return {
      slug: eventSlug,
      categorySlug,
      title: data.title || eventSlug,
      content,
      images,
      ...data,
    };
  } catch (e) {
    console.error(`Błąd ładowania eventu ${eventSlug} w ${categorySlug}:`, e);
    return null;
  }
}
