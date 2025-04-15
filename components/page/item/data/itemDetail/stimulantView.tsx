import TextSpan from "@/components/custom/gridContents/textSpan";
import type { ItemView } from "../itemType";
import { filterStimEffects } from "@/lib/func/jsxfunction";
import { Buff, Debuff } from "@/components/page/medical/data/medicalTypes";

export default function StimulantView({ item }: ItemView) {
  const getSkillColor = (text: string) => {
    const blue = ["진통제", "해독제"];
    const red = ["손 떨림", "터널 효과"];

    if (blue.includes(text)) {
      return "BrightCyan";
    } else if (red.includes(text)) {
      return "Red";
    } else {
      return "white";
    }
  };

  const getPlusMinusValue = (text: number | string) => {
    if (typeof text === "number") {
      if (text === 0) return "";
      return text > 0 ? `+${text}` : `${text}`;
    }
    return "";
  };

  const checkPlus = (effect: Buff | Debuff) => {
    const red = ["BodyTemperature", "DamageModifier"];
    if (red.includes(effect.type)) {
      if (effect.value == 0) {
        return "white";
      } else if (effect.value > 0) {
        return "Red";
      } else {
        return "BrightCyan";
      }
    }

    if (typeof effect.value === "number") {
      if (effect.value == 0) {
        return "white";
      } else if (effect.value > 0) {
        return "BrightCyan";
      } else {
        return "Red";
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex w-full max-w-2xl">
        <h3 className="text-2xl max-w-2xl font-bold mb-2">정보</h3>
      </div>

      <div className="w-full max-w-2xl border-2 border-white rounded-sm overflow-hidden mb-6">
        <div className="grid grid-cols-2 border-b border-NeutralGray ">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            카테고리
          </div>
          <div className="py-2 px-2  text-center font-bold">
            {item.category}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray ">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            무게
          </div>
          <div className="py-2 px-2  text-center font-bold">
            {item.info.weight} kg
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray ">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            버프
          </div>
          <div className="py-2 px-2  font-bold flex flex-col">
            <div className="flex justify-center flex-col col-span-2">
              {item.info.buff.length > 0 ? (
                filterStimEffects(item.info.buff).map(
                  (buff: any, index: number) => (
                    <div key={`${index}-buff-${buff.skillName}`}>
                      {buff.delay != null && buff.duration != null && (
                        <span className="font-bold text-sm text-PaleYellow mt-4 ml-[4px]">
                          {item.id === "5ed5166ad380ab312177c100"
                            ? `25% 확률 / ${buff.delay}초 지연 / ${buff.duration}초 지속`
                            : buff.delay === 0
                            ? `${buff.duration}초 지속`
                            : `${buff.delay}초 지연 / ${buff.duration}초 지속`}
                        </span>
                      )}
                      <div className={"flex ml-[4px] mt-[2px]"}>
                        <TextSpan size="sm">-&nbsp;</TextSpan>
                        <TextSpan
                          size="sm"
                          textColor={getSkillColor(buff.krSkill)}
                        >
                          {buff.krSkill}
                        </TextSpan>
                        <TextSpan size="sm" textColor={checkPlus(buff)}>
                          &nbsp;{getPlusMinusValue(buff.value)}
                        </TextSpan>
                      </div>
                    </div>
                  )
                )
              ) : (
                <TextSpan>-</TextSpan>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray ">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            디버프
          </div>
          <div className="py-2 px-2  font-bold flex flex-col">
            <div className="flex flex-col">
              {item.info.debuff.length > 0 ? (
                filterStimEffects(item.info.debuff).map((debuff, index) => (
                  <div key={`${index}-debuff-${debuff.skillName}`}>
                    {debuff.delay != null && debuff.duration != null && (
                      <span className="font-bold text-sm text-PaleYellow mt-4 ml-[4px]">
                        {item.id === "5ed5166ad380ab312177c100"
                          ? `25% 확률 / ${debuff.delay}초 지연 / ${debuff.duration}초 지속`
                          : debuff.delay === 0
                          ? `${debuff.duration}초 지속`
                          : `${debuff.delay}초 지연 / ${debuff.duration}초 지속`}
                      </span>
                    )}
                    <div className={"flex ml-[4px] mt-[2px]"}>
                      <TextSpan size="sm">-&nbsp;</TextSpan>
                      <TextSpan
                        size="sm"
                        textColor={getSkillColor(debuff.krSkill)}
                      >
                        {debuff.krSkill}
                      </TextSpan>
                      <TextSpan size="sm" textColor={checkPlus(debuff)}>
                        &nbsp;{getPlusMinusValue(debuff.value)}
                      </TextSpan>
                    </div>
                  </div>
                ))
              ) : (
                <TextSpan>-</TextSpan>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
