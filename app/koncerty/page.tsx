import Gallery from "@/components/Gallery";
import Image from "next/image";
import Link from "next/link";
import ImageHoverCard from "@/components/ImageHoverCard";

export default function Koncerty() {
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

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
        <ImageHoverCard />
        <ImageHoverCard />
        <ImageHoverCard />
        <ImageHoverCard />
      </section>
    </>
  );
}
