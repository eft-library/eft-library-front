"use client";

import { Badge } from "@/components/ui/badge";
import { hideoutI18n } from "@/lib/consts/i18nConsts";
import { Zap } from "lucide-react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { BonusTabTypes } from "../hideout.types";

export default function BonusTab({ bonuses }: BonusTabTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const checkNoPercent = (value: string) => {
    const noPercentList = [
      "Unlocks armor repair via repair kits",
      "Unlocks equipment modification",
      "Unlocks weapon repair via repair kits",
    ];
    return noPercentList.includes(value);
  };

  const addPlusMinus = (text: string | number) => {
    if (typeof text === "number") {
      if (text === 0) {
        return "0";
      } else if (text > 1) {
        return `+${text}`;
      }
      return text > 0
        ? `+${Math.round(text * 100)} %`
        : `${Math.round(text * 100)} %`;
    }
    return "";
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
        <Zap className="w-5 h-5 text-yellow-400" />
        {hideoutI18n.bonus[localeKey]}
      </h3>
      <div className="space-y-2">
        {bonuses.map((bonus, index) => (
          <Badge
            key={`bonus-${bonus.value}-${index}`}
            variant="secondary"
            className="mr-2 mb-2 bg-yellow-800 text-yellow-100"
          >
            {bonus.name[localeKey]}
            {checkNoPercent(bonus.name.en) && bonus.skill_name[localeKey]}
            {bonus.skill_name[localeKey] && bonus.skill_name[localeKey]}
            {!checkNoPercent(bonus.name.en) && addPlusMinus(bonus.value)}
          </Badge>
        ))}
      </div>
    </div>
  );
}
