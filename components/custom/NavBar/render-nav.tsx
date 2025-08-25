"use client";

import type { RenderNavTypes } from "./nav-bar.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useAppStore } from "@/store/provider";
import Link from "next/link";

export default function RenderNav({
  navMain,
  activeMenu,
  setActiveMenu,
}: RenderNavTypes) {
  const { setNpcId } = useAppStore((state) => state);
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const setQuest = (parent: string, value: string) => {
    if (parent === "QUEST") {
      setNpcId(value);
    }
  };

  return (
    <div
      key={`nav-main-${navMain.value}`}
      className="relative"
      onMouseEnter={() => setActiveMenu(navMain.value)}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <a
        href="#"
        className={`transition-colors text-sm py-4 block dark:text-white dark:hover:text-orange-400 text-gray-700 hover:text-orange-500`}
      >
        {navMain.name[localeKey]}
      </a>

      {activeMenu === navMain.value && (
        <div
          className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-0 w-48 border rounded-md shadow-lg z-50 dark:bg-[#2a2d35] dark:border-gray-600 bg-white border-gray-200`}
        >
          <div className="py-2">
            {navMain.sub_menus.map((navSub) => (
              <Link
                key={`nav-sub-${navSub.value}`}
                scroll={false}
                href={navSub.link}
                className={`block px-4 py-2 text-sm transition-colors text-center dark:text-gray-300 dark:hover:text-orange-400 dark:hover:bg-gray-700/50 text-gray-700 hover:text-orange-500 hover:bg-gray-100`}
                onClick={() => setQuest(navSub.parent_value, navSub.value)}
              >
                {navSub.name[localeKey]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
