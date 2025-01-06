import TextSpan from "../../gridContents/textSpan";

interface StimEffet {
  type: string;
  delay?: number;
  value: number;
  krSkill: string;
  duration?: number;
  skillName: string;
}

interface EffectText {
  effect: StimEffet;
}

export default function EffectText({ effect }: EffectText) {
  const checkPlus = (effect: string | number) => {
    if (typeof effect === "number") {
      if (effect === 0) return "white";
      return effect > 0 ? "text-BrightCyan" : "Red";
    }

    if (typeof effect === "string") {
      switch (effect) {
        case "손 떨림":
          return "Red";
        case "진통제":
          return "BrightCyan";
        default:
          return "white";
      }
    }
  };

  const fixStr = (value: string) => {
    const fixList = ["손 떨림", "진통제"];
    return fixList.includes(value) ? value : `${value} :`;
  };

  const addPlusMinus = (text: string | number) => {
    if (typeof text === "number") {
      if (text === 0) return "";
      return text > 0 ? `+${text}` : `${text}`;
    }
    return "";
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
          {effect.skillName === "Painkiller"
            ? ""
            : ` ${addPlusMinus(effect.value)}`}
          &nbsp;
        </TextSpan>
      </div>
    </div>
  );
}
