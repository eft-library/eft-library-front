"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { BossClient } from "./mapOfTarkovType";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import {
  groupSpawnAreas,
  groupAndSummarizeChances,
} from "@/lib/func/jsxfunction";

export default function BossRender({ bossData }: BossClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <DefineGrid cols="7" id={bossData.id}>
      <CenterContents>
        <ImageView
          src={bossData.image}
          alt={bossData.name.en}
          popWidth={180}
          popHeight={180}
          size="120px"
          wrapWidth={120}
          wrapHeight={120}
        />
      </CenterContents>
      <CenterContents>
        <TextSpan>{bossData.name[localeKey]}</TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>{bossData.faction}</TextSpan>
      </CenterContents>
      <CenterContents isCol>
        {bossData.spawn_chance &&
          groupSpawnAreas(bossData.spawn_chance).map((spawn, index) => (
            <React.Fragment key={`${spawn.name_en}-${index}-area`}>
              <TextSpan>{spawn[getOtherLocalizedKey(localeKey)]}</TextSpan>
              {groupSpawnAreas(bossData.spawn_chance).length !== index + 1 && (
                <Separator className="my-[3px] bg-white w-[60%]" />
              )}
            </React.Fragment>
          ))}
      </CenterContents>
      <CenterContents isCol>
        {bossData.spawn_chance &&
          groupAndSummarizeChances(bossData.spawn_chance, localeKey).map(
            (spawn, index) => (
              <React.Fragment key={`${spawn.name_en}-${index}`}>
                <TextSpan>
                  {spawn.min === spawn.max
                    ? `${Math.round(spawn.min * 100)} %`
                    : `${Math.round(spawn.min * 100)} ~ ${Math.round(
                        spawn.max * 100
                      )} %`}
                </TextSpan>
                {groupAndSummarizeChances(bossData.spawn_chance, localeKey)
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
      <CenterContents isCol>
        {bossData.children &&
        bossData.children.some((child) => !child.is_boss) ? (
          bossData.children.map(
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
    </DefineGrid>
  );
}
