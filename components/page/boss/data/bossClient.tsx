"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import HtmlWithImage from "@/components/custom/htmlWithImage/htmlWithImage";
import BossHealth from "./bossHealth";
import FollowerLoot from "./followerLoot";
import AdBanner from "../../../custom/adsense/adBanner";
import ImageView from "../../../custom/imageView/imageView";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { BossClient } from "./bossTypes";
import { useLocale } from "next-intl";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import {
  groupSpawnAreas,
  groupAndSummarizeChances,
} from "@/lib/func/jsxfunction";
import Link from "next/link";
import { cn } from "@/lib/utils";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { bossTableColumn } from "@/lib/consts/columnConsts";
import { boss18N } from "@/lib/consts/i18nConsts";

export default function BossClient({ bossData }: BossClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-wrap rounded-lg border-solid border-2 border-white p-1">
        {bossData.boss_selector.map((selector) => (
          <Link href={`/boss/${selector.url_mapping}`} key={selector.name.en}>
            <div
              className={cn(
                "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
                {
                  "bg-CloudGray":
                    bossData.boss.url_mapping === selector.url_mapping,
                },
                {
                  "text-Background":
                    bossData.boss.url_mapping === selector.url_mapping,
                }
              )}
            >
              <span className="text-center font-bold">
                {selector.name[localeKey]}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <TableColumn columnDesign={7} columnData={bossTableColumn} />

      <div key={bossData.boss.id} className="flex flex-col gap-6 items-center">
        <div className="w-full grid grid-cols-7 gap-2 border-solid border-white border-2 rounded-lg p-3">
          <CenterContents>
            <ImageView
              src={bossData.boss.image}
              alt={bossData.boss.name.en}
              popWidth={120}
              popHeight={120}
              wrapWidth={120}
              wrapHeight={120}
              size="120px"
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{bossData.boss.name[localeKey]}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{bossData.boss.faction}</TextSpan>
          </CenterContents>
          <CenterContents isCol>
            {bossData.boss.spawn_chance &&
              groupSpawnAreas(bossData.boss.spawn_chance).map(
                (spawn, index) => (
                  <React.Fragment key={`${spawn.name_en}-${index}-area`}>
                    <TextSpan>
                      {spawn[getOtherLocalizedKey(localeKey)]}
                    </TextSpan>
                    {groupSpawnAreas(bossData.boss.spawn_chance).length !==
                      index + 1 && (
                      <Separator className="my-[3px] bg-white w-[60%]" />
                    )}
                  </React.Fragment>
                )
              )}
          </CenterContents>
          <CenterContents isCol>
            {bossData.boss.spawn_chance &&
              groupAndSummarizeChances(
                bossData.boss.spawn_chance,
                localeKey
              ).map((spawn, index) => (
                <React.Fragment key={`${spawn.name_en}-${index}`}>
                  <TextSpan>
                    {spawn.min === spawn.max
                      ? `${Math.round(spawn.min * 100)} %`
                      : `${Math.round(spawn.min * 100)} ~ ${Math.round(
                          spawn.max * 100
                        )} %`}
                  </TextSpan>
                  {groupAndSummarizeChances(
                    bossData.boss.spawn_chance,
                    localeKey
                  ).length !==
                    index + 1 && (
                    <Separator className="my-[3px] bg-white w-[60%]" />
                  )}
                </React.Fragment>
              ))}
          </CenterContents>
          <CenterContents>
            <TextSpan>{bossData.boss.health_total}</TextSpan>
          </CenterContents>
          <CenterContents isCol>
            {bossData.boss.children &&
            bossData.boss.children.some((child) => !child.is_boss) ? (
              bossData.boss.children.map(
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
        {bossData.boss.location_guide && (
          <div className="w-full flex flex-col gap-2">
            <span className="font-bold text-3xl">
              {boss18N.location[localeKey]}
            </span>
            <Separator className="bg-white" />
            <HtmlWithImage contents={bossData.boss.location_guide[localeKey]} />
          </div>
        )}
        <BossHealth subFollowers={bossData.boss.children} />
        <FollowerLoot follower={bossData.boss} />
      </div>
    </div>
  );
}
