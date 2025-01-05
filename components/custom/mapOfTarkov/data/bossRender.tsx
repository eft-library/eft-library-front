"use client";

import { Separator } from "@/components/ui/separator";
import { formatImage } from "@/lib/func/formatImage";
import React from "react";
import ImageView from "../../imageView/imageView";

interface Boss extends BossInfo {
  health_total: number;
  spawn: string[];
  faction: string;
  location_spawn_chance_en: SpawnChance[];
  location_spawn_chance_kr: SpawnChance[];
  followers_en: string[];
  followers_kr: string[];
  name_kr: string;
  name_en: string;
  image: string;
  order: number;
}
interface SpawnChance {
  order: number;
  chance: number;
  location: string;
}
interface BossInfo {
  id: string;
  location_guide: string;
  sub: BossLoot[];
  sub_followers: Followers[];
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
  bossInfo: Boss;
}

export default function BossRender({ bossInfo }: BoosClient) {
  return (
    <div className="w-full grid grid-cols-7 gap-2 border-solid border-white border-2 rounded-lg p-3">
      <ImageView
        src={formatImage(bossInfo.image)}
        alt={bossInfo.name_en}
        popWidth={180}
        popHeight={180}
        size="120px"
        wrapWidth={120}
        wrapHeight={120}
      />

      <div className="flex justify-center items-center">
        <span className="text-center font-bold text-base">
          {bossInfo.name_kr}
        </span>
      </div>
      <div className="flex justify-center items-center">
        <span className="text-center font-bold text-base">
          {bossInfo.faction}
        </span>
      </div>
      <div className="flex justify-center items-center flex-col">
        {bossInfo.location_spawn_chance_kr.map((location, index) => (
          <React.Fragment key={`${location.location}-${index}`}>
            <span className="text-center font-bold text-base">
              {location.location}
            </span>
            {bossInfo.location_spawn_chance_kr.length !== index + 1 && (
              <Separator className="my-[3px] bg-white w-[60%]" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center items-center flex-col">
        {bossInfo.location_spawn_chance_kr.map((spawn, index) => (
          <React.Fragment key={`${spawn.chance}-${index}`}>
            <span className="text-center font-bold text-base">
              {spawn.chance} %
            </span>
            {bossInfo.location_spawn_chance_kr.length !== index + 1 && (
              <Separator className="my-[3px] bg-white w-[60%]" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <span className="text-center font-bold text-base">
          {bossInfo.health_total}
        </span>
      </div>
      <div className="flex flex-col justify-center items-center">
        {bossInfo.followers_kr.map((follower, index) => (
          <span key={index} className="font-bold text-base">
            {follower}
          </span>
        ))}
      </div>
    </div>
  );
}
