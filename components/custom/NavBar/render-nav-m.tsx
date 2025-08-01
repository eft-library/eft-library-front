"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useAppStore } from "@/store/provider";
import Link from "next/link";
import type { RenderNavTypes } from "./nav-bar.types";

export default function RenderNavM({
  navMain,
  activeMenu,
  setActiveMenu,
  setIsMobileMenuOpen,
}: RenderNavTypes) {
  const { setNpcId } = useAppStore((state) => state);
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const setQuest = (parent: string, value: string) => {
    if (parent === "QUEST") {
      setNpcId(value);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div>
      <button
        onClick={() =>
          setActiveMenu(activeMenu === navMain.value ? null : navMain.value)
        }
        className={`w-full text-left transition-colors py-2 flex justify-between items-center dark:text-white dark:hover:text-orange-400 text-gray-700 hover:text-orange-500`}
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
        <div className="ml-4 mt-2 space-y-2 max-h-64 overflow-y-auto">
          {navMain.sub_menus.map((navSub) => (
            <Link
              key={`nav-sub-${navSub.value}`}
              href={navSub.link}
              className={`block text-sm transition-colors py-1 text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400`}
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
