import Gallery from "@/components/Gallery";
import Image from "next/image";
import Link from "next/link";
import { photoData } from "@/data/photos";
import { notFound } from "next/navigation";
import {
  getEventDetails,
  getEventsForCategory,
  getCategories,
} from "@/lib/content";

export default async function Galeria({ params }: { params: any }) {
  const eventData = getEventDetails("koncerty", "beta-session");
  const photos = eventData?.images || [];

  console.log(photos);

  return (
    <>
      <section className="flex flex-col gap-2 bg-pink-100 mt-40">
        <div className="flex gap-2 w-full bg-green-700 min-h-10 justify-center items-center">
          <div className="aspect-2/3 min-w-10 bg-gray-700 grow"></div>
          <div className="aspect-3/2 min-w-10 bg-gray-300 grow-[2.25]"></div>
        </div>
        <div className="flex gap-2">
          <div className="aspect-2/3 bg-gray-700 grow">pion</div>
          <div className="aspect-2/3 bg-gray-700 grow">pion</div>
          <div className="aspect-2/3 bg-gray-700 grow">pion</div>
        </div>
        <div className="flex gap-2">
          <div className="aspect-3/2 bg-gray-700 grow">poziom</div>
          <div className="aspect-3/2 bg-gray-700 grow">poziom</div>
        </div>
        <div className="flex gap-2">
          <div className="aspect-2/3 bg-gray-700 grow">pion</div>
          <div className="grow gap-2 flex flex-col">
            <div className="aspect-3/2 bg-gray-700 grow">poziom</div>
            <div className="aspect-3/2 bg-gray-700 grow">poziom</div>
          </div>
        </div>
      </section>
    </>
  );
}
