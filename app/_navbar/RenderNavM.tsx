"use client";

import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useAppStore } from "@/store/provider";
import Link from "next/link";
import type { RenderNavTypes } from "./NavBar.types";

export default function RenderNavM({
  navMain,
  activeMenu,
  setActiveMenu,
}: RenderNavTypes) {
  const { setNpcId } = useAppStore((state) => state);
  const { theme } = useTheme();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const setQuest = (parent: string, value: string) => {
    if (parent === "QUEST") {
      setNpcId(value);
    }
  };

  return (
    <div>
      <button
        onClick={() => setActiveMenu(navMain.value)}
        className={`w-full text-left transition-colors py-2 flex justify-between items-center ${
          theme === "dark"
            ? "text-white hover:text-orange-400"
            : "text-gray-700 hover:text-orange-500"
        }`}
      >
        {navMain.name[localeKey]}
        <span
          className={`transform transition-transform ${
            activeMenu === navMain.value ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Mobile Dropdown */}
      {activeMenu === navMain.value && (
        <div className="ml-4 mt-2 space-y-2">
          {navMain.sub_menus.map((navSub) => (
            <Link
              key={`nav-sub-${navSub.value}`}
              href={navSub.link}
              className={`block text-sm transition-colors py-1 ${
                theme === "dark"
                  ? "text-gray-300 hover:text-orange-400"
                  : "text-gray-600 hover:text-orange-500"
              }`}
              onClick={() => setQuest(navSub.parent_value, navSub.value)}
            >
              {navSub.name[localeKey]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
