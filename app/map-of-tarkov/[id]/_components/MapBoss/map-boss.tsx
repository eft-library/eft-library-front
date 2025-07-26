import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { Card } from "@/components/ui/card";
import { AngryIcon } from "lucide-react";
import { mapOfTarkovI18n } from "@/lib/consts/i18nConsts";
import { MapBossTypes } from "../map-of-tarkov.types";
import Image from "next/image";
import {
  groupAndSummarizeChances,
  groupSpawnAreas,
} from "@/lib/func/jsxfunction";
import React from "react";

export default function MapBoss({ bossInfo }: MapBossTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="container mx-auto px-4 mb-6">
      <h3 className={`text-xl font-bold mb-4 dark:text-white text-gray-900`}>
        <AngryIcon
          className={`inline mr-2 h-5 w-5 dark:text-orange-400 text-orange-600`}
        />
        {mapOfTarkovI18n.boss[localeKey]}
      </h3>

      {/* Boss Table Header */}
      <Card
        className={`dark:bg-gray-800/30 dark:border-gray-700/50 bg-white border-gray-200 shadow-sm mb-4`}
      >
        <div>
          <div
            className={`grid grid-cols-7 gap-2 text-center font-semibold text-sm dark:text-white text-gray-700`}
          >
            <div>{mapOfTarkovI18n.photo[localeKey]}</div>
            <div>{mapOfTarkovI18n.name[localeKey]}</div>
            <div>{mapOfTarkovI18n.affiliation[localeKey]}</div>
            <div>{mapOfTarkovI18n.location[localeKey]}</div>
            <div>{mapOfTarkovI18n.spawnRate[localeKey]}</div>
            <div>{mapOfTarkovI18n.hp[localeKey]}</div>
            <div>{mapOfTarkovI18n.followers[localeKey]}</div>
          </div>
        </div>
      </Card>

      {/* Boss Information Cards */}
      <div className="space-y-4">
        {bossInfo.map((boss, index) => (
          <Card
            key={`boss-info-${boss.id}-${index}`}
            className={`dark:bg-gray-800/30 dark:border-gray-700/50 bg-white border-gray-200 shadow-sm`}
          >
            <div className="p-4">
              <div className="grid grid-cols-7 gap-2 items-center text-center text-sm">
                <div className="flex justify-center">
                  <Image
                    src={boss.image}
                    alt={boss.name.en}
                    width={96} // 기본 크기 (데스크탑용)
                    height={96}
                    className="rounded-xl object-cover w-16 h-16 sm:w-24 sm:h-24" // sm 이상일 때 6rem (96px)
                    style={{ maxWidth: "none" }}
                  />
                </div>

                <div className={`font-semibold dark:text-white text-gray-900`}>
                  {boss.name[localeKey]}
                </div>
                <div className={`font-semibold dark:text-white text-gray-700`}>
                  {boss.faction}
                </div>
                <div className={`font-semibold dark:text-white text-gray-700`}>
                  {boss.spawn_chance &&
                    groupSpawnAreas(boss.spawn_chance).map((spawn, index) => (
                      <div key={`${spawn.name_en}-${index}-area`}>
                        {spawn[getOtherLocalizedKey(localeKey)]}
                      </div>
                    ))}
                </div>
                <div className={`font-semibold dark:text-white text-gray-700`}>
                  {boss.spawn_chance &&
                    groupAndSummarizeChances(boss.spawn_chance, localeKey).map(
                      (spawn, index) => (
                        <div key={`${spawn.name_en}-${index}`}>
                          {spawn.min === spawn.max
                            ? `${Math.round(spawn.min * 100)} %`
                            : `${Math.round(spawn.min * 100)} ~ ${Math.round(
                                spawn.max * 100
                              )} %`}
                        </div>
                      )
                    )}
                </div>
                <div className={`font-semibold dark:text-white text-gray-700`}>
                  {boss.health_total}
                </div>
                <div className={`font-semibold dark:text-white text-gray-700`}>
                  {boss.children &&
                  boss.children.some((child) => !child.is_boss) ? (
                    boss.children.map(
                      (childData, index) =>
                        !childData.is_boss && (
                          <span key={`${index}-follower-${childData.id}`}>
                            {childData.name[localeKey]}
                          </span>
                        )
                    )
                  ) : (
                    <div
                      className={`font-semibold dark:text-white text-gray-700`}
                    >
                      -
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
