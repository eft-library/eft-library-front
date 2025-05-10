import type { ItemView } from "../itemType";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemDetailI18N } from "@/lib/consts/i18nConsts";

export default function HeadsetView({ item }: ItemView) {
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

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.distance[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            {item.info.distance_modifier}
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
    </div>
  );
}
