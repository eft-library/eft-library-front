import { checkPlus, getPlusMinus } from "@/lib/func/jsxfunction";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { EffectText } from "./provisionsTypes";

export default function EffectText({ effect }: EffectText) {
  const fixStr = (value: string) => {
    const fixList = ["손 떨림", "진통제"];
    return fixList.includes(value) ? value : `${value} :`;
  };

  return (
    <div>
      {effect.delay && effect.duration && (
        <TextSpan isCenter={false} textColor="PaleYellow">
          {effect.skillName === "Painkiller"
            ? `${effect.duration}초 지속`
            : `${effect.delay}초 지연 / ${effect.duration}초 지속`}
        </TextSpan>
      )}
      <div className="flex">
        <TextSpan isCenter={false}>-&nbsp;</TextSpan>
        <TextSpan isCenter={false} textColor={checkPlus(effect.krSkill)}>
          {fixStr(effect.krSkill)}&nbsp;
        </TextSpan>
        <TextSpan isCenter={false} textColor={checkPlus(effect.value)}>
          {effect.skillName === "Painkiller" || effect.type === "HandsTremor"
            ? ""
            : ` ${getPlusMinus(effect.value)}`}
          &nbsp;
        </TextSpan>
      </div>
    </div>
  );
}
