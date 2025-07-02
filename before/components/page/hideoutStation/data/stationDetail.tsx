"use client";

import { Button } from "@/components/ui/button";
import type { StationDetail } from "./stationType";
import DetailRequire from "./detailRequire";
import DetailBonus from "./detailBonus";
import DetailCraft from "./detailCraft";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { hideoutI18n } from "@/lib/consts/i18nConsts";
import { changeTime, getMaxSuffix } from "@/lib/func/jsxfunction";

export default function StationDetail({
  levelId,
  hideoutData,
  complete_list,
  onClickSave,
}: StationDetail) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const splitLevel = levelId.split("-");

  const masterInfo = hideoutData.hideout_info.find(
    (station) => station.master_id === splitLevel[0]
  );

  const levelItem = masterInfo?.data.find((sub) => sub.level_id === levelId);

  const checkBuild = () => {
    return complete_list.includes(levelId);
  };

  const checkBroken = () => {
    return !complete_list.includes(levelId);
  };

  return (
    <div className="w-full border-solid border-white border-2 rounded-lg overflow-hidden">
      <div className="p-5 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 from-amber-700/80 to-amber-900/80 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                {masterInfo
                  ? getStationSVG(
                      masterInfo?.master_id,
                      60,
                      60,
                      getMaxSuffix(levelId)
                    )
                  : ""}
              </div>
            </div>
            <div>
              <p className="text-3xl font-medium font-bold">
                {masterInfo ? masterInfo.master_name[localeKey] : ""}
              </p>
              <p className="text-2xl font-bold">LV {splitLevel[1]}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-2 w-[140px]">
            <Button
              onClick={() => onClickSave(levelId, "complete")}
              disabled={checkBuild()}
              className="px-4 font-bold py-2 border-2 bg-Background border-LimeGreen text-white rounded-lg hover:bg-NeutralGray text-lg"
            >
              {hideoutI18n.userFunc.build[localeKey]}
            </Button>
            <Button
              onClick={() => onClickSave(levelId, "broken")}
              disabled={checkBroken()}
              className="px-4 font-bold py-2 border-2 bg-Background border-Red text-white rounded-lg hover:bg-NeutralGray text-lg"
            >
              {hideoutI18n.userFunc.destroy[localeKey]}
            </Button>
          </div>
        </div>

        <div>
          <p className="text-2xl font-bold mb-2 text-GoldenYellow">
            {hideoutI18n.constructionTime[localeKey]}
          </p>
          <p className="text-white text-lg font-bold">
            {changeTime(levelItem?.level_info[0].construction_time)}
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-2 text-GoldenYellow">
            {hideoutI18n.require[localeKey]}
          </h3>
          <div className="w-full flex flex-col gap-4">
            {levelItem && levelItem.trader_require && (
              <DetailRequire items={levelItem.trader_require} type="trader" />
            )}
            {levelItem && levelItem.station_require && (
              <DetailRequire items={levelItem.station_require} type="station" />
            )}
            {levelItem && levelItem.skill_require && (
              <DetailRequire items={levelItem.skill_require} type="skill" />
            )}
            {levelItem && levelItem.item_require && (
              <DetailRequire items={levelItem.item_require} type="item" />
            )}
          </div>
        </div>

        {levelItem && levelItem.bonus && levelItem.bonus.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-2 text-GoldenYellow">
              {hideoutI18n.bonus[localeKey]}
            </h3>
            <div className="w-full flex flex-col gap-2">
              {levelItem && levelItem.bonus && (
                <DetailBonus bonuses={levelItem?.bonus} />
              )}
            </div>
          </div>
        )}

        {levelItem && levelItem.crafts && levelItem.crafts.length > 0 && (
          <div>
            <h3 className="text-2xl mb-2 font-bold text-GoldenYellow">
              {hideoutI18n.craft[localeKey]}
            </h3>
            <div className="w-full flex flex-col gap-2">
              {levelItem && levelItem.crafts && (
                <DetailCraft crafts={levelItem.crafts} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
