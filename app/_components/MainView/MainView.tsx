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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <ImageBox
          item={{ id: "23", title: " test", image: "asd", link: "qwe" }}
        />
        <ImageBox
          item={{ id: "23", title: " test", image: "asd", link: "qwe" }}
        />
        <ImageBox
          item={{ id: "23", title: " test", image: "asd", link: "qwe" }}
        />
        <ImageBox
          item={{ id: "23", title: " test", image: "asd", link: "qwe" }}
        />
        <ImageBox
          item={{ id: "23", title: " test", image: "asd", link: "qwe" }}
        />
        <ImageBox
          item={{ id: "23", title: " test", image: "asd", link: "qwe" }}
        />
        <ImageBox
          item={{ id: "23", title: " test", image: "asd", link: "qwe" }}
        />
        <ImageBox
          item={{ id: "23", title: " test", image: "asd", link: "qwe" }}
        />
      </div>
    </div>
  );
}
