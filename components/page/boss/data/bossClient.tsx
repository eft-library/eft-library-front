"use client";

import { formatImage } from "@/lib/func/formatImage";
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

interface Boss {
  health_total: number;
  spawn: string[];
  faction: string;
  location_spawn_chance_en: SpawnChance[];
  location_spawn_chance_kr: SpawnChance[];
  followers_en: string[];
  followers_kr: string[];
  id: string;
  location_guide: string;
  sub: BossLoot[];
  sub_followers: Followers[];
  name_kr: string;
  name_en: string;
  image: string;
}

interface SpawnChance {
  order: number;
  chance: number;
  location: string;
}

interface BossLoot {
  boss_name_en: string;
  boss_name_kr: string;
  item_id: string;
  boss_id: string;
  item_type: string;
  item_type_en: string;
  item_type_kr: string;
  item_name_en: string;
  item_name_kr: string;
  item_image: string;
  link: string;
}

interface Followers {
  id: string;
  name_kr: string;
  name_en: string;
  boss_id: string;
  health_image: string;
  loot: FollowersLoot[];
}

interface FollowersLoot {
  follower_name_en: string;
  follower_name_kr: string;
  follower_id: string;
  item_id: string;
  boss_id: string;
  item_type: string;
  item_type_en: string;
  item_type_kr: string;
  item_name_en: string;
  item_name_kr: string;
  item_image: string;
  link: string;
}

interface BoosClient {
  bossList: Boss[];
}

export default function BossClient({ bossList }: BoosClient) {
  const param = useParams<{ id: string }>();

  return (
    <div className="w-full">
      {bossList.map(
        (boss) =>
          checkIdCategory(param.id, boss.id) && (
            <div key={boss.id} className="flex flex-col gap-6">
              <div className="w-full grid grid-cols-7 gap-2 border-solid border-white border-2 rounded-lg p-3">
                <CenterContents>
                  <ImageView
                    src={formatImage(boss.image)}
                    alt={boss.name_en}
                    popWidth={120}
                    popHeight={120}
                    wrapWidth={120}
                    wrapHeight={120}
                    size="120px"
                  />
                </CenterContents>
                <CenterContents>
                  <TextSpan>{boss.name_kr}</TextSpan>
                </CenterContents>
                <CenterContents>
                  <TextSpan>{boss.faction}</TextSpan>
                </CenterContents>
                <CenterContents isCol>
                  {boss.location_spawn_chance_kr.map((location, index) => (
                    <React.Fragment key={`${location.location}-${index}`}>
                      <TextSpan>{location.location}</TextSpan>
                      {boss.location_spawn_chance_kr.length !== index + 1 && (
                        <Separator className="my-[3px] bg-white w-[60%]" />
                      )}
                    </React.Fragment>
                  ))}
                </CenterContents>
                <CenterContents isCol>
                  {boss.location_spawn_chance_kr.map((spawn, index) => (
                    <React.Fragment key={`${spawn.chance}-${index}`}>
                      <TextSpan>{spawn.chance} %</TextSpan>
                      {boss.location_spawn_chance_kr.length !== index + 1 && (
                        <Separator className="my-[3px] bg-white w-[60%]" />
                      )}
                    </React.Fragment>
                  ))}
                </CenterContents>
                <CenterContents>
                  <TextSpan>{boss.health_total}</TextSpan>
                </CenterContents>
                <CenterContents>
                  {boss.followers_kr.map((follower, index) => (
                    <TextSpan key={`${index}-follower-${boss.id}`}>
                      {follower}
                    </TextSpan>
                  ))}
                </CenterContents>
              </div>
              <AdBanner
                dataAdFormat={"auto"}
                dataFullWidthResponsive={true}
                dataAdSlot="2690838054"
              />
              <div className="w-full flex flex-col gap-2">
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
              ))}
            </div>
          )
      )}
    </div>
  );
}
