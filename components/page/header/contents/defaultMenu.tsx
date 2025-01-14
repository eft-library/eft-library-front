"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { DefaultMenuButton } from "./headerTypes";

export default function DeafultMenu({
  menuData,
  selectedMenu,
  setSelectedMenu,
  setQuest,
}: DefaultMenuButton) {
  return (
    <div
      className="relative group"
      onMouseEnter={() => setSelectedMenu(menuData.value)}
    >
      <Button className="cursor-default px-4 py-2 font-bold text-white bg-transparent mx-1 text-base hover:bg-NeutralGray focus:outline-none backdrop-blur-md backdrop-contrast-60">
        {menuData.kr_name}
      </Button>
      {selectedMenu === menuData.value && (
        <div
          className="absolute top-12 left-[-30px] z-40 flex flex-col font-semibold justify-center items-center p-4 bg-MidnightBlack rounded-lg shadow-lg min-w-[150px]"
          onMouseEnter={() => setSelectedMenu(menuData.value)}
          onMouseLeave={() => setSelectedMenu(null)}
        >
          {menuData.sub_menus.map((sub) => (
            <Link
              key={sub.value}
              href={sub.link}
              onClick={() => setQuest(sub.parent_value, sub.value)}
            >
              <div className="flex px-2 py-2 text-white rounded-lg cursor-pointer min-w-[100px] justify-center items-center hover:bg-NeutralGray">
                {sub.kr_name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
