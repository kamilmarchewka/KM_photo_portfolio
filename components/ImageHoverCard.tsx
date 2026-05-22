"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ImageHoverCard = ({
  imageUrl = "/gallery/20260516_KSAF_AGH_Avi_KMarchewka_004.jpg",
  eventName = "Projekt",
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Pobieramy pozycję kontenera na ekranie
    const rect = e.currentTarget.getBoundingClientRect();

    // Obliczamy pozycję myszy względem lewego górnego rogu kontenera
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link href="/koncerty/avi" className="relative block group">
      {/* Event name */}
      <h2 className="block absolute top-full lg:top-auto left-1/2 lg:left-0 lg:bottom-0 px-2 py-1 origin-bottom-left transform -translate-x-1/2 lg:translate-x-0 lg:-rotate-90 text-sm tracking-widest uppercase font-black text-zinc-500">
        {eventName}
      </h2>
      {/* Image container */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative aspect-3/2 overflow-hidden"
      >
        {/* Cover Image */}
        <Image
          fill
          src={imageUrl}
          alt={eventName}
          className={`transform lg:group-hover:scale-105 transition-transform duration-1000`}
        />

        {/* Circle pinned to the cursor */}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              className="absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              exit={{
                scale: 0,
                opacity: 0,
                transition: { duration: 0.18, delay: 0 },
              }}
              transition={{
                opacity: { delay: 0.15 },
                type: "spring",
                stiffness: 150,
                damping: 20,
                mass: 0.1,
              }}
            >
              <span className="bg-zinc-50 text-zinc-800 aspect-square px-4 rounded-full flex items-center justify-items-center font-bold tracking-wider">
                Zobacz!
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Link>
  );
};

export default ImageHoverCard;
