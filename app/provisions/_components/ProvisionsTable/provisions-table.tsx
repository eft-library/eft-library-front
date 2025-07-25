"use client";

import { useLocale } from "next-intl";
import { getLocaleKey, getEffectLocalizedKey } from "@/lib/func/localeFunction";
import { effectI18N, itemI18N } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ProvisionsListTypes, StimEffect } from "../provisions.types";
import { getPlusMinus } from "@/lib/func/jsxfunction";

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
                {(["advantage", "buff", "malus", "de_buff"] as const).map(
                  (effectKey) => {
                    const effects = item.info[effectKey];
                    if (!effects || effects.length === 0) return null;

                    const grouped: Record<string, StimEffect[]> = {};
                    for (const effect of effects) {
                      const groupKey = `${effect.delay}-${effect.duration}`;
                      if (!grouped[groupKey]) grouped[groupKey] = [];
                      grouped[groupKey].push(effect);
                    }

                    const textColor =
                      effectKey === "de_buff"
                        ? "text-red-400"
                        : "text-green-400";

                    return (
                      <div key={effectKey}>
                        {Object.entries(grouped).map(
                          ([groupKey, groupEffects]) => {
                            const [delay, duration] = groupKey.split("-");

                            return (
                              <div
                                className="flex flex-col"
                                key={`${effectKey}-${groupKey}`}
                              >
                                <div className="text-yellow-400">
                                  {[
                                    delay !== "0"
                                      ? `${delay} ${effectI18N.delay[localeKey]}`
                                      : "",
                                    duration !== "0"
                                      ? `${duration} ${effectI18N.duration[localeKey]}`
                                      : "",
                                  ]
                                    .filter(Boolean)
                                    .join(" ")}
                                </div>

                                {groupEffects.map((effect, i) => (
                                  <div
                                    className={textColor}
                                    key={`${effectKey}-effect-${i}`}
                                  >
                                    {effect[getEffectLocalizedKey(localeKey)]}
                                    {effectKey === "buff" ||
                                    effectKey === "de_buff"
                                      ? ` ${getPlusMinus(effect.value)}`
                                      : ""}
                                  </div>
                                ))}
                              </div>
                            );
                          }
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden p-4 space-y-4">
              <div className="flex items-center space-x-4 pb-3 border-b border-gray-600">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  className="w-34 h-30 object-contain rounded border border-gray-600"
                />
                <div className="flex-1">
                  <h3
                    className={`font-medium text-base ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {item.name[localeKey]}
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
                      item.info.hydration < 0
                        ? "text-red-400"
                        : theme === "dark"
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {item.info.hydration}
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
                    {(["advantage", "buff", "malus", "de_buff"] as const).map(
                      (effectKey) => {
                        const effects = item.info[effectKey];
                        if (!effects || effects.length === 0) return null;

                        // delay-duration 조합으로 그룹화
                        const grouped: Record<string, StimEffect[]> = {};
                        for (const effect of effects) {
                          const groupKey = `${effect.delay}-${effect.duration}`;
                          if (!grouped[groupKey]) grouped[groupKey] = [];
                          grouped[groupKey].push(effect);
                        }

                        const textColor =
                          effectKey === "de_buff" || effectKey === "malus"
                            ? "text-red-400 text-sm p-2 rounded"
                            : "text-green-400 text-sm p-2 rounded";

                        return (
                          <div key={effectKey}>
                            {Object.entries(grouped).map(
                              ([groupKey, groupEffects]) => {
                                const [delay, duration] = groupKey.split("-");

                                return (
                                  <div
                                    className="flex flex-col"
                                    key={`${effectKey}-${groupKey}`}
                                  >
                                    {/* 공통 delay-duration 정보 */}
                                    <div className="text-yellow-400 text-sm p-2 rounded">
                                      {[
                                        delay !== "0"
                                          ? `${delay} ${effectI18N.delay[localeKey]}`
                                          : "",
                                        duration !== "0"
                                          ? `${duration} ${effectI18N.duration[localeKey]}`
                                          : "",
                                      ]
                                        .filter(Boolean)
                                        .join(" ")}
                                    </div>

                                    {/* 그룹 내 효과 이름 + value */}
                                    {groupEffects.map((effect, i) => (
                                      <div
                                        className={textColor}
                                        key={`${effectKey}-effect-${i}`}
                                      >
                                        {
                                          effect[
                                            getEffectLocalizedKey(localeKey)
                                          ]
                                        }
                                        {effectKey === "buff" ||
                                        effectKey === "de_buff"
                                          ? ` ${getPlusMinus(effect.value)}`
                                          : ""}
                                      </div>
                                    ))}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
