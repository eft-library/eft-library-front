import TextSpan from "@/components/custom/gridContents/textSpan";
import type { ItemView } from "../itemType";
import {
  checkSkillPlus,
  checkValuePlus,
  noReturnSkill,
  getPlusMinus,
} from "@/lib/func/jsxfunction";
import { useLocale } from "next-intl";
import { getEffectLocalizedKey, getLocaleKey } from "@/lib/func/localeFunction";
import { effectI18N, itemDetailI18N } from "@/lib/consts/i18nConsts";
import type { StimEffect } from "@/components/page/provisions/data/provisionsTypes";

export default function StimulantView({ item }: ItemView) {
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
            {itemDetailI18N.effect[localeKey]}
          </div>
          <div className="py-2 px-2  font-bold flex flex-col">
            <div className="flex justify-center flex-col col-span-2">
              {(() => {
                const groupedEffects = (
                  item.info.stim_effects as StimEffect[]
                ).reduce((acc, effect) => {
                  const key = `${effect.delay}-${effect.duration}`;
                  if (!acc[key]) acc[key] = [];
                  acc[key].push(effect);
                  return acc;
                }, {} as Record<string, StimEffect[]>);

                const entries = Object.entries(groupedEffects);

                return entries.length > 0 ? (
                  entries.map(([key, effects]) => {
                    const [delay, duration] = key.split("-");

                    return (
                      <div key={`group-${key}`}>
                        <span className="font-bold text-base text-PaleYellow mt-[4px]">
                          {delay}
                          &nbsp;{effectI18N.delay[localeKey]} / {duration}
                          &nbsp;{effectI18N.duration[localeKey]}
                        </span>
                        {effects.map((effect, index) => (
                          <div
                            key={`effect-${effect.type}-${item.id}-${index}`}
                            className="flex mb-[4px]"
                          >
                            <TextSpan isCenter={false}>-&nbsp;</TextSpan>
                            <TextSpan
                              isCenter={false}
                              textColor={checkSkillPlus(
                                effect.skill_name_en || ""
                              )}
                            >
                              {effect[getEffectLocalizedKey(localeKey)]}
                              &nbsp;
                            </TextSpan>
                            {effect.skill_name_en &&
                              !noReturnSkill.includes(effect.skill_name_en) && (
                                <TextSpan
                                  isCenter={false}
                                  textColor={checkValuePlus(effect.value)}
                                >
                                  {` ${getPlusMinus(effect.value)}`}
                                </TextSpan>
                              )}
                          </div>
                        ))}
                      </div>
                    );
                  })
                ) : (
                  <TextSpan>-</TextSpan>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
