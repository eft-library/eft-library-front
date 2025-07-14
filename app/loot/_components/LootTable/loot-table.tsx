"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import ItemTableHeader from "@/components/custom/itemTable/item-table-header";
import ItemTableRowWrapper from "@/components/custom/itemTable/item-table-row-wrapper";
import type { LootListTypes } from "../loot.types";

export default function LootTable({ lootList }: LootListTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const columns = [
    { key: "photo", colSpan: 1, colText: itemI18N.loot.photo[localeKey] },
    { key: "name", colSpan: 1, colText: itemI18N.loot.name[localeKey] },
  ];
  return (
    <div className="hidden lg:block">
      <div
        className={`rounded-lg border overflow-hidden dark:bg-slate-800 border-slate-700 bg-white border-gray-200`}
      >
        {/* Table Header */}
        <ItemTableHeader gridColSpan={2} columns={columns} />

        {/* Table Rows */}
        {lootList.map((item, index) => (
          <ItemTableRowWrapper
            urlMapping={item.url_mapping}
            dataIndex={index}
            dataLength={lootList.length}
            key={item.id}
            gridCols={2}
          >
            {/* Image */}
            <div className="col-span-1 flex justify-center">
              <div className="flex justify-center items-center w-full md:w-auto mb-4 md:mb-0 md:border-r md:border-gray-200 dark:md:border-gray-700 md:pr-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  style={{ objectFit: "contain" }}
                  className="rounded-md border border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>

            {/* Name */}
            <div className="col-span-1 flex items-center justify-center">
              <span>{item.name[localeKey]}</span>
            </div>
          </ItemTableRowWrapper>
        ))}
      </div>
    </div>
  );
}
