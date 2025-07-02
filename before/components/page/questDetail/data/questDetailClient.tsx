"use client";

import NpcDetail from "./npcDetail";
import QuestDesc from "./questDesc";
import type { QuestDetailClient } from "../../quest/data/questTypes";

export default function QuestDetailClient({ questInfo }: QuestDetailClient) {
  return (
    <div className="w-full">
      <NpcDetail questInfo={questInfo} />
      <QuestDesc questInfo={questInfo} />
    </div>
  );
}
