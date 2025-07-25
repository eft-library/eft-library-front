"use cleint";

import type { StimEffect, StimulantTypes } from "../medical.types";
import Image from "next/image";
import { useLocale } from "next-intl";
import { getEffectLocalizedKey, getLocaleKey } from "@/lib/func/localeFunction";
import { effectI18N, itemI18N } from "@/lib/consts/i18nConsts";
import { getPlusMinus } from "@/lib/func/jsxfunction";
import Link from "next/link";

export default function Stimulant({ medicalList }: StimulantTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="mb-6 border rounded-lg border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900/50">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-3 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-gray-900 font-semibold text-center dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100">
        <div>{itemI18N.medical.photo[localeKey]}</div>
        <div>{itemI18N.medical.name[localeKey]}</div>
        <div>{itemI18N.medical.buff[localeKey]}</div>
      </div>

      {/* Items */}
      {medicalList.map((item) => (
        <div
          key={item.id}
          className="border-b last:border-b-0 border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600"
        >
          <Link href={`/item/${item.url_mapping}`} target="_blank">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-3 gap-4 p-4 items-center text-center">
              <div className="flex justify-center">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={120}
                  height={120}
                  className="w-34 h-30 object-contain rounded border border-gray-600"
                />
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {item.name[localeKey]}
              </div>
              <div className="text-sm space-y-1">
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
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded border border-gray-300 dark:border-gray-600"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-base text-gray-900 dark:text-gray-100">
                    {item.name[localeKey]}
                  </h3>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                <div
                  className={`font-semibold text-xs uppercase tracking-wide mb-3 text-purple-300 dark:text-purple-700`}
                >
                  {itemI18N.medical.buff[localeKey]}
                </div>
                <div className="space-y-2">
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
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
