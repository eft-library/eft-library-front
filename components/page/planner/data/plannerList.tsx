"use client";

import type { PlannerList } from "./plannerType";
import { Button } from "@/components/ui/button";
import PlannerPopOver from "./plannerPopover";
import { getQuestTitle } from "@/lib/func/jsxfunction";

export default function PlannerList({
  userQuest,
  successQuest,
  checkedQuest,
  checkedBox,
  isPreview = false,
}: PlannerList) {
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
            {quest.requirements_kr && quest.requirements_kr.length > 0 && (
              <PlannerPopOver quest={quest} />
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
                  {getQuestTitle(quest.quest_name_kr, "kr")}
                  <br />
                  {getQuestTitle(quest.quest_name_kr, "en")}
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center col-span-4">
            {quest.objectives_kr.map((objective, index) => (
              <div
                key={index}
                className="font-bold text-sm"
                dangerouslySetInnerHTML={{
                  __html: `*&nbsp;&nbsp;${objective}`,
                }}
              />
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
