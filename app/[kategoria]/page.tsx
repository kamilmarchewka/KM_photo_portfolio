import Gallery from "@/components/Gallery";
import Image from "next/image";
import Link from "next/link";
import ImageHoverCard from "@/components/ImageHoverCard";
import { getEventsForCategory } from "@/lib/content";
import { notFound } from "next/navigation";

export default async function Kategoria({
  params,
}: {
  params: { kategoria: string };
}) {
  const { kategoria } = await params;
  const events = getEventsForCategory(kategoria);

  if (events.length === 0) notFound();
  return (
    <>
      {/* Main header */}
      <header className="relative flex flex-col items-center justify-center gap-16 pt-40 py-32">
        {/* SVG logo with animation */}
        <h1 className="text-6xl md:text-7xl lg:text-9xl tracking-tight text-zinc-800 font-abril-fatface">
          {kategoria.charAt(0).toUpperCase() + kategoria.slice(1)}
        </h1>
      </header>
      {/* Gallery */}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
        {events.map(({ title, slug, coverImageSrc }, i) => (
          <ImageHoverCard
            key={i}
            imageUrl={coverImageSrc}
            eventName={title}
            event={slug}
            kategoria={kategoria}
          />
        ))}
      </section>
    </>
  );
}
