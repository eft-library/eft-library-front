"use cleint";

import type { StimEffect, StimulantTypes } from "../medical.types";
import Image from "next/image";
import { useLocale } from "next-intl";
import { getEffectLocalizedKey, getLocaleKey } from "@/lib/func/localeFunction";
import { effectI18N, itemI18N } from "@/lib/consts/i18nConsts";
import { useTheme } from "next-themes";
import {
  noReturnSkill,
  getPlusMinus,
  checkSkillPlus,
  checkValuePlus,
} from "@/lib/func/jsxfunction";
import Link from "next/link";

export default function Stimulant({ medicalList, searchWord }: StimulantTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { theme } = useTheme();

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
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded border border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {item.name[localeKey]}
              </div>
              <div className="text-sm space-y-1">
                {(() => {
                  const groupedEffects = item.info.stim_effects.reduce<
                    Record<string, StimEffect[]>
                  >((acc, effect) => {
                    const key = `${effect.delay}-${effect.duration}`;
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(effect);
                    return acc;
                  }, {} as Record<string, typeof item.info.stim_effects>);

                  const entries = Object.entries(groupedEffects);

                  return entries.length > 0 ? (
                    entries.map(([key, effects]) => {
                      const [delay, duration] = key.split("-");

                      return (
                        <div key={`group-${key}`}>
                          <span className="font-bold text-base text-yellow-400 dark:text-yellow-200 mt-[4px] block">
                            {delay}&nbsp;{effectI18N.delay[localeKey]} /{" "}
                            {duration}
                            &nbsp;{effectI18N.duration[localeKey]}
                          </span>
                          {effects.map((effect, index) => (
                            <div
                              key={`effect-${effect.type}-${item.id}-${index}`}
                              className={`text-sm ${
                                effect.skill_name_en
                                  ? checkSkillPlus(effect.skill_name_en)
                                  : theme === "dark"
                                  ? "text-gray-100"
                                  : "text-gray-900"
                              }`}
                            >
                              <span className="text-gray-900 dark:text-gray-100">
                                -
                              </span>
                              &nbsp;
                              <span className=" text-gray-900 dark:text-gray-100">
                                {effect[getEffectLocalizedKey(localeKey)]}
                              </span>
                              {effect.skill_name_en &&
                                !noReturnSkill.includes(
                                  effect.skill_name_en
                                ) && (
                                  <span
                                    className={checkValuePlus(effect.value)}
                                  >
                                    {getPlusMinus(effect.value)}
                                  </span>
                                )}
                            </div>
                          ))}
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-gray-400">-</span>
                  );
                })()}
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
                  {(() => {
                    const groupedEffects = item.info.stim_effects.reduce<
                      Record<string, StimEffect[]>
                    >((acc, effect) => {
                      const key = `${effect.delay}-${effect.duration}`;
                      if (!acc[key]) acc[key] = [];
                      acc[key].push(effect);
                      return acc;
                    }, {} as Record<string, typeof item.info.stim_effects>);

                    const entries = Object.entries(groupedEffects);

                    return entries.length > 0 ? (
                      entries.map(([key, effects]) => {
                        const [delay, duration] = key.split("-");

                        return (
                          <div key={`group-${key}`}>
                            <span className="font-bold text-base text-yellow-400 dark:text-yellow-200 mt-[4px] block">
                              {delay}&nbsp;{effectI18N.delay[localeKey]} /{" "}
                              {duration}
                              &nbsp;{effectI18N.duration[localeKey]}
                            </span>
                            {effects.map((effect, index) => (
                              <div
                                key={`effect-${effect.type}-${item.id}-${index}`}
                                className={`text-sm ${
                                  effect.skill_name_en
                                    ? checkSkillPlus(effect.skill_name_en)
                                    : theme === "dark"
                                    ? "text-gray-100"
                                    : "text-gray-900"
                                }`}
                              >
                                <span className="text-gray-900 dark:text-gray-100">
                                  -
                                </span>
                                &nbsp;
                                <span className=" text-gray-900 dark:text-gray-100">
                                  {effect[getEffectLocalizedKey(localeKey)]}
                                </span>
                                {effect.skill_name_en &&
                                  !noReturnSkill.includes(
                                    effect.skill_name_en
                                  ) && (
                                    <span
                                      className={checkValuePlus(effect.value)}
                                    >
                                      {getPlusMinus(effect.value)}
                                    </span>
                                  )}
                              </div>
                            ))}
                          </div>
                        );
                      })
                    ) : (
                      <span className="text-gray-400">-</span>
                    );
                  })()}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
