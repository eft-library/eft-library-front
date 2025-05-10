import TextSpan from "@/components/custom/gridContents/textSpan";
import type { ItemView } from "../itemType";
import { drugText } from "@/lib/func/jsxfunction";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { effectI18N, itemDetailI18N } from "@/lib/consts/i18nConsts";

export default function DrugView({ item }: ItemView) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex w-full max-w-2xl">
        <h3 className="text-2xl max-w-2xl font-bold mb-2">
          {itemDetailI18N.info[localeKey]}
        </h3>
      </div>

      <div className="w-full max-w-2xl border-2 border-white rounded-sm overflow-hidden mb-6">
        <div className="grid grid-cols-2 border-b border-NeutralGray ">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.category[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold">
            {item.category}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray ">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.weight[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold">
            {item.info.weight} kg
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray ">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.usageCount[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold">
            {item.info.uses}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray ">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.usageTime[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold">
            {item.info.use_time} {itemDetailI18N.sec[localeKey]}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray ">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.buff[localeKey]}
          </div>
          <div className="py-2 px-2  font-bold">
            <div className="flex flex-col col-span-2">
              <span className="font-bold text-base text-PaleYellow mt-[4px]">
                {item.info.painkiller_duration} {effectI18N.duration[localeKey]}
              </span>
              <div className={"flex mb-[4px]"}>
                <TextSpan isCenter={false}>-&nbsp;</TextSpan>
                <TextSpan isCenter={false} textColor="BrightCyan">
                  {effectI18N.painKiller[localeKey]}
                </TextSpan>
              </div>
              {item.info.hydration_impact > 0 &&
                drugText("수분", item.info.hydration_impact, true)}
              {item.info.energy_impact > 0 &&
                drugText("에너지", item.info.energy_impact, true)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray ">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.debuff[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold flex flex-col">
            {item.info.hydration_impact < 0 &&
              drugText("수분", item.info.hydration_impact, false)}
            {item.info.energy_impact < 0 &&
              drugText("에너지", item.info.energy_impact, false)}
          </div>
        </div>
      </div>
    </div>
  );
}
