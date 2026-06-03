// src/app/page.tsx
import Gallery from "@/components/Gallery";
import { photoData } from "@/data/photos";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/get-categories";

export default function HomePage() {
  const categories = getCategories();

  console.log(categories);

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
        {categories.map(({ title, slug, coverImageSrc }) => (
          <div
            key={slug}
            className="group relative pl-10 lg:pl-20 pr-8 pt-8 pb-7 rounded-md flex flex-col justify-center items-center md:items-start gap-56 md:gap-16"
          >
            {/* Background photo */}
            <div className="hidden lg:block absolute inset-0 w-full h-full bg-zinc-50/80 -z-10 transform -translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-500" />
            <Image
              src={coverImageSrc}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="z-[-11]"
            />

            <h2 className="text-3xl italic bg-zinc-50 px-6 py-2 rounded-sm lg:bg-transparent lg:p-0 lg:rounded-none">
              {title}
            </h2>
            <Link
              href={`/${slug}`}
              className="md:ml-auto inline-block rounded bg-zinc-50 px-6 py-2 text-sm font-medium text-zinc-800 hover:opacity-90 transition-opacity"
            >
              Zobacz galerię
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
