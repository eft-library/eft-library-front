"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import Image from "next/image";
import type { LootListTypes } from "../loot.types";
import Link from "next/link";

export default function LootCardM({ lootList }: LootListTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="lg:hidden space-y-4">
      <div className="grid gap-4 md:gap-0">
        {lootList.map((item) => (
          <Link
            key={item.id}
            target="_blank"
            href={`/item/${item.url_mapping}`}
          >
            <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] items-center p-4 rounded-lg md:rounded-none shadow-md md:shadow-none hover:shadow-lg md:hover:bg-gray-100 dark:hover:bg-[#2A2A3A] transition-all duration-200 bg-white dark:bg-[#2A2A3A] text-gray-900 dark:text-gray-50 border border-gray-200 dark:border-gray-700 md:border-b-0 md:last:border-b md:first:rounded-t-lg md:last:rounded-b-lg">
              {/* Image Section */}
              <div className="flex justify-center items-center w-full md:w-auto mb-4 md:mb-0 md:border-r md:border-gray-200 dark:md:border-gray-700 md:pr-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={item.image_width * 52}
                  height={item.image_height * 52}
                  style={{ objectFit: "contain" }}
                  className="rounded-md border border-gray-200 dark:border-gray-700"
                />
              </div>
              {/* Name Section */}
              <div className="text-center md:text-left font-medium text-xl md:pl-4 md:text-lg">
                {item.name[localeKey]}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
