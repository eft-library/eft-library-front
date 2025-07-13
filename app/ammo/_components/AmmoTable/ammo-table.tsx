"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useTheme } from "next-themes";
import { itemI18N } from "@/lib/consts/i18nConsts";
import type { AmmoListTypes } from "../ammo.types";
import Image from "next/image";
import { getEffectivenessColor } from "@/lib/func/jsxfunction";
import Link from "next/link";

export default function AmmoTable({ ammoList }: AmmoListTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { theme } = useTheme();

  return (
    <div className="hidden lg:block">
      <div
        className={`rounded-lg border overflow-hidden ${
          theme === "dark"
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Table Header */}
        <div
          className={`grid grid-cols-7 gap-4 p-4 border-b font-semibold ${
            theme === "dark"
              ? "bg-slate-700 border-slate-600"
              : "bg-gray-100 border-gray-200"
          }`}
        >
          <div className="col-span-1 text-center">
            {itemI18N.ammo.photo[localeKey]}
          </div>
          <div className="col-span-2 text-center">
            {itemI18N.ammo.name[localeKey]}
          </div>
          <div className="col-span-1 text-center">
            {itemI18N.ammo.damage[localeKey]}
          </div>
          <div className="col-span-1 text-center">
            {itemI18N.ammo.penetration[localeKey]}
          </div>
          <div className="col-span-2 text-center">
            {itemI18N.ammo.armorEffectiveness[localeKey]}
          </div>
        </div>

        {/* Table Rows */}
        {ammoList.map((item, index) => (
          <Link
            key={item.id}
            target="_blank"
            href={`/item/${item.url_mapping}`}
          >
            <div
              className={`grid grid-cols-7 gap-4 p-4 border-b transition-colors ${
                theme === "dark"
                  ? "border-slate-700 hover:bg-slate-600"
                  : "border-gray-200 hover:bg-gray-50"
              } ${index === ammoList.length - 1 ? "border-b-0" : ""}`}
            >
              {/* Image */}
              <div className="col-span-1 flex justify-center">
                <div
                  className={`w-12 h-12 rounded border flex items-center justify-center ${
                    theme === "dark"
                      ? "bg-slate-600 border-slate-500"
                      : "bg-gray-100 border-gray-300"
                  }`}
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
                          value,
                          theme === "dark"
                        )}`}
                      >
                        {value}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
