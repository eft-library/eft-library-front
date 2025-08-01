import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { Card } from "@/components/ui/card";
import {
  AngryIcon,
  Heart,
  MapPin,
  Percent,
  Shield,
  Tag,
  Users,
} from "lucide-react";
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
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        <AngryIcon className="inline mr-2 h-5 w-5 text-orange-600 dark:text-orange-400" />
        {mapOfTarkovI18n.boss[localeKey]}
      </h3>

      {/* Boss Table Header */}
      <Card className="bg-white border-gray-200 shadow-sm dark:bg-[#1e2124] dark:border-gray-700 mb-4">
        <div className="p-4 hidden md:block">
          {/* Hidden on mobile */}
          <div className="grid grid-cols-7 gap-4 text-center font-semibold text-sm text-gray-700 dark:text-gray-300">
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
            key={index}
            className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow dark:bg-[#1e2124] dark:border-gray-700"
          >
            <div className="p-4">
              {/* Mobile Layout */}
              <div className="flex flex-col space-y-3 md:hidden">
                <div className="flex justify-center mb-2">
                  <Image
                    src={boss.image}
                    alt={boss.name.en}
                    width={96}
                    height={96}
                    className="rounded-xl object-cover w-16 h-16"
                    style={{ maxWidth: "none" }}
                  />
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                  {/* 이름 */}
                  <div className="flex items-center font-semibold text-gray-900 dark:text-white">
                    <Tag className="h-4 w-4 mr-2 text-orange-400" />
                    {mapOfTarkovI18n.name[localeKey]}:
                  </div>
                  <div className="text-right text-gray-700 dark:text-gray-300">
                    {boss.name[localeKey]}
                  </div>

                  {/* 진영 */}
                  <div className="flex items-center font-semibold text-gray-900 dark:text-white">
                    <Shield className="h-4 w-4 mr-2 text-orange-400" />
                    {mapOfTarkovI18n.affiliation[localeKey]}:
                  </div>
                  <div className="text-right text-gray-700 dark:text-gray-300">
                    {boss.faction}
                  </div>

                  {/* 위치 */}
                  <div className="flex items-center font-semibold text-gray-900 dark:text-white">
                    <MapPin className="h-4 w-4 mr-2 text-orange-400" />
                    {mapOfTarkovI18n.location[localeKey]}:
                  </div>
                  <div className="text-right text-gray-700 dark:text-gray-300">
                    <div className="flex flex-col items-end">
                      {boss.spawn_chance &&
                        groupSpawnAreas(boss.spawn_chance).map((spawn, idx) => (
                          <div key={`${spawn.name_en}-${idx}-area-m`}>
                            {spawn[getOtherLocalizedKey(localeKey)]}
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* 스폰율 */}
                  <div className="flex items-center font-semibold text-gray-900 dark:text-white">
                    <Percent className="h-4 w-4 mr-2 text-orange-400" />
                    {mapOfTarkovI18n.spawnRate[localeKey]}:
                  </div>
                  <div className="text-right text-gray-700 dark:text-gray-300">
                    <div className="flex flex-col items-end">
                      {boss.spawn_chance &&
                        groupAndSummarizeChances(
                          boss.spawn_chance,
                          localeKey
                        ).map((spawn, idx) => (
                          <div key={`${spawn.name_en}-${idx}-m`}>
                            {spawn.min === spawn.max
                              ? `${Math.round(spawn.min * 100)} %`
                              : `${Math.round(spawn.min * 100)} ~ ${Math.round(
                                  spawn.max * 100
                                )} %`}
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* 체력 */}
                  <div className="flex items-center font-semibold text-gray-900 dark:text-white">
                    <Heart className="h-4 w-4 mr-2 text-orange-400" />
                    {mapOfTarkovI18n.hp[localeKey]}:
                  </div>
                  <div className="text-right text-gray-700 dark:text-gray-300">
                    {boss.health_total}
                  </div>

                  {/* 부하 */}
                  <div className="flex items-center font-semibold text-gray-900 dark:text-white">
                    <Users className="h-4 w-4 mr-2 text-orange-400" />
                    {mapOfTarkovI18n.followers[localeKey]}:
                  </div>
                  <div className="text-right text-gray-700 dark:text-gray-300">
                    {boss.children &&
                    boss.children.some((child) => !child.is_boss) ? (
                      boss.children.map(
                        (childData, idx) =>
                          !childData.is_boss && (
                            <span key={`${idx}-follower-${childData.id}-m`}>
                              {childData.name[localeKey]}
                            </span>
                          )
                      )
                    ) : (
                      <div className="font-semibold text-gray-700 dark:text-white">
                        -
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-7 gap-4 items-center text-center text-sm">
                <div className="flex justify-center">
                  <Image
                    src={boss.image}
                    alt={boss.name.en}
                    width={96}
                    height={96}
                    className="rounded-xl object-cover w-16 h-16 sm:w-24 sm:h-24"
                    style={{ maxWidth: "none" }}
                  />
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {boss.name[localeKey]}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  {boss.faction}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <div className="space-y-1">
                    {boss.spawn_chance &&
                      groupSpawnAreas(boss.spawn_chance).map((spawn, idx) => (
                        <div key={`${spawn.name_en}-${idx}-area`}>
                          {spawn[getOtherLocalizedKey(localeKey)]}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <div className="space-y-1">
                    {boss.spawn_chance &&
                      groupAndSummarizeChances(
                        boss.spawn_chance,
                        localeKey
                      ).map((spawn, idx) => (
                        <div key={`${spawn.name_en}-${idx}`}>
                          {spawn.min === spawn.max
                            ? `${Math.round(spawn.min * 100)} %`
                            : `${Math.round(spawn.min * 100)} ~ ${Math.round(
                                spawn.max * 100
                              )} %`}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  {boss.health_total}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  {boss.children &&
                  boss.children.some((child) => !child.is_boss) ? (
                    boss.children.map(
                      (childData, idx) =>
                        !childData.is_boss && (
                          <span key={`${idx}-follower-${childData.id}`}>
                            {childData.name[localeKey]}
                          </span>
                        )
                    )
                  ) : (
                    <div className="font-semibold text-gray-700 dark:text-white">
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
