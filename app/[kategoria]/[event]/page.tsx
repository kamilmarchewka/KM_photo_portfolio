import Gallery from "@/components/Gallery";
import Image from "next/image";
import Link from "next/link";
import { photoData } from "@/data/photos";
import { notFound } from "next/navigation";
import {
  getEventDetails,
  getEventsForCategory,
  getCategories,
} from "@/lib/content";

// app/blog/[slug]/page.tsx
interface RouteParams {
  kategoria: string;
  event: string;
}

export async function generateStaticParams() {
  // Pobieramy wszystkie kategorie (foldery z /content)
  const categories = getCategories();
  const paths: RouteParams[] = [];

  for (const category of categories) {
    // Zakładam, że kategoria ma pole 'slug'. Jeśli nie, dostosuj to (np. category.title)
    const categorySlug = category.slug;

    if (!categorySlug) continue;

    // Pobieramy eventy dla danej kategorii
    const events = getEventsForCategory(categorySlug);

    events.forEach((event) => {
      paths.push({
        kategoria: categorySlug,
        event: event.slug,
      });
    });
  }

  console.log("Wygenerowane ścieżki:", paths);
  return paths;
}
export default async function Koncerty({
  params,
}: {
  params: { kategoria: string; event: string };
}) {
  // 1. Czekamy na rozpakowanie parametrów z URL
  const { kategoria, event } = await params;

  // 2. Pobieramy dane z naszego pliku lib/content.ts
  const eventData = getEventDetails(kategoria, event);

  // 3. Jeśli funkcja zwróciła null (brak pliku), pokazujemy stronę 404
  if (!eventData) {
    notFound();
  }

  console.log("Event Data:", eventData);
  return (
    <>
      {/* Main header */}
      <header className="relative flex flex-col items-center justify-center gap-16 pt-40 py-32">
        {/* SVG logo with animation */}
        <h1 className="text-6xl md:text-7xl lg:text-9xl tracking-tight text-zinc-800 font-abril-fatface">
          Koncerty
        </h1>
      </header>
      {/* Gallery */}

      <Gallery photos={eventData?.images || []} />
    </>
  );
}
