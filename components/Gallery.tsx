// components/Gallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Photo } from "@/types";

export default function Gallery({ photos }: { photos: string[] }) {
  const [index, setIndex] = useState<number>(-1);

  return (
    <>
      <section className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 [column-fill:_balance]">
        {photos.map((photo, i) => {
          // const isPortrait = photo.orientation === "portrait";
          const isPortrait = 0;

          return (
            <motion.div
              key={photo}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className={`relative inline-block w-full overflow-hidden bg-zinc-100 cursor-pointer group break-inside-avoid mb-6 ${
                isPortrait ? "aspect-[2/3]" : "aspect-[3/2]"
              }`}
              onClick={() => setIndex(i)}
            >
              <Image
                src={photo}
                alt={photo}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-[1.03]"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                priority={i < 3}
              />
            </motion.div>
          );
        })}
      </section>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={photos.map((p) => ({ src: p, alt: p }))}
        styles={{
          container: { backgroundColor: "rgba(24, 24, 27, 0.98)" },
        }}
        // POPRAWKA: Przejmujemy pełną kontrolę nad strukturą HTML wewnątrz slajdu
        render={{
          slide: ({ slide }) => (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {/* Standardowy tag img z Tailwindem gwarantuje idealne zachowanie proporcji */}
              <img
                src={slide.src}
                alt={slide.alt}
                className="max-w-full max-h-full object-contain select-none pointer-events-none"
              />
            </div>
          ),
        }}
      />
    </>
  );
}
