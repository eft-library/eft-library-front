"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import type { ArmorVestListTypes } from "../armor-vest.types";
import Image from "next/image";
import ItemTableHeader from "@/components/custom/itemTable/item-table-header";
import ItemTableRowWrapper from "@/components/custom/itemTable/item-table-row-wrapper";

export default function ArmorVestTable({ armorVestList }: ArmorVestListTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const columns = [
    { key: "photo", colSpan: 1, colText: itemI18N.armorVest.photo[localeKey] },
    { key: "name", colSpan: 1, colText: itemI18N.armorVest.name[localeKey] },
    {
      key: "durability",
      colSpan: 1,
      colText: itemI18N.armorVest.durability[localeKey],
    },
    {
      key: "armorClass",
      colSpan: 1,
      colText: itemI18N.armorVest.armorClass[localeKey],
    },
  ];

  return (
    <div className="hidden lg:block">
      <div
        className={`rounded-lg border overflow-hidden dark:bg-slate-800 border-slate-700 bg-white border-gray-200`}
      >
        {/* Table Header */}
        <ItemTableHeader gridColSpan={4} columns={columns} />

        {/* Table Rows */}
        {armorVestList.map((item, index) => (
          <ItemTableRowWrapper
            urlMapping={item.url_mapping}
            dataIndex={index}
            dataLength={armorVestList.length}
            key={item.id}
            gridCols={4}
          >
            {/* Image */}
            <div className="col-span-1 flex justify-center">
              <div
                className={`w-30 h-30 rounded border flex items-center justify-center dark:bg-slate-600 dark:border-slate-500 bg-gray-100 border-gray-300`}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            </div>

            {/* Name */}
            <div className="col-span-1 flex items-center justify-center">
              <span>{item.name[localeKey]}</span>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <span>{item.info.durability}</span>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <span>{item.info.class_value}</span>
            </div>
          </ItemTableRowWrapper>
        ))}
      </div>
    </div>
  );
}
