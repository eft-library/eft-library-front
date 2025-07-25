"use client";
import type { StimEffect, StimulantTypes } from "../medical.types";
import Image from "next/image";
import { useLocale } from "next-intl";
import { getEffectLocalizedKey, getLocaleKey } from "@/lib/func/localeFunction";
import { effectI18N, itemI18N } from "@/lib/consts/i18nConsts";
import { getPlusMinus } from "@/lib/func/jsxfunction";
import Highlighter from "react-highlight-words";
import Link from "next/link";

export default function Stimulant({ medicalList, word }: StimulantTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const filteredList = medicalList.filter((item) =>
    item.name[localeKey].toLowerCase().includes(word.toLowerCase())
  );

  return (
    <div className="mb-6 border border-border rounded-xl bg-background dark:bg-card shadow-sm dark:shadow-lg">
      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-3 gap-4 p-4 border-b border-border font-semibold text-center bg-muted/50 dark:bg-card-foreground/10 text-foreground rounded-t-xl">
        <div>{itemI18N.medical.photo[localeKey]}</div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.medical.name[localeKey]}
        </div>
        <div className="flex items-center justify-center cursor-pointer hover:text-primary transition-colors">
          {itemI18N.medical.buff[localeKey]}
        </div>
      </div>
      {/* Items */}
      {filteredList.map((item) => (
        <div
          key={item.id}
          className="border-b border-border last:border-b-0 hover:bg-muted/30 dark:hover:bg-card-foreground/5 transition-all duration-200"
        >
          <Link href={`/item/${item.url_mapping}`} target="_blank">
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-3 gap-4 p-4 items-center text-center">
              <div className="flex justify-center">
                <div className="relative group">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name.en}
                    width={120}
                    height={120}
                    className="w-20 h-20 object-contain rounded-lg border border-border bg-background group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </div>
              <div className="text-sm font-medium text-foreground">
                <Highlighter
                  highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                  searchWords={[word]}
                  autoEscape
                  textToHighlight={item.name[localeKey]}
                />
              </div>
              <div className="text-sm space-y-1 text-foreground/80">
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
                      effectKey === "de_buff" || effectKey === "malus"
                        ? "text-red-500"
                        : "text-green-500";
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
                                <div className="text-yellow-500 dark:text-yellow-300 text-xs">
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
              <div className="flex items-center space-x-4 pb-3 border-b border-border">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name.en}
                  width={64}
                  height={64}
                  className="w-20 h-20 object-cover rounded-lg border border-border bg-background"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-base text-foreground">
                    <Highlighter
                      highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                      searchWords={[word]}
                      autoEscape
                      textToHighlight={item.name[localeKey]}
                    />
                  </h3>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="font-semibold text-xs uppercase tracking-wide mb-3 text-muted-foreground">
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
                          ? "text-red-500"
                          : "text-green-500";
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
                                  <div className="text-yellow-500 dark:text-yellow-300 text-xs">
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
