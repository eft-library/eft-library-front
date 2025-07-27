"use client";

import { useTheme } from "next-themes";
import type { QuestViewTypes } from "./quest.types";
import TraderCard from "./TranderCard/trader-card";
import QuestCard from "./QuestCard/quest-card";
import QuestCardM from "./QuestCard/quest-card-m";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { placeHolderText, questI18N } from "@/lib/consts/i18nConsts";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function QuestView({ questData }: QuestViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { theme } = useTheme();
  const [word, setWord] = useState<string>("");

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
          className={`text-xl md:text-4xl font-bold text-center mb-8 md:mb-12 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {questI18N.title[localeKey]}
        </h1>

        {/* Character Grid */}
        <TraderCard trader_list={questData.trader_list} />

        <div className="mb-8 mt-8">
          <Input
            type="text"
            placeholder={placeHolderText.search[localeKey]}
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="w-full max-w-lg mx-auto block"
          />
        </div>
        {/* Quest Content - Desktop Table / Mobile Cards */}
        <QuestCard quest_list={questData.quest_list} word={word} />

        {/* Mobile Quest Cards */}
        <div className="md:hidden space-y-4">
          <QuestCardM quest_list={questData.quest_list} word={word} />
        </div>
      </div>
    </div>
  );
}
