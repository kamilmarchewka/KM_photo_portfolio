"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { generateGalleryRows } from "@/lib/gallery";

export default function Gallery({ photos }: { photos: string[] }) {
  const [index, setIndex] = useState<number>(-1);

  // Generujemy strukturę rzędów na podstawie algorytmu
  const galleryRows = generateGalleryRows(photos);

  // Wspólny komponent dla pojedynczego zdjęcia, aby nie powtarzać kodu Framer Motion i Next.js Image
  const RenderPhoto = ({
    src,
    sizes,
    className = "",
  }: {
    src: string;
    sizes: string;
    className?: string;
  }) => {
    // Szukamy globalnego indeksu zdjęcia w oryginalnej tablicy, żeby Lightbox wiedział, co otworzyć
    const globalIndex = photos.indexOf(src);

    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`relative overflow-hidden bg-zinc-100 cursor-pointer group rounded-xl ${className}`}
        onClick={() => setIndex(globalIndex)}
      >
        <Image
          src={src}
          alt={src}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          priority={globalIndex < 4}
        />
      </motion.div>
    );
  };

  return (
    <>
      {/* Kontener nadrzędny trzymający rzędy pionowo */}
      <section className="flex flex-col gap-4  w-full">
        {galleryRows.map((row, rowIndex) => {
          // 1. TRZY PIONOWE (4 + 4 + 4)
          if (row.type === "three-vertical") {
            return (
              <div
                key={rowIndex}
                className="grid grid-cols-3 md:grid-cols-12 gap-4 w-full"
              >
                {row.photos.map((photo: any) => (
                  <RenderPhoto
                    key={photo}
                    src={photo}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="col-span-1 md:col-span-4 aspect-2/3"
                  />
                ))}
              </div>
            );
          }

          // 2. DWA POZIOME (6 + 6)
          if (row.type === "two-horizontal") {
            return (
              <div
                key={rowIndex}
                className="grid grid-cols-2 md:grid-cols-12 gap-4 w-full"
              >
                {row.photos.map((photo: any) => (
                  <RenderPhoto
                    key={photo}
                    src={photo}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="col-span-1 md:col-span-6 aspect-3/2"
                  />
                ))}
              </div>
            );
          }

          // 3. MIKS LEWY (3 + 9) -> Pion po lewej, dwa poziomy po prawej
          if (row.type === "mixed-left") {
            return (
              <div
                key={rowIndex}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full"
              >
                <RenderPhoto
                  src={row.photos[0]}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="col-span-1 md:col-span-3 aspect-2/3"
                />
                <div className="col-span-1 md:col-span-9 grid grid-rows-2 gap-4 h-full">
                  <RenderPhoto
                    src={row.photos[1]}
                    sizes="(max-width: 768px) 100vw, 75vw"
                    className="h-full w-full"
                  />
                  <RenderPhoto
                    src={row.photos[2]}
                    sizes="(max-width: 768px) 100vw, 75vw"
                    className="h-full w-full"
                  />
                </div>
              </div>
            );
          }

          // 4. MIKS PRAWY (9 + 3) -> Dwa poziomy po lewej, pion po prawej
          if (row.type === "mixed-right") {
            return (
              <div
                key={rowIndex}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full"
              >
                <div className="col-span-1 md:col-span-9 grid grid-rows-2 gap-4 h-full">
                  <RenderPhoto
                    src={row.photos[0]}
                    sizes="(max-width: 768px) 100vw, 75vw"
                    className="h-full w-full"
                  />
                  <RenderPhoto
                    src={row.photos[1]}
                    sizes="(max-width: 768px) 100vw, 75vw"
                    className="h-full w-full"
                  />
                </div>
                <RenderPhoto
                  src={row.photos[2]}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="col-span-1 md:col-span-3 aspect-2/3"
                />
              </div>
            );
          }

          // 5. PION + POZIOM (4 + 8) -> Minimalne docięcie poziomego, żeby zrównać wysokości
          if (row.type === "vertical-horizontal") {
            return (
              <div
                key={rowIndex}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full"
              >
                <RenderPhoto
                  src={row.photos[0]}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="col-span-1 md:col-span-4 aspect-2/3"
                />
                <RenderPhoto
                  src={row.photos[1]}
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="col-span-1 md:col-span-8 h-full w-full"
                />
              </div>
            );
          }

          // 6. POZIOM + PION (8 + 4)
          if (row.type === "horizontal-vertical") {
            return (
              <div
                key={rowIndex}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full"
              >
                <RenderPhoto
                  src={row.photos[0]}
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="col-span-1 md:col-span-8 h-full w-full"
                />
                <RenderPhoto
                  src={row.photos[1]}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="col-span-1 md:col-span-4 aspect-2/3"
                />
              </div>
            );
          }

          // 7. POJEDYNCZE ZDJĘCIE (Domykanie ogona)
          if (row.type === "full-single") {
            const photo = row.photos[0];
            const aspectClass = photo.includes("--h")
              ? "aspect-[3/2]"
              : "aspect-[2/3]";
            return (
              <div key={rowIndex} className="w-full">
                <RenderPhoto
                  src={photo}
                  sizes="100vw"
                  className={`w-full ${aspectClass}`}
                />
              </div>
            );
          }

          return null;
        })}
      </section>

      {/* LIGHTBOX */}
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={photos.map((p) => ({ src: p, alt: p }))}
        styles={{
          container: { backgroundColor: "rgba(24, 24, 27, 0.98)" },
        }}
        render={{
          slide: ({ slide }) => (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.alt || "Zdjęcie w galerii"}
                className="max-w-full max-h-full object-contain select-none pointer-events-none"
              />
            </div>
          ),
        }}
      />
    </>
  );
}
