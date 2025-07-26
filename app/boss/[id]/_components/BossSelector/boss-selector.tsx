"use client";

import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { boss18N, placeHolderText } from "@/lib/consts/i18nConsts";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import {
  groupSpawnAreas,
  groupAndSummarizeChances,
} from "@/lib/func/jsxfunction";
import type { BossDetail } from "../boss.types";

export default function BossSelector({ bossData }: BossDetail) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const router = useRouter();
  const param = useParams<{ id: string }>();

  const handleBossClick = (bossUrl: string) => {
    router.push(`/boss/${bossUrl}`);
  };

  const selectedBoss = bossData.boss_selector.find(
    (boss) => boss.url_mapping === param.id
  );

  return (
    <div className="space-y-6">
      {/* Boss Selection Dropdown */}
      <div className="container mx-auto px-4 py-4">
        {/* Added container and padding */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-sm font-semibold whitespace-nowrap text-muted-foreground">
              {boss18N.title[localeKey]}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto min-w-[140px] justify-between bg-background border border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {selectedBoss?.name[localeKey] || ""}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-[200px] bg-popover border border-border text-popover-foreground">
                {bossData.boss_selector.map((boss) => (
                  <DropdownMenuItem
                    key={boss.url_mapping}
                    onClick={() => handleBossClick(boss.url_mapping)}
                    className={`
                      ${
                        param.id === boss.url_mapping
                          ? "text-primary bg-primary/10 cursor-pointer"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{boss.name[localeKey]}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
                  <th className="text-center p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {boss18N.photo[localeKey]}
                  </th>
                  <th className="text-center p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {boss18N.name[localeKey]}
                  </th>
                  <th className="text-center p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {boss18N.affiliation[localeKey]}
                  </th>
                  <th className="text-center p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {boss18N.location[localeKey]}
                  </th>
                  <th className="text-center p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {boss18N.spawnRate[localeKey]}
                  </th>
                  <th className="text-center p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {boss18N.health[localeKey]}
                  </th>
                  <th className="text-center p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {boss18N.followers[localeKey]}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/20 transition-colors">
                  <td className="text-center p-3 sm:p-4 relative">
                    <Image
                      src={bossData.boss.image || "/placeholder.svg"}
                      alt={bossData.boss.name.en}
                      className="w-16 h-16 sm:w-24 sm:h-24 rounded object-cover mx-auto"
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
                  <td className="text-center p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    {bossData.boss.name[localeKey]}
                  </td>
                  <td className="text-center p-3 sm:p-4 text-sm sm:text-base">
                    {bossData.boss.faction}
                  </td>
                  <td className="text-center p-3 sm:p-4 text-sm sm:text-base">
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
                  <td className="text-center p-3 sm:p-4 text-sm sm:text-base">
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
                  <td className="text-center p-3 sm:p-4 font-bold text-sm sm:text-base text-primary">
                    {bossData.boss.health_total}
                  </td>
                  <td className="text-center p-3 sm:p-4 text-sm sm:text-base">
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
