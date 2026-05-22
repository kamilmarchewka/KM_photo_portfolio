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

      <section className="grid grid-cols-2 gap-16">
        <ImageHoverCard />
        <div className="relative w-full aspect-3/2 rounded-md">
          {/* Event name */}
          <h2 className="block px-2 text-lg text-zinc-800 left-0 bottom-0 origin-bottom-left transform -rotate-90 z-50 absolute text-nowrap italic font-normal">
            Avi Juwenalia Krakowskie
          </h2>
          {/* Cover Image */}
          <Image
            fill
            src="/gallery/20260516_KSAF_AGH_Avi_KMarchewka_004.jpg"
            alt="Zdjęcie koncertowe w tle"
          />
          {/* Circle cursor */}
          <span className="absolute inset-0 flex items-center justify-center">
            <Link
              href="/koncerty/avi"
              className="bg-zinc-50 text-zinc-800 aspect-square px-4 rounded-full flex items-center justify-items-center font-bold tracking-wider"
            >
              Zobacz!
            </Link>
          </span>
        </div>
      </section>
    </>
  );
}
