"use client";

import { useTheme } from "next-themes";
import ImageBox from "@/components/ui/ImageBox";

export default function MainView() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-[#1e2124] text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <ImageBox
        item={{ id: "23", title: " test", image: "asd", link: "qwe" }}
      />
    </div>
  );
}
