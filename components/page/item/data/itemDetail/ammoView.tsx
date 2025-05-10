import TextSpan from "@/components/custom/gridContents/textSpan";
import type { ItemView } from "../itemType";
import { floatToPercent, getColor, getPlusMinus } from "@/lib/func/jsxfunction";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemDetailI18N } from "@/lib/consts/i18nConsts";

export default function AmmoView({ item }: ItemView) {
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
            {itemDetailI18N.damage[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            {item.info.damage}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.penetration[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            {item.info.penetration_power}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.armorDamage[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            {item.info.armor_damage} %
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.accuracy[localeKey]}
          </div>

          <div className="py-2 px-2  text-center font-bold ">
            <TextSpan
              textColor={getColor(
                floatToPercent(item.info.accuracy_modifier),
                "check"
              )}
            >
              {getPlusMinus(floatToPercent(item.info.accuracy_modifier))} %
            </TextSpan>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.recoil[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            <TextSpan
              textColor={getColor(
                floatToPercent(item.info.recoil_modifier),
                "recoil"
              )}
            >
              {getPlusMinus(floatToPercent(item.info.recoil_modifier))}
            </TextSpan>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.lightBleeding[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            <TextSpan
              textColor={getColor(
                floatToPercent(item.info.light_bleed_modifier),
                "check"
              )}
            >
              {getPlusMinus(floatToPercent(item.info.light_bleed_modifier))}%
            </TextSpan>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.heavyBleeding[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            <TextSpan
              textColor={getColor(
                floatToPercent(item.info.heavy_bleed_modifier),
                "check"
              )}
            >
              {getPlusMinus(floatToPercent(item.info.heavy_bleed_modifier))}%
            </TextSpan>
          </div>
        </div>
      </div>
    </div>
  );
}
