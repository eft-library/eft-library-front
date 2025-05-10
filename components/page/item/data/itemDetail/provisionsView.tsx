import type { ItemView } from "../itemType";
import EffectText from "@/components/page/provisions/data/effectText";
import TextSpan from "@/components/custom/gridContents/textSpan";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import {
  getPlusMinus,
  checkPlus,
  filterStimEffects,
} from "@/lib/func/jsxfunction";
import { itemDetailI18N } from "@/lib/consts/i18nConsts";

export default function ProvisionsView({ item }: ItemView) {
  console.log(item);
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
          <div className="py-2 px-2 text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.category[localeKey]}
          </div>
          <div className="py-2 px-2 text-center font-bold">{item.category}</div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2 text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.energy[localeKey]}
          </div>
          <div className="py-2 px-2 text-center font-bold ">
            <TextSpan textColor={checkPlus(item.info.energy)}>
              {getPlusMinus(item.info.energy)}
            </TextSpan>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2 text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.hydration[localeKey]}
          </div>
          <div className="py-2 px-2 text-center font-bold ">
            <TextSpan textColor={checkPlus(item.info.hydration)}>
              {getPlusMinus(item.info.hydration)}
            </TextSpan>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2 text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.capacity[localeKey]}
          </div>
          <div className="py-2 px-2 text-center font-bold ">
            {item.info.units}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2 text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.weight[localeKey]}
          </div>
          <div className="py-2 px-2 text-center font-bold ">
            {item.info.weight} kg
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2 text-GoldenYellow font-bold flex flex-col justify-center items-center">
            {itemDetailI18N.effect[localeKey]}
          </div>
          <div className="py-2 px-2 font-bold flex flex-col justify-center">
            {item.info.stim_effects.length > 0 ? (
              filterStimEffects(item.info.stim_effects).map((effect, index) => (
                <EffectText effect={effect} key={`${index}-${item.id}`} />
              ))
            ) : (
              <TextSpan>-</TextSpan>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
