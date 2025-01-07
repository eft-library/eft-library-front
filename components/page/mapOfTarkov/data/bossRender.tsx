"use client";

import { Separator } from "@/components/ui/separator";
import { formatImage } from "@/lib/func/formatImage";
import React from "react";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { BossClient } from "./mapOfTarkovType";

export default function BossRender({ bossInfo }: BossClient) {
  return (
    <DefineGrid cols="7" id={bossInfo.id} pageId="bossInfo">
      <CenterContents>
        <ImageView
          src={formatImage(bossInfo.image)}
          alt={bossInfo.name_en}
          popWidth={180}
          popHeight={180}
          size="120px"
          wrapWidth={120}
          wrapHeight={120}
        />
      </CenterContents>
      <CenterContents>
        <TextSpan>{bossInfo.name_kr}</TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>{bossInfo.faction}</TextSpan>
      </CenterContents>
      <CenterContents isCol>
        {bossInfo.location_spawn_chance_kr.map((location, index) => (
          <React.Fragment key={`${location.location}-${index}`}>
            <TextSpan>{location.location}</TextSpan>
            {bossInfo.location_spawn_chance_kr.length !== index + 1 && (
              <Separator className="my-[3px] bg-white w-[60%]" />
            )}
          </React.Fragment>
        ))}
      </CenterContents>
      <CenterContents isCol>
        {bossInfo.location_spawn_chance_kr.map((spawn, index) => (
          <React.Fragment key={`${spawn.chance}-${index}`}>
            <TextSpan>{spawn.chance} %</TextSpan>
            {bossInfo.location_spawn_chance_kr.length !== index + 1 && (
              <Separator className="my-[3px] bg-white w-[60%]" />
            )}
          </React.Fragment>
        ))}
      </CenterContents>
      <CenterContents>
        <TextSpan>{bossInfo.health_total}</TextSpan>
      </CenterContents>
      <CenterContents isCol>
        {bossInfo.followers_kr.map((follower, index) => (
          <TextSpan isCenter={false} key={`${index}-follower-${bossInfo.id}`}>
            {follower}
          </TextSpan>
        ))}
      </CenterContents>
    </DefineGrid>
  );
}
