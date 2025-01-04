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
      if (effect === 0) return "text-white";
      return effect > 0 ? "text-BrightCyan" : "text-Red";
    }

    if (typeof effect === "string") {
      switch (effect) {
        case "손 떨림":
          return "text-Red";
        case "진통제":
          return "text-BrightCyan";
        default:
          return "text-white";
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
      {effect.delay && effect.duration ? (
        <span className="text-sm font-bold text-PaleYellow">
          {effect.skillName === "Painkiller"
            ? `${effect.duration}초 지속`
            : `${effect.delay}초 지연 / ${effect.duration}초 지속`}
        </span>
      ) : null}
      <div className="flex">
        <span className="font-bold text-sm">-&nbsp;</span>
        <span className={`font-bold text-sm ${checkPlus(effect.krSkill)} `}>
          {fixStr(effect.krSkill)}&nbsp;
        </span>
        <span className={`font-bold text-sm ${checkPlus(effect.value)}`}>
          {effect.skillName === "Painkiller"
            ? ""
            : ` ${addPlusMinus(effect.value)}`}
        </span>
      </div>
    </div>
  );
}
