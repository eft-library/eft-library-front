"use client";

import type { QuestDetailViewTypes } from "@/app/quest/_components/quest.types";
import QuestHeader from "./QuestHeader/quest-header";
import QuestObjectives from "./QuestObjectives/quest-objectives";
import QuestRewards from "./QuestRewards/quest-rewards";
import QuestItems from "./QuestItems/quest-items";
import QuestGuide from "./QuestGuide/quest-guide";

export default function QuestDetailView({ quest }: QuestDetailViewTypes) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <QuestHeader quest={quest} />
      <QuestObjectives quest={quest} />
      <QuestRewards quest={quest} />
      <QuestItems quest={quest} />
      <QuestGuide quest={quest} />
    </div>
  );
}
