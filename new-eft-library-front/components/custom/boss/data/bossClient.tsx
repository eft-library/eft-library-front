"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { formatImage } from "@/lib/func/formatImage";
import { useParams } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import HtmlWithImage from "@/components/htmlWithImage/htmlWithImage";
import BossHealth from "./bossHealth";
import FollowerLoot from "./followerLoot";

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

  const checkViewBoss = (bossId: string) => {
    return param.id === bossId;
  };

  return (
    <div className="w-full">
      {bossList.map(
        (boss) =>
          checkViewBoss(boss.id) && (
            <div key={boss.id} className="flex flex-col gap-6">
              <div className="w-full grid grid-cols-7 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3">
                <div className="flex justify-center items-center">
                  <Gallery>
                    <Item
                      original={formatImage(boss.image)}
                      width="200"
                      height="180"
                    >
                      {({ ref, open }) => (
                        <div
                          ref={ref}
                          onClick={open}
                          className="relative w-[140px] h-[140px] cursor-pointer" // 부모 요소 크기 지정
                        >
                          <Image
                            src={formatImage(boss.image)}
                            alt={boss.name_en}
                            fill
                            sizes="120px"
                            style={{ objectFit: "contain" }} // 이미지 비율 유지
                            priority
                          />
                        </div>
                      )}
                    </Item>
                  </Gallery>
                </div>
                <div className="flex justify-center items-center">
                  <span className="text-center font-bold text-base">
                    {boss.name_kr}
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  <span className="text-center font-bold text-base">
                    {boss.faction}
                  </span>
                </div>
                <div className="flex justify-center items-center flex-col">
                  {boss.location_spawn_chance_kr.map((location, index) => (
                    <React.Fragment key={`${location.location}-${index}`}>
                      <span className="text-center font-bold text-base">
                        {location.location}
                      </span>
                      {boss.location_spawn_chance_kr.length !== index + 1 && (
                        <Separator className="my-2 bg-white w-[60%]" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex justify-center items-center flex-col">
                  {boss.location_spawn_chance_kr.map((spawn, index) => (
                    <React.Fragment key={`${spawn.chance}-${index}`}>
                      <span className="text-center font-bold text-base">
                        {spawn.chance} %
                      </span>
                      {boss.location_spawn_chance_kr.length !== index + 1 && (
                        <Separator className="my-2 bg-white w-[60%]" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex justify-center items-center">
                  <span className="text-center font-bold text-base">
                    {boss.health_total}
                  </span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  {boss.followers_kr.map((follower, index) => (
                    <span key={index} className="font-bold text-base">
                      {follower}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col gap-4">
                <span className="font-bold text-3xl">위치</span>
                <Separator className="bg-white" />
                <HtmlWithImage contents={boss.location_guide} />
              </div>
              <div className="w-full flex flex-col gap-4">
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
