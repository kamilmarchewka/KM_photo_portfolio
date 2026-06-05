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

export function generateGalleryRows(photos: any): any[] {
  const rows: any[] = [];

  // Tworzymy kopię roboczą kolejki zdjęć, aby jej nie mutować bezpośrednio w CMS
  const queue = [...photos];

  // Funkcja pomocnicza sprawdzająca, czy zdjęcie jest poziome na podstawie prefixu w URL/nazwie
  const isHorizontal = (photo: any | undefined): boolean => {
    if (!photo) return false;
    return photo.url.includes("--h");
  };

  while (queue.length > 0) {
    const p0 = queue[0];
    const p1 = queue[1];
    const p2 = queue[2];

    const h0 = isHorizontal(p0);
    const h1 = isHorizontal(p1);
    const h2 = isHorizontal(p2);

    // 1. UKŁAD: DWA POZIOME [H, H]
    if (queue.length >= 2 && h0 && h1) {
      rows.push({ type: "two-horizontal", photos: queue.splice(0, 2) });
      continue;
    }

    // 2. UKŁAD: MIKS LEWY [V, H, H]
    if (queue.length >= 3 && !h0 && h1 && h2) {
      rows.push({ type: "mixed-left", photos: queue.splice(0, 3) });
      continue;
    }

    // 3. UKŁAD: MIKS PRAWY [H, H, V]
    if (queue.length >= 3 && h0 && h1 && !h2) {
      rows.push({ type: "mixed-right", photos: queue.splice(0, 3) });
      continue;
    }

    // 4. UKŁAD: TRZY PIONOWE [V, V, V]
    if (queue.length >= 3 && !h0 && !h1 && !h2) {
      rows.push({ type: "three-vertical", photos: queue.splice(0, 3) });
      continue;
    }

    // 5. UKŁAD: PION + POZIOM [V, H]
    if (queue.length >= 2 && !h0 && h1) {
      rows.push({ type: "vertical-horizontal", photos: queue.splice(0, 2) });
      continue;
    }

    // 6. UKŁAD: POZIOM + PION [H, V]
    if (queue.length >= 2 && h0 && !h1) {
      rows.push({ type: "horizontal-vertical", photos: queue.splice(0, 2) });
      continue;
    }

    // 7. AWARYJNE DOMYKANIE OGONA: [H] lub [V]
    // Jeśli układ z 2 lub 3 zdjęć nie pasuje do żadnego szablonu (np. zostało 1 zdjęcie na końcu),
    // wrzucamy je jako osobny, pełnowymiarowy wiersz.
    rows.push({ type: "full-single", photos: queue.splice(0, 1) });
  }

  return rows;
}
