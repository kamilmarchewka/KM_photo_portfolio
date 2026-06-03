import Gallery from "@/components/Gallery";
import Image from "next/image";
import Link from "next/link";
import { photoData } from "@/data/photos";
import { notFound } from "next/navigation";
import { getEventDetails } from "@/lib/content";

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
