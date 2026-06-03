// src/types/index.ts
export interface Photo {
  id: string;
  src: string;
  alt: string;
  orientation: "portrait" | "landscape";
}

export interface Category {
  title: string;
  slug: string;
  coverImageSrc: string;
}
