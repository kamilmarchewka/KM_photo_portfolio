import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Category } from "@/types";

const contentDirectory = path.join(process.cwd(), "content/kategorie");

export function getCategories() {
  const fileNames = fs.readdirSync(contentDirectory);

  const allCategoriesData = fileNames.map((fileName) => {
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContents);

    return {
      ...data,
    } as Category;
  });

  return allCategoriesData;
}
