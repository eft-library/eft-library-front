"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BossDetail } from "../boss.types";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { boss18N } from "@/lib/consts/i18nConsts";
import { useLocale } from "next-intl";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import {
  groupSpawnAreas,
  groupAndSummarizeChances,
} from "@/lib/func/jsxfunction";
import React from "react";
import { Separator } from "@/components/ui/separator";

export default function BossSelector({ bossData }: BossDetail) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const router = useRouter();
  const param = useParams<{ id: string }>();

  const handleBossClick = (bossUrl: string) => {
    router.push(`/boss/${bossUrl}`);
  };

  return (
    <div className="space-y-6">
      {/* Boss Selection Dropdown - Remove Card wrapper */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-lg font-medium">보스:</span>
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={param.id}
              onChange={(e) => handleBossClick(e.target.value)}
              className="appearance-none bg-background border-2 border-input rounded-lg px-4 py-3 pr-10 w-full sm:min-w-[200px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
              {bossData.boss_selector.map((boss) => (
                <option key={boss.url_mapping} value={boss.url_mapping}>
                  {boss.name[localeKey]}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Boss Details Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 bg-muted/30">
                  <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {boss18N.photo[localeKey]}
                  </th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {boss18N.name[localeKey]}
                  </th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {boss18N.affiliation[localeKey]}
                  </th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {boss18N.location[localeKey]}
                  </th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {boss18N.spawnRate[localeKey]}
                  </th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {boss18N.health[localeKey]}
                  </th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {boss18N.followers[localeKey]}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/20 transition-colors">
                  <td className="p-3 sm:p-4 relative">
                    <Image
                      src={bossData.boss.image}
                      alt={bossData.boss.name.en}
                      className="w-16 h-16 sm:w-24 sm:h-24 rounded object-cover"
                      placeholder="blur"
                      blurDataURL={
                        "data:image/jpeg;base64," +
                        "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                      }
                      sizes="(max-width: 768px) 100vw, 25vw"
                      width={56}
                      height={56}
                    />
                  </td>
                  <td className="p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {bossData.boss.name[localeKey]}
                  </td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base">
                    {bossData.boss.faction}
                  </td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base">
                    {bossData.boss.spawn_chance &&
                      groupSpawnAreas(bossData.boss.spawn_chance).map(
                        (spawn, index) => (
                          <React.Fragment
                            key={`${spawn.name_en}-${index}-area`}
                          >
                            <span>
                              {spawn[getOtherLocalizedKey(localeKey)]}
                            </span>
                            {groupSpawnAreas(bossData.boss.spawn_chance)
                              .length !==
                              index + 1 && (
                              <Separator className="my-[3px] bg-white w-[60%]" />
                            )}
                          </React.Fragment>
                        )
                      )}
                  </td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base">
                    {bossData.boss.spawn_chance &&
                      groupAndSummarizeChances(
                        bossData.boss.spawn_chance,
                        localeKey
                      ).map((spawn, index) => (
                        <React.Fragment key={`${spawn.name_en}-${index}`}>
                          <span>
                            {spawn.min === spawn.max
                              ? `${Math.round(spawn.min * 100)} %`
                              : `${Math.round(spawn.min * 100)} ~ ${Math.round(
                                  spawn.max * 100
                                )} %`}
                          </span>
                          {groupAndSummarizeChances(
                            bossData.boss.spawn_chance,
                            localeKey
                          ).length !==
                            index + 1 && (
                            <Separator className="my-[3px] bg-white w-[60%]" />
                          )}
                        </React.Fragment>
                      ))}
                  </td>
                  <td className="p-3 sm:p-4 font-bold text-sm sm:text-base text-primary">
                    {bossData.boss.health_total}
                  </td>
                  <td className="p-3 sm:p-4 text-sm sm:text-base">
                    {bossData.boss.children &&
                    bossData.boss.children.some((child) => !child.is_boss) ? (
                      bossData.boss.children.map(
                        (childData, index) =>
                          !childData.is_boss && (
                            <span key={`${index}-follower-${childData.id}`}>
                              {childData.name[localeKey]}
                            </span>
                          )
                      )
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
