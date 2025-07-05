"use client";

import { useTheme } from "next-themes";
import type { ImageBoxTypes } from "../types/ImageBox.types";

export default function ImageBox({ item }: ImageBoxTypes) {
  const { theme } = useTheme();

  return (
    <div
      key={item.id}
      className={`group rounded-lg p-3 border transition-all duration-200 cursor-pointer hover:scale-105 ${
        theme === "dark"
          ? "bg-gray-800/30 border-gray-700/50 hover:border-orange-400/50 hover:bg-gray-700/30"
          : "bg-white border-gray-200 hover:border-orange-500/50 hover:bg-gray-50 shadow-sm hover:shadow-md"
      }`}
    >
      <div
        className={`aspect-square rounded-md mb-3 overflow-hidden ${
          theme === "dark" ? "bg-gray-700/50" : "bg-gray-100"
        }`}
      >
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
        />
      </div>
      <h3
        className={`text-sm font-medium text-center transition-colors ${
          theme === "dark"
            ? "text-gray-200 group-hover:text-orange-400"
            : "text-gray-700 group-hover:text-orange-500"
        }`}
      >
        {item.title}
      </h3>
    </div>
  );
}
