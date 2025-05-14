"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { DefaultMenuButton } from "./headerTypes";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function DeafultMenu({
  menuData,
  selectedMenu,
  setSelectedMenu,
  setQuest,
}: DefaultMenuButton) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setSelectedMenu(menuData.value)}
    >
      <Button className="cursor-default px-4 py-2 font-bold text-white bg-transparent mx-1 text-base hover:bg-NeutralGray focus:outline-none backdrop-blur-md backdrop-contrast-60">
        {menuData.name[localeKey]}
      </Button>
      {selectedMenu === menuData.value && (
        <div
          className="absolute top-12 left-[-50px] z-40 flex flex-col font-semibold justify-center items-center p-4 bg-Background rounded-lg shadow-lg min-w-[190px] border-white border-2"
          onMouseEnter={() => setSelectedMenu(menuData.value)}
          onMouseLeave={() => setSelectedMenu(null)}
        >
          {menuData.sub_menus.map((sub) => (
            <Link
              key={sub.value}
              href={sub.link}
              onClick={() => setQuest(sub.parent_value, sub.value)}
            >
              <div className="flex px-2 py-2 text-white rounded-lg cursor-pointer justify-center items-center hover:bg-NeutralGray">
                {sub.name[localeKey]}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
