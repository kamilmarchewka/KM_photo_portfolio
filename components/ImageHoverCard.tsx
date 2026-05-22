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
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full aspect-3/2 rounded-md overflow-hidden"
    >
      {/* Cover Image */}
      <Image
        fill
        src={imageUrl}
        alt={eventName}
        className={`transform ${isHovered ? "scale-105" : "scale-100"} transition-transform duration-1000`}
      />

      {/* Kółko podążające za kursem (AnimatePresence odpowiada za animację exit) */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="absolute flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: mousePosition.x, // 48 to połowa szerokości kółka (w-24 = 96px), aby kursor był idealnie na środku
              y: mousePosition.y, // 48 to połowa wysokości kółka
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              opacity: { delay: 0.2 },
              duration: 0.1,
              type: "spring",
              stiffness: 150,
              damping: 15,
              mass: 0.2,
            }}
          >
            <Link
              href="/koncerty/avi"
              className="bg-zinc-50 text-zinc-800 aspect-square px-4 rounded-full flex items-center justify-items-center font-bold tracking-wider"
            >
              Zobacz!
            </Link>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageHoverCard;
