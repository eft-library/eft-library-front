"use client";

import "../../../../assets/quest.css";
import { useState } from "react";
import type { PlannerPopOver } from "./plannerType";
import { CircleAlert } from "lucide-react";
import TextSpan from "@/components/custom/gridContents/textSpan";

export default function PlannerPopOver({ min_player_level }: PlannerPopOver) {
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
          <TextSpan>{min_player_level} 이후 부터 가능합니다.</TextSpan>
        </div>
      )}
    </div>
  );
}
