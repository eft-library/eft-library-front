"use client";
import { useParams } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import HtmlWithImage from "@/components/custom/htmlWithImage/htmlWithImage";
import BossHealth from "./bossHealth";
import FollowerLoot from "./followerLoot";
import AdBanner from "../../../custom/adsense/adBanner";
import ImageView from "../../../custom/imageView/imageView";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { checkIdCategory } from "@/lib/func/jsxfunction";
import type { BossClient, SpawnChance } from "./bossTypes";
import { useLocale } from "next-intl";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";

export default function BossClient({ bossList }: BossClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const param = useParams<{ id: string }>();

  const groupAndSummarizeChances = (spawnChances: SpawnChance[]) => {
    const grouped = new Map<string, number[]>();

    // 1. 이름별로 그룹화
    for (const spawn of spawnChances) {
      const list = grouped.get(spawn[getOtherLocalizedKey(localeKey)]) ?? [];
      list.push(spawn.spawnChance);
      grouped.set(spawn[getOtherLocalizedKey(localeKey)], list);
    }

    // 2. 그룹 결과를 [{ name_en, min, max }] 형태로 변환
    const summarized = Array.from(grouped.entries()).map(
      ([name_en, chances]) => {
        const min = Math.min(...chances);
        const max = Math.max(...chances);
        return { name_en, min, max };
      }
    );

    return summarized;
  };

  const groupSpawnAreas = (spawnChances: SpawnChance[]) => {
    const seen = new Set<string>();
    const uniqueList: typeof spawnChances = [];

    for (const item of spawnChances) {
      if (!seen.has(item.name_en)) {
        seen.add(item.name_en);
        uniqueList.push(item);
      }
    }

    return uniqueList;
  };

  return (
    <div className="w-full">
      {bossList.map(
        (boss) =>
          checkIdCategory(param.id, boss.boss_url_mappings) &&
          boss.children.map(
            (bossData) =>
              bossData.is_boss && (
                <div
                  key={boss.parent_id}
                  className="flex flex-col gap-6 items-center"
                >
                  <div className="w-full grid grid-cols-7 gap-2 border-solid border-white border-2 rounded-lg p-3">
                    <CenterContents>
                      <ImageView
                        src={bossData.image}
                        alt={bossData.name.en}
                        popWidth={120}
                        popHeight={120}
                        wrapWidth={120}
                        wrapHeight={120}
                        size="120px"
                      />
                    </CenterContents>
                    <CenterContents>
                      <TextSpan>{bossData.name[localeKey]}</TextSpan>
                    </CenterContents>
                    <CenterContents>
                      <TextSpan>{bossData.faction}</TextSpan>
                    </CenterContents>
                    <CenterContents isCol>
                      {groupSpawnAreas(bossData.spawn_chance).map(
                        (spawn, index) => (
                          <React.Fragment
                            key={`${spawn.name_en}-${index}-area`}
                          >
                            <TextSpan>
                              {spawn[getOtherLocalizedKey(localeKey)]}
                            </TextSpan>
                            {groupSpawnAreas(bossData.spawn_chance).length !==
                              index + 1 && (
                              <Separator className="my-[3px] bg-white w-[60%]" />
                            )}
                          </React.Fragment>
                        )
                      )}
                    </CenterContents>
                    <CenterContents isCol>
                      {groupAndSummarizeChances(bossData.spawn_chance).map(
                        (spawn, index) => (
                          <React.Fragment key={`${spawn.name_en}-${index}`}>
                            <TextSpan>
                              {spawn.min === spawn.max
                                ? `${Math.round(spawn.min * 100)} %`
                                : `${Math.round(
                                    spawn.min * 100
                                  )} ~ ${Math.round(spawn.max * 100)} %`}
                            </TextSpan>
                            {groupAndSummarizeChances(bossData.spawn_chance)
                              .length !==
                              index + 1 && (
                              <Separator className="my-[3px] bg-white w-[60%]" />
                            )}
                          </React.Fragment>
                        )
                      )}
                    </CenterContents>
                    <CenterContents>
                      <TextSpan>{bossData.health_total}</TextSpan>
                    </CenterContents>
                    {/* <CenterContents>
                {bossData.followers_kr.map((follower, index) => (
                  <TextSpan key={`${index}-follower-${boss.id}`}>
                    {follower}
                  </TextSpan>
                ))}
              </CenterContents> */}
                  </div>

                  <div className="w-[1200px]">
                    <AdBanner
                      dataAdFormat={"auto"}
                      dataFullWidthResponsive={true}
                      dataAdSlot="2690838054"
                    />
                  </div>
                  {/* <div className="w-full flex flex-col gap-2">
              <span className="font-bold text-3xl">위치</span>
              <Separator className="bg-white" />
              <HtmlWithImage contents={boss.location_guide} />
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="font-bold text-3xl">피통</span>
              <Separator className="bg-white" />
              <BossHealth subFollowers={boss.sub_followers} />
            </div>
            {boss.sub_followers.map((follower) => (
              <FollowerLoot key={follower.id} follower={follower} />
            ))} */}
                </div>
              )
          )
      )}
    </div>
  );
}
