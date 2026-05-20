// src/app/page.tsx
import Gallery from "@/components/Gallery";
import { photoData } from "@/data/photos";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Main header */}
      <header className="relative flex flex-col items-center justify-center py-32">
        {/* Logo w tle, które się rysuje */}

        <h1 className="text-7xl tracking-tight text-zinc-800">
          Kamil Marchewka
        </h1>
        <p className="ml-40 hidden">jakis gowo cytat</p>
      </header>
      {/* Section with categories */}
      <section className="flex flex-col">
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
            href="/concerts"
            className="ml-auto inline-block rounded bg-zinc-50 px-6 py-2 text-sm font-medium text-zinc-800 hover:opacity-90 transition-opacity"
          >
            Zobacz galerię
          </Link>
        </div>
        {/* Portraits */}
        {/* Automotive */}
      </section>
      {/* <div className="space-y-12">
        <Gallery photos={photoData} />
      </div> */}
    </>
  );
}
