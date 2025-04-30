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

  const filterData = bossList.find((boss) => boss.url_mapping === param.id);

  if (!filterData) return null;

  return (
    <div className="w-full">
      <div
        key={filterData.parent_id}
        className="flex flex-col gap-6 items-center"
      >
        <div className="w-full grid grid-cols-7 gap-2 border-solid border-white border-2 rounded-lg p-3">
          <CenterContents>
            <ImageView
              src={filterData.image}
              alt={filterData.name.en}
              popWidth={120}
              popHeight={120}
              wrapWidth={120}
              wrapHeight={120}
              size="120px"
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{filterData.name[localeKey]}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{filterData.faction}</TextSpan>
          </CenterContents>
          <CenterContents isCol>
            {filterData.spawn_chance &&
              groupSpawnAreas(filterData.spawn_chance).map((spawn, index) => (
                <React.Fragment key={`${spawn.name_en}-${index}-area`}>
                  <TextSpan>{spawn[getOtherLocalizedKey(localeKey)]}</TextSpan>
                  {groupSpawnAreas(filterData.spawn_chance).length !==
                    index + 1 && (
                    <Separator className="my-[3px] bg-white w-[60%]" />
                  )}
                </React.Fragment>
              ))}
          </CenterContents>
          <CenterContents isCol>
            {filterData.spawn_chance &&
              groupAndSummarizeChances(filterData.spawn_chance).map(
                (spawn, index) => (
                  <React.Fragment key={`${spawn.name_en}-${index}`}>
                    <TextSpan>
                      {spawn.min === spawn.max
                        ? `${Math.round(spawn.min * 100)} %`
                        : `${Math.round(spawn.min * 100)} ~ ${Math.round(
                            spawn.max * 100
                          )} %`}
                    </TextSpan>
                    {groupAndSummarizeChances(filterData.spawn_chance)
                      .length !==
                      index + 1 && (
                      <Separator className="my-[3px] bg-white w-[60%]" />
                    )}
                  </React.Fragment>
                )
              )}
          </CenterContents>
          <CenterContents>
            <TextSpan>{filterData.health_total}</TextSpan>
          </CenterContents>
          <CenterContents isCol>
            {filterData.children &&
            filterData.children.some((child) => !child.is_boss) ? (
              filterData.children.map(
                (childData, index) =>
                  !childData.is_boss && (
                    <TextSpan key={`${index}-follower-${childData.id}`}>
                      {childData.name[localeKey]}
                    </TextSpan>
                  )
              )
            ) : (
              <TextSpan>-</TextSpan>
            )}
          </CenterContents>
        </div>
        <div className="w-[1200px]">
          <AdBanner
            dataAdFormat={"auto"}
            dataFullWidthResponsive={true}
            dataAdSlot="2690838054"
          />
        </div>
        {filterData.location_guide && (
          <div className="w-full flex flex-col gap-2">
            <span className="font-bold text-3xl">위치</span>
            <Separator className="bg-white" />
            <HtmlWithImage contents={filterData.location_guide[localeKey]} />
          </div>
        )}
        <BossHealth subFollowers={filterData.children} />
        <FollowerLoot follower={filterData} />
      </div>
    </div>
  );
}
