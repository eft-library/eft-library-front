"use client";

import "photoswipe/dist/photoswipe.css";
import Bonus from "@/components/custom/hideout/data/bonus";
import { useAppStore } from "@/store/provider";
import Require from "@/components/custom/hideout/data/require";
import TextSpan from "../../gridContents/textSpan";
import DefineGrid from "../../gridContents/defineGrid";
import CenterContents from "../../gridContents/centerContents";

interface HideoutClient {
  hideoutList: Hideout[];
}

interface Hideout {
  master_id: string;
  master_name_en: string;
  master_name_kr: string | null;
  image: string;
  data: HideoutLevel[];
}

interface Craft {
  level: number | null;
  name_en: string | null;
  name_kr: string | null;
}

interface LevelInfo {
  level: number;
  construction_time: number;
}

interface ItemRequire {
  id: string;
  count: number;
  image: string;
  name_en: string;
  name_kr: string | null;
  quantity: number;
}

interface SkillRequire {
  level: number | null;
  name_en: string | null;
  name_kr: string | null;
  image: string | null;
}

interface TraderRequire {
  image: string | null;
  value: number | null;
  compare: string | null;
  name_en: string | null;
  name_kr: string | null;
  require_type: string | null;
}

interface StationRequire {
  image: string | null;
  level: number | null;
  name_en: string | null;
  name_kr: string | null;
}

interface Bonus {
  value: number;
  name_en: string;
  name_kr: string | null;
  skill_name_en: string | null;
  skill_name_kr: string | null;
}

interface HideoutLevel {
  bonus: Bonus[];
  crafts: Craft[];
  level_id: string;
  level_info: LevelInfo[];
  item_require: ItemRequire[];
  skill_require: SkillRequire[];
  trader_require: TraderRequire[];
  station_require: StationRequire[];
}

export default function HideoutClient({ hideoutList }: HideoutClient) {
  const { hideoutCategory } = useAppStore((state) => state);

  const checkViewHideout = (newCategory: string) => {
    return hideoutCategory === newCategory;
  };

  const changeTime = (sec: number) => {
    return Math.floor(sec / 3600) + " 시간 ";
  };

  return (
    <div className="w-full">
      {hideoutList.map(
        (hideout) =>
          checkViewHideout(hideout.master_id) &&
          hideout.data.map((info) => (
            <div key={info.level_id}>
              <div
                id={info.level_id}
                className={"flex justify-center items-center w-full flex-col"}
              >
                <div className={"flex w-full mb-[2px] mt-[2px]"}>
                  <TextSpan size="xl">
                    {hideout.master_name_kr} {info.level_info[0].level}
                  </TextSpan>
                </div>
                <DefineGrid cols="5" id={info.level_id} pageId="hideout">
                  <div className={"flex flex-col justify-center col-span-2"}>
                    <Require items={info.item_require} type="item" />
                    <Require items={info.skill_require} type="skill" />
                    <Require items={info.trader_require} type="trader" />
                    <Require items={info.station_require} type="station" />
                  </div>
                  <div className={"flex flex-col justify-center col-span-2"}>
                    <Bonus bonuses={info.bonus} />
                    {info.crafts.length > 0 && (
                      <>
                        {info.crafts.map((craft, index) => (
                          <span className="font-bold text-lg mt-2" key={index}>
                            {craft.name_kr} 제작
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                  <CenterContents>
                    <TextSpan size="lg">
                      {changeTime(info.level_info[0].construction_time)}
                    </TextSpan>
                  </CenterContents>
                </DefineGrid>
              </div>
            </div>
          ))
      )}
    </div>
  );
}
