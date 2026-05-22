// src/app/page.tsx
import Gallery from "@/components/Gallery";
import { photoData } from "@/data/photos";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Main header */}
      <header className="relative flex flex-col items-center justify-center gap-16 pt-40 py-32">
        {/* SVG logo with animation */}
        <h1 className="text-6xl md:text-7xl lg:text-9xl tracking-tight text-zinc-800 font-abril-fatface">
          <span className="block">Kamil</span>
          <span className="md:ml-32 block">Marchewka</span>
        </h1>

        {/* Quote */}
        <div className="sm:ml-auto sm:mr-28 flex flex-col items-end gap-3">
          <p className="max-w-[20em] italic font-light text-zinc-950">
            "Nie istnieją reguły opisujące dobrą fotografię, są tylko dobre
            fotografie."
          </p>
          <span className="font-bold text-sm text-zinc-300">- Ansel Adams</span>
        </div>
      </header>
      {/* Section with categories */}
      <section className="flex flex-col gap-8">
        {/* Concerts */}
        <div className="relative  pl-20 pr-8 pt-8 pb-7 rounded-md flex flex-col justify-center items-start gap-16">
          {/* Background photo */}
          <Image
            src="/gallery/20260516_KSAF_AGH_Avi_KMarchewka_004.jpg"
            alt="Zdjęcie koncertowe w tle"
            layout="fill"
            objectFit="cover"
            className=" opacity-20 -z-10"
          />

          <h2 className="text-3xl italic ">Koncerty</h2>
          <Link
            href="/koncerty"
            className="ml-auto inline-block rounded bg-zinc-50 px-6 py-2 text-sm font-medium text-zinc-800 hover:opacity-90 transition-opacity"
          >
            Zobacz galerię
          </Link>
        </div>
        {/* Portraits */}
        <div className="relative  pl-20 pr-8 pt-8 pb-7 rounded-md flex flex-col justify-center items-start gap-16">
          {/* Background photo */}
          <Image
            src="/gallery/20260516_KSAF_AGH_Avi_KMarchewka_004.jpg"
            alt="Zdjęcie koncertowe w tle"
            layout="fill"
            objectFit="cover"
            className=" opacity-20 -z-10"
          />

          <h2 className="text-3xl italic ">Portrety</h2>
          <Link
            href="/concerts"
            className="ml-auto inline-block rounded bg-zinc-50 px-6 py-2 text-sm font-medium text-zinc-800 hover:opacity-90 transition-opacity"
          >
            Zobacz galerię
          </Link>
        </div>
        {/* Automotive */}
        <div className="relative  pl-20 pr-8 pt-8 pb-7 rounded-md flex flex-col justify-center items-start gap-16">
          {/* Background photo */}
          <Image
            src="/gallery/20260516_KSAF_AGH_Avi_KMarchewka_004.jpg"
            alt="Zdjęcie koncertowe w tle"
            layout="fill"
            objectFit="cover"
            className=" opacity-20 -z-10"
          />

          <h2 className="text-3xl italic ">Motoryzacja</h2>
          <Link
            href="/concerts"
            className="ml-auto inline-block rounded bg-zinc-50 px-6 py-2 text-sm font-medium text-zinc-800 hover:opacity-90 transition-opacity"
          >
            Zobacz galerię
          </Link>
        </div>
      </section>
      {/* <div className="space-y-12">
        <Gallery photos={photoData} />
      </div> */}
    </>
  );
}
