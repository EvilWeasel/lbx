"use client";

import { Category } from "@prisma/client";

import { FaReact } from "react-icons/fa";
import { FaToolbox } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";

import { IconType } from "react-icons/lib";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}
const iconMap: Record<Category["name"], IconType> = {
  "Web Development": FaReact,
  "Development-Tooling": FaToolbox,
  "AI-Integration": FaRobot,
  Documentation: FaFileAlt,
};

export const Categories = async ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
