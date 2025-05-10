import { floatToPercent } from "@/lib/func/jsxfunction";
import type { ItemView } from "../itemType";
import { useLocale } from "next-intl";
import {
  getRicochetChanceLocaleKey,
  getZonesLocaleKey,
  getLocaleKey,
} from "@/lib/func/localeFunction";
import TextSpan from "@/components/custom/gridContents/textSpan";
import { itemDetailI18N } from "@/lib/consts/i18nConsts";

export default function FaceCoverView({ item }: ItemView) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex w-full max-w-2xl">
        <h3 className="text-2xl max-w-2xl font-bold mb-2">
          {itemDetailI18N.info[localeKey]}
        </h3>
      </div>
      {item.info.class_value ? (
        <div className="w-full max-w-2xl border-2 border-white rounded-sm overflow-hidden mb-6">
          <div className="grid grid-cols-2 border-b border-NeutralGray ">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              {itemDetailI18N.category[localeKey]}
            </div>
            <div className="py-2 px-2  text-center font-bold">
              {item.category}
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-NeutralGray">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              {itemDetailI18N.armorClass[localeKey]}
            </div>
            <div className="py-2 px-2  text-center font-bold ">
              {item.info.class_value}
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-NeutralGray">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              {itemDetailI18N.armorZone[localeKey]}
            </div>
            <div className="flex flex-col w-full">
              {item.info.zones &&
                item.info.zones[getZonesLocaleKey(locale)].map(
                  (area: string, index: number) => (
                    <TextSpan key={`${index}-area-${item.id}`}>{area}</TextSpan>
                  )
                )}
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-NeutralGray">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              {itemDetailI18N.material[localeKey]}
            </div>
            <div className="py-2 px-2  text-center font-bold">
              {item.info.material ? item.info.material.name : "-"}
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-NeutralGray">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              {itemDetailI18N.durability[localeKey]}
            </div>
            <div className="py-2 px-2  text-center font-bold ">
              {item.info.durability}
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-NeutralGray">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              {itemDetailI18N.ricochetChance[localeKey]}
            </div>
            <div className="py-2 px-2  text-center font-bold ">
              {item.info.ricochet_chance[getRicochetChanceLocaleKey(locale)]}
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-NeutralGray">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              {itemDetailI18N.weight[localeKey]}
            </div>
            <div className="py-2 px-2  text-center font-bold ">
              {item.info.weight} kg
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-NeutralGray">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              {itemDetailI18N.ergonomicsPenalty[localeKey]}
            </div>
            <div className="py-2 px-2  text-center font-bold ">
              {item.info.ergo_penalty}
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-NeutralGray">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              {itemDetailI18N.moveSpeedPenalty[localeKey]}
            </div>
            <div className="py-2 px-2  text-center font-bold ">
              {floatToPercent(item.info.speed_penalty)} %
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              {itemDetailI18N.turnSpeedPenalty[localeKey]}
            </div>
            <div className="py-2 px-2  text-center font-bold ">
              {floatToPercent(item.info.turn_penalty)} %
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl border-2 border-white rounded-sm overflow-hidden mb-6">
          <div className="grid grid-cols-2 border-b border-NeutralGray ">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              {itemDetailI18N.category[localeKey]}
            </div>
            <div className="py-2 px-2  text-center font-bold">
              {item.category}
            </div>
          </div>
          <div className="grid grid-cols-2 border-b border-NeutralGray">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              {itemDetailI18N.weight[localeKey]}
            </div>
            <div className="py-2 px-2  text-center font-bold ">
              {item.info.weight} kg
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
