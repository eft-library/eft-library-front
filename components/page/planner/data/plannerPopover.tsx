"use client";

import { useState } from "react";
import type { PlannerPopOver } from "./plannerType";
import { CircleAlert } from "lucide-react";
import TextSpan from "@/components/custom/gridContents/textSpan";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { planner18N } from "@/lib/consts/i18nConsts";

export default function PlannerPopOver({ min_player_level }: PlannerPopOver) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);

  const changePopoverState = (condition: boolean) => {
    setIsMouseEnter(condition);
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onMouseEnter={() => changePopoverState(true)}
        onMouseLeave={() => changePopoverState(false)}
      >
        <CircleAlert color="yellow" size={30} />
      </div>

      {/* Popover Content */}
      {isMouseEnter && (
        <div
          className="w-64 absolute border-white border-solid border-2 top-[90%] left-1/2 transform -translate-x-1/2 bg-Background shadow-lg rounded-lg border p-4 z-10"
          onMouseEnter={() => changePopoverState(true)}
          onMouseLeave={() => changePopoverState(false)}
        >
          <TextSpan>
            {min_player_level}&nbsp;{planner18N.minLevel[localeKey]}
          </TextSpan>
        </div>
      )}
    </div>
  );
}
