"use client";

import type { RenderNavTypes } from "./nav-bar.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function RenderNav({
  navMain,
  activeMenu,
  setActiveMenu,
}: RenderNavTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { theme } = useTheme();

  return (
    <div
      key={`nav-main-${navMain.value}`}
      className="relative"
      onMouseEnter={() => setActiveMenu(navMain.value)}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <Button
        variant="ghost"
        className={`cursor-pointer transition-colors text-sm py-4 h-auto ${
          theme === "dark"
            ? "text-white hover:text-orange-400 hover:bg-transparent"
            : "text-gray-700 hover:text-orange-500 hover:bg-transparent"
        }`}
      >
        {navMain.name[localeKey]}
      </Button>

      {activeMenu === navMain.value && (
        <div
          className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-0 w-48 border rounded-md shadow-lg z-50 ${
            theme === "dark"
              ? "bg-[#2a2d35] border-gray-600"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="py-2">
            {navMain.sub_menus.map((navSub) => (
              <Link key={`nav-sub-${navSub.value}`} href={navSub.link}>
                <Button
                  variant="ghost"
                  className={`cursor-pointer w-full text-sm transition-colors text-center justify-center h-auto py-2 ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-orange-400 hover:bg-gray-700/50"
                      : "text-gray-700 hover:text-orange-500 hover:bg-gray-100"
                  }`}
                >
                  {navSub.name[localeKey]}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
