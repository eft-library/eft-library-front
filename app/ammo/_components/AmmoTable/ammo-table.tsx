"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import type { AmmoListTypes } from "../ammo.types";
import Image from "next/image";
import { getEffectivenessColor } from "@/lib/func/jsxfunction";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function AmmoTable({ ammoList }: AmmoListTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { theme } = useTheme();

  return (
    <div
      className={`mb-6 border rounded-lg ${
        theme === "dark"
          ? "border-gray-600 bg-gray-800"
          : "border-gray-300 bg-white"
      }`}
    >
      {/* Desktop Header */}
      <div
        className={`hidden md:grid grid-cols-6 gap-4 p-4 border-b font-semibold text-center ${
          theme === "dark"
            ? "border-gray-600 bg-gray-750 text-white"
            : "border-gray-200 bg-gray-50 text-black"
        }`}
      >
        <div>{itemI18N.ammo.photo[localeKey]}</div>
        <div className="flex items-center justify-center cursor-pointer">
          {itemI18N.ammo.name[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          {itemI18N.ammo.damage[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          {itemI18N.ammo.penetration[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer col-span-2">
          {itemI18N.ammo.armorEffectiveness[localeKey]}
        </div>
      </div>

      {/* Items */}
      {ammoList.map((item) => (
        <div
          key={item.id}
          className={`border-b last:border-b-0 ${
            theme === "dark"
              ? "border-gray-700 hover:bg-gray-750"
              : "border-gray-200 hover:bg-gray-50"
          }`}
        >
          <Link
            key={item.id}
            target="_blank"
            href={`/item/${item.url_mapping}`}
          >
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-6 gap-4 p-4 items-center text-center">
              <div className="col-span-1 flex justify-center">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  className="w-20 h-20 object-contain rounded border border-gray-600"
                />
              </div>
              <div
                className={`col-span-1 text-sm font-medium text-center ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {item.name[localeKey]}
              </div>
              <div
                className={`col-span-1 text-center font-normal ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {item.info.damage}
              </div>
              <div
                className={`col-span-1 text-center font-normal ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {item.info.penetration_power}
              </div>
              <div
                className={`col-span-2 flex items-center justify-center gap-2 text-center font-normal ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
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

            {/* Mobile Layout - Improved */}
            <div className="md:hidden p-4">
              {/* Header with Image and Name */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name.en}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain rounded border border-gray-600"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold text-lg leading-tight mb-2 ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {item.name[localeKey]}
                  </h3>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div
                  className={`p-3 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div
                    className={`font-semibold text-xs uppercase tracking-wide mb-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {itemI18N.ammo.damage[localeKey]}
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {item.info.damage}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div
                    className={`font-semibold text-xs uppercase tracking-wide mb-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {itemI18N.ammo.penetration[localeKey]}
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {item.info.penetration_power}
                  </div>
                </div>
              </div>

              {/* Armor Effectiveness */}
              {item.info.efficiency && item.info.efficiency.length > 0 && (
                <div
                  className={`p-3 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div
                    className={`font-semibold text-xs uppercase tracking-wide mb-3 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {itemI18N.ammo.armorEffectiveness[localeKey]}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {item.info.efficiency.map((value, idx) => (
                      <div
                        key={`mobile-ammo-efficiency-${idx}`}
                        className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-sm font-bold shadow-sm ${getEffectivenessColor(
                          value
                        )}`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
