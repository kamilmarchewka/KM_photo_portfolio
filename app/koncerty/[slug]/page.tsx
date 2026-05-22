import Gallery from "@/components/Gallery";
import Image from "next/image";
import Link from "next/link";
import { photoData } from "@/data/photos";
import { getPostWithGallery } from "@/lib/parse-photos";
import { notFound } from "next/navigation";

export default function Koncerty({ params }: any) {
  const { slug } = params;
  const photoshoot = getPostWithGallery("avi");
  console.log("asldkfjaskldf", photoshoot);

  // if (!photoshoot) {
  //   notFound();
  // }

  // console.log("Post z galerią:", photoshoot);

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

      <Gallery photos={photoshoot?.images || []} />
    </>
  );
}
