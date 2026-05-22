import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Dozwolone rozszerzenia plików graficznych
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];

export function getPostWithGallery(slug: any) {
  console.log("getPostWithGallery - slug:", slug);
  try {
    // 1. Ścieżka do pliku Markdown
    const postsDirectory = path.join(process.cwd(), "content/koncerty");
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    // Odczyt zawartości pliku
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Parsowanie frontmatter za pomocą gray-matter
    const { data, content } = matter(fileContents);

    let images: string[] = [];

    // 2. Jeśli w metadanych zdefiniowano katalog galerii
    if (data.gallery_dir) {
      // Do odczytu fizycznego na serwerze potrzebujemy pełnej ścieżki systemowej z folderem public
      const publicDirectory = path.join(process.cwd(), "public");
      const galleryFullPath = path.join(publicDirectory, data.gallery_dir);

      // 3. Sprawdzenie, czy katalog fizycznie istnieje
      if (fs.existsSync(galleryFullPath)) {
        const fileNames = fs.readdirSync(galleryFullPath);

        // Filtrowanie rozszerzeń
        const validFiles = fileNames.filter((fileName) => {
          const ext = path.extname(fileName).toLowerCase();
          return ALLOWED_EXTENSIONS.includes(ext);
        });

        // 4. Mapowanie na ścieżki relatywne dla Next.js (z pominięciem "public")
        // path.posix.join gwarantuje poprawne ukośniki "/" na każdym systemie operacyjnym
        images = validFiles.map((fileName) => {
          return path.posix.join("/", data.gallery_dir, fileName);
        });
      } else {
        console.warn(
          `[Gallery Warning]: Katalog ${galleryFullPath} nie istnieje.`,
        );
      }
    }

    // Zwracamy treść, metadane oraz wygenerowaną tablicę gotowych ścieżek do zdjęć
    return {
      slug,
      meta: data,
      content,
      images, // Format wyjściowy: ["/images/koncert1/foto1.jpg", "/images/koncert1/foto2.png"]
    };
  } catch (error) {
    console.error(`Błąd podczas przetwarzania posta ${slug}:`, error);
    return null;
  }
}
