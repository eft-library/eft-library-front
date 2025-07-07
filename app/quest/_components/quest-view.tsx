"use client";

import { useTheme } from "next-themes";
import type { QuestViewTypes } from "./quest.types";
import TraderCard from "./TranderCard/trader-card";
import QuestCard from "./QuestCard/quest-card";
import QuestCardM from "./QuestCard/quest-card-m";

export default function QuestView({ questData }: QuestViewTypes) {
  const { theme } = useTheme();
  // 여기에 npc 리스트, 퀘스트 리스트 가져와서 조합하기
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#121212] text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Page Title */}
        <h1
          className={`text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 ${
            theme === "dark" ? "text-[#FFB82E]" : "text-[#FF8C00]"
          }`}
        >
          퀘스트
        </h1>

        {/* Character Grid */}
        <TraderCard trader_list={questData.trader_list} />

        {/* Quest Content - Desktop Table / Mobile Cards */}
        <QuestCard quest_list={questData.quest_list} />

        {/* Mobile Quest Cards */}
        <div className="md:hidden space-y-4">
          <QuestCardM quest_list={questData.quest_list} />
        </div>
      </div>
    </div>
  );
}
