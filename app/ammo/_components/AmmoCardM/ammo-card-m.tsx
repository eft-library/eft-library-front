"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useTheme } from "next-themes";
import { itemI18N } from "@/lib/consts/i18nConsts";
import type { AmmoListTypes } from "../ammo.types";
import Image from "next/image";
import { getEffectivenessColor } from "@/lib/func/jsxfunction";
import Link from "next/link";

export default function AmmoCardM({ ammoList }: AmmoListTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { theme } = useTheme();

  return (
    <div className="lg:hidden space-y-4">
      {ammoList.map((item) => (
        <Link key={item.id} target="_blank" href={`/item/${item.url_mapping}`}>
          <div
            className={`rounded-lg border p-4 ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 hover:bg-slate-600"
                : "bg-white border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-start space-x-4 mb-4">
              <div
                className={`w-16 h-16 rounded border flex items-center justify-center flex-shrink-0 ${
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
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-2 break-words">
                  {item.name[localeKey]}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }
                    >
                      {itemI18N.ammo.damage[localeKey]}:
                    </span>
                    <span className="text-yellow-500 font-semibold ml-2">
                      {item.info.damage}
                    </span>
                  </div>
                  <div>
                    <span
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }
                    >
                      {itemI18N.ammo.penetration[localeKey]}:
                    </span>
                    <span className="text-blue-500 font-semibold ml-2">
                      {item.info.penetration_power}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={`text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {itemI18N.ammo.armorEffectiveness[localeKey]}
              </div>
              <div className="flex items-center justify-center gap-2">
                {item.info.efficiency &&
                  item.info.efficiency.map((value, idx) => (
                    <div key={`ammo-efficiency-${idx}`} className="text-center">
                      <div
                        className={`w-8 h-8 mx-auto rounded border-2 flex items-center justify-center text-sm font-bold ${getEffectivenessColor(
                          value,
                          theme === "dark"
                        )}`}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
