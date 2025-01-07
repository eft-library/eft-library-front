"use client";

import "photoswipe/dist/photoswipe.css";
import Bonus from "@/components/page/hideout/data/bonus";
import { useAppStore } from "@/store/provider";
import Require from "@/components/page/hideout/data/require";
import TextSpan from "../../../custom/gridContents/textSpan";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import { checkIdCategory } from "@/lib/func/jsxfunction";
import type { HideoutClient } from "./hideoutTypes";

export default function HideoutClient({ hideoutList }: HideoutClient) {
  const { hideoutCategory } = useAppStore((state) => state);
  const changeTime = (sec: number) => {
    return Math.floor(sec / 3600) + " 시간 ";
  };
  return (
    <div className="w-full">
      {hideoutList.map(
        (hideout) =>
          checkIdCategory(hideoutCategory, hideout.master_id) &&
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
