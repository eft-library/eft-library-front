"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useAppStore } from "@/components/provider/app-store-provider";
import Link from "next/link";
import type { RenderNavTypes } from "./nav-bar.types";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Info, Package, Target, Map, UserRoundPen } from "lucide-react";

export default function RenderNavM({
  navMain,
  activeMenu,
  setActiveMenu,
  setIsMobileMenuOpen,
}: RenderNavTypes) {
  const { setNpcId } = useAppStore((state) => state);
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { theme } = useTheme();

  const getMenuIcon = (menuKey: string) => {
    switch (menuKey) {
      case "MAP":
        return <Map className="w-5 h-5" />;
      case "QUEST":
        return <Target className="w-5 h-5" />;
      case "ITEM":
        return <Package className="w-5 h-5" />;
      case "INFO":
        return <Info className="w-5 h-5" />;
      case "COMMUNITY":
        return <UserRoundPen className="w-5 h-5" />;
      default:
        return null;
    }
  };

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
        className={`cursor-pointer w-full text-left transition-colors py-1 flex justify-between items-center ${
          theme === "dark" ? "text-white" : "text-gray-700"
        }`}
      >
        <div className="flex items-center space-x-3">
          {getMenuIcon(navMain.value)}
          <span className="text-base font-medium">
            {navMain.name[localeKey]}
          </span>
        </div>

        <span
          className={`transform transition-transform duration-200 ${
            activeMenu === navMain.value ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Mobile Dropdown */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          activeMenu === navMain.value
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-8 mt-1 space-y-1 pb-1">
          {navMain.sub_menus.map((navSub) => (
            <Link
              key={`nav-sub-${navSub.value}`}
              href={navSub.link}
              onClick={() => setQuest(navSub.parent_value, navSub.value)}
            >
              <Button
                variant="ghost"
                className={`cursor-pointer w-full text-left justify-start text-sm transition-colors py-1 h-auto ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-orange-400 hover:bg-transparent"
                    : "text-gray-600 hover:text-orange-500 hover:bg-transparent"
                }`}
              >
                {navSub.name[localeKey]}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
