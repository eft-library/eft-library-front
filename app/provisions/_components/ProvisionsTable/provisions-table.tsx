"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ProvisionsListTypes } from "../provisions.types";
import { filterStimEffects } from "@/lib/func/jsxfunction";

export default function ProvisionsTable({
  provisionsList,
}: ProvisionsListTypes) {
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
        className={`hidden md:grid grid-cols-5 gap-4 p-4 border-b font-semibold text-center ${
          theme === "dark"
            ? "border-gray-600 bg-gray-750 text-white"
            : "border-gray-200 bg-gray-50 text-black"
        }`}
      >
        <div>{itemI18N.provisions.photo[localeKey]}</div>
        <div className="flex items-center justify-center cursor-pointer">
          {itemI18N.provisions.name[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          {itemI18N.provisions.energy[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          {itemI18N.provisions.hydration[localeKey]}
        </div>
        <div>{itemI18N.provisions.effect[localeKey]}</div>
      </div>

      {/* Items */}
      {provisionsList.map((item) => (
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
            <div className="hidden md:grid grid-cols-5 gap-4 p-4 items-center text-center">
              <div className="col-span-1 flex justify-center">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  className="w-34 h-30 object-contain rounded border border-gray-600"
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
                className={`col-span-1 text-center font-medium ${
                  item.info.energy > 0
                    ? "text-green-400"
                    : theme === "dark"
                    ? "text-white"
                    : "text-black"
                }`}
              >
                {item.info.energy > 0
                  ? `+${item.info.energy}`
                  : item.info.energy}
              </div>
              <div
                className={`col-span-1 text-center font-normal ${
                  item.info.hydration < 0
                    ? "text-red-400"
                    : theme === "dark"
                    ? "text-white"
                    : "text-black"
                }`}
              >
                {item.info.hydration}
              </div>
              <div className="col-span-1 text-sm space-y-1">
                {item.info.stim_effects.length > 0 ? (
                  filterStimEffects(item.info.stim_effects).map(
                    (effect, index) => (
                      <div key={`${index}-${item.id}`}>
                        {effect.skill_name_ko}
                      </div>
                    )
                  )
                ) : (
                  <></>
                )}
                {/* {item.effects.map((effect, index) => (
                  <div
                    key={index}
                    className={
                      effect.includes("+")
                        ? "text-green-400"
                        : effect.includes("-") && effect !== "-"
                        ? "text-red-400"
                        : theme === "dark"
                        ? "text-white"
                        : "text-black"
                    }
                  >
                    {effect}
                  </div>
                ))} */}
              </div>
            </div>

            {/* Mobile Layout */}
            {/* <div className="md:hidden p-4 space-y-4">
              <div className="flex items-center space-x-4 pb-3 border-b border-gray-600">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded border border-gray-600 flex-shrink-0"
                />
                <div className="flex-1">
                  <h3
                    className={`font-medium text-base ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {item.name}
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div
                  className={`p-3 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div
                    className={`font-semibold text-xs uppercase tracking-wide mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {itemI18N.provisions.energy[localeKey]}
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      item.energy > 0
                        ? "text-green-400"
                        : theme === "dark"
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {item.energy > 0 ? `+${item.energy}` : item.energy}
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div
                    className={`font-semibold text-xs uppercase tracking-wide mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {itemI18N.provisions.hydration[localeKey]}
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      item.hydration < 0
                        ? "text-red-400"
                        : theme === "dark"
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {item.hydration}
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg col-span-2 ${
                    theme === "dark" ? "bg-purple-900/20" : "bg-purple-50"
                  }`}
                >
                  <div
                    className={`font-semibold text-xs uppercase tracking-wide mb-2 ${
                      theme === "dark" ? "text-purple-300" : "text-purple-700"
                    }`}
                  >
                    {itemI18N.provisions.effect[localeKey]}
                  </div>
                  <div className="space-y-1">
                    {item.effects.map((effect, index) => (
                      <div
                        key={index}
                        className={`text-sm p-2 rounded ${
                          effect.includes("+")
                            ? theme === "dark"
                              ? "bg-green-900/30 text-green-400"
                              : "bg-green-100 text-green-600"
                            : effect.includes("-") && effect !== "-"
                            ? theme === "dark"
                              ? "bg-red-900/30 text-red-400"
                              : "bg-red-100 text-red-600"
                            : theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        • {effect}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
          </Link>
        </div>
      ))}
    </div>
  );
}
