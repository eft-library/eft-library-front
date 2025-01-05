"use client";

import type {
  UserQuestList,
  UserQuestInfo,
} from "@/components/custom/userQuest/data/userQuestType";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserQuestPopOver from "./userQuestPopover";

export default function UserQuestList({
  userQuest,
  successQuest,
  checkedQuest,
  checkedBox,
}: UserQuestList) {
  const getTitle = (item: UserQuestInfo) => {
    return (
      <div className="flex flex-col justify-center items-center">
        <Link href={`/quest/detail/${item.quest_id}`}>
          <span className="text-sm font-bold text-LightOrange hover:text-Beige flex text-center flex items-center justify-center">
            {item.quest_name_kr
              .substring(0, item.quest_name_kr.indexOf("("))
              .trim()}
            <br />
            {item.quest_name_kr
              .substring(item.quest_name_kr.indexOf("("))
              .trim()}
          </span>
        </Link>
      </div>
    );
  };

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
              onChange={() => checkedBox(quest.quest_id)}
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            {quest.requirements_kr && quest.requirements_kr.length > 0 && (
              <UserQuestPopOver quest={quest} />
            )}
          </div>

          <div className="flex flex-col justify-center items-center col-span-3">
            {getTitle(quest)}
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
