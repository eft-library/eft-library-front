"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import type { AmmoListTypes } from "../ammo.types";
import Image from "next/image";
import { getEffectivenessColor } from "@/lib/func/jsxfunction";
import ItemTableHeader from "@/components/custom/itemTable/item-table-header";
import ItemTableRowWrapper from "@/components/custom/itemTable/item-table-row-wrapper";

export default function AmmoTable({ ammoList }: AmmoListTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const columns = [
    { key: "photo", colSpan: 1, colText: itemI18N.ammo.photo[localeKey] },
    { key: "name", colSpan: 2, colText: itemI18N.ammo.name[localeKey] },
    { key: "damage", colSpan: 1, colText: itemI18N.ammo.damage[localeKey] },
    {
      key: "penetration",
      colSpan: 1,
      colText: itemI18N.ammo.penetration[localeKey],
    },
    {
      key: "armorEffectiveness",
      colSpan: 2,
      colText: itemI18N.ammo.armorEffectiveness[localeKey],
    },
  ];

  return (
    <div className="hidden lg:block">
      <div
        className={`rounded-lg border overflow-hidden dark:bg-slate-800 border-slate-700 bg-white border-gray-200`}
      >
        {/* Table Header */}
        <ItemTableHeader gridColSpan={7} columns={columns} />

        {/* Table Rows */}
        {ammoList.map((item, index) => (
          <ItemTableRowWrapper
            urlMapping={item.url_mapping}
            dataIndex={index}
            dataLength={ammoList.length}
            key={item.id}
            gridCols={7}
          >
            {/* Image */}
            <div className="col-span-1 flex justify-center">
              <div
                className={`w-12 h-12 rounded border flex items-center justify-center dark:bg-slate-600 dark:border-slate-500 bg-gray-100 border-gray-300`}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-cover rounded"
                />
              </div>
            </div>

            {/* Name */}
            <div className="col-span-2 flex items-center">
              <span>{item.name[localeKey]}</span>
            </div>

            {/* Damage */}
            <div className="col-span-1 flex items-center justify-center">
              <span className="text-yellow-500 font-semibold">
                {item.info.damage}
              </span>
            </div>

            {/* Penetration */}
            <div className="col-span-1 flex items-center justify-center">
              <span className="text-blue-500 font-semibold">
                {item.info.penetration_power}
              </span>
            </div>

            {/* Effectiveness */}
            <div className="col-span-2 flex items-center">
              <div className="grid grid-cols-6 w-full">
                {item.info.efficiency &&
                  item.info.efficiency.map((value, idx) => (
                    <div
                      key={`ammo-efficiency-${idx}`}
                      className={`w-8 h-8 rounded border-2 flex items-center justify-center text-sm font-bold ${getEffectivenessColor(
                        value
                      )}`}
                    >
                      {value}
                    </div>
                  ))}
              </div>
            </div>
          </ItemTableRowWrapper>
        ))}
      </div>
    </div>
  );
}
