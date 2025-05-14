"use client";

import type { PlannerList } from "./plannerType";
import { Button } from "@/components/ui/button";
import PlannerPopOver from "./plannerPopover";
import { useLocale } from "next-intl";
import {
  getDescriptionLocaleKey,
  getLocaleKey,
} from "@/lib/func/localeFunction";
import { Skull } from "lucide-react";
import { ALL_COLOR } from "@/lib/consts/colorConsts";

export default function PlannerList({
  userQuest,
  successQuest,
  checkedQuest,
  checkedBox,
  isPreview = false,
}: PlannerList) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="w-full">
      {userQuest.quest_info.map((quest, index) => (
        <div
          key={`${index}-${quest.quest_id}`}
          className="w-full grid grid-cols-12 gap-4 border-solid border-white border-2 mb-2 rounded-lg p-3"
        >
          <div className="flex flex-col justify-center items-center">
            <input
              type="checkbox"
              className="w-6 h-6 border border-white cursor-pointer"
              checked={checkedQuest.includes(quest.quest_id)}
              onChange={() => checkedBox(quest.quest_id, isPreview)}
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            {quest.min_player_level && (
              <PlannerPopOver min_player_level={quest.min_player_level} />
            )}
          </div>

          <div className="flex flex-col justify-center items-center col-span-3">
            <div className="flex flex-col justify-center items-center">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`/quest/detail/${quest.url_mapping}`}
              >
                <span className="text-sm font-bold text-LightOrange hover:text-Beige flex text-center flex items-center justify-center">
                  {quest.quest_name[localeKey]}
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center col-span-4">
            {quest.objectives &&
              quest.objectives.map((obj, oIndex) => (
                <div
                  className="font-bold text-base p-[1px]"
                  key={`${oIndex}-objectives-${quest.quest_id}`}
                >
                  * {obj[getDescriptionLocaleKey(locale)]}
                  {obj.type === "shoot" && (
                    <span className="ml-2 whitespace-nowrap">
                      [
                      <Skull
                        className="inline-block w-4 h-4"
                        color={ALL_COLOR.Red}
                        strokeWidth={3}
                      />
                      x&nbsp;{obj.count}]
                    </span>
                  )}
                </div>
              ))}
          </div>

          <div className="flex flex-col justify-center items-center col-span-3">
            <Button
              className="w-[100px] bg-Background text-white font-bold border-white border-2 border-solid rounded-lg hover:bg-NeutralGray"
              onClick={() => successQuest(quest.quest_id, quest.next)}
            >
              완료
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
