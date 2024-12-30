"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface MenuData {
  en_name: string;
  link: string;
  order: number;
  value: string;
  kr_name: string;
  image: string | null;
}

interface SubMenu extends MenuData {
  parent_value: string;
}

interface Menu extends MenuData {
  sub_menus: SubMenu[];
}

interface MenuButton {
  menuData: Menu;
  selectedMenu: string;
  setSelectedMenu: (menu: string | null) => void;
  setQuest: (parent: string, value: string) => void;
}

export default function DeafultMenu({
  menuData,
  selectedMenu,
  setSelectedMenu,
  setQuest,
}: MenuButton) {
  return (
    <div
      className="relative group"
      onMouseEnter={() => setSelectedMenu(menuData.value)}
      onMouseLeave={() => setSelectedMenu(null)}
    >
      <button
        className={cn(
          "px-4 py-2 font-bold text-white bg-transparent",
          "hover:bg-gray-200 focus:outline-none",
          "backdrop-blur-md backdrop-contrast-60"
        )}
      >
        {menuData.kr_name}
      </button>
      {selectedMenu === menuData.value && (
        <div
          className={cn(
            "absolute top-12 left-0 z-10 flex flex-col",
            "p-4 bg-gray-800 rounded-lg shadow-lg"
          )}
        >
          {menuData.sub_menus.map((sub) => (
            <Link
              key={sub.value}
              href={sub.link}
              onClick={() => setQuest(sub.parent_value, sub.value)}
            >
              <div
                className={cn(
                  "px-2 py-1 text-white rounded-lg cursor-pointer",
                  "hover:bg-gray-300 hover:text-black"
                )}
              >
                {sub.kr_name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
