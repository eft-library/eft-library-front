"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";

export default function LootSelectorClient() {
  const { setLootCategory, lootCategory } = useAppStore((state) => state);

  const lootColumn = [
    { value: "ALL", desc_en: "All", desc_kr: "전체" },
    { value: "Battery", desc_en: "Battery", desc_kr: "에너지 용품" },
    { value: "Other", desc_en: "Other", desc_kr: "기타" },
    { value: "Tool", desc_en: "Tool", desc_kr: "도구" },
    { value: "Lubricant", desc_en: "Lubricant", desc_kr: "가연성 물질" },
    { value: "Electronics", desc_en: "Electronics", desc_kr: "전자 제품" },
    {
      value: "Medical supplies",
      desc_en: "Medical supplies",
      desc_kr: "의료용품",
    },
    { value: "Jewelry", desc_en: "Jewelry", desc_kr: "귀중품" },
    {
      value: "Household goods",
      desc_en: "Household goods",
      desc_kr: "가정용품",
    },
    {
      value: "Building material",
      desc_en: "Building material",
      desc_kr: "건축 자재",
    },
    { value: "Info", desc_en: "Info", desc_kr: "정보 아이템" },
    {
      value: "Special equipment",
      desc_en: "Special equipment",
      desc_kr: "특수 장비",
    },
    { value: "Money", desc_en: "Money", desc_kr: "화폐" },
    { value: "Quest items", desc_en: "Quest items", desc_kr: "퀘스트 아이템" },
  ];

  return (
    <div className="flex w-full flex-wrap rounded-lg border-solid border-2 border-white gap-1 p-1">
      {lootColumn.map((loot) => (
        <div
          key={loot.value}
          className={cn(
            "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
            { "bg-CloudGray": lootCategory === loot.value },
            { "text-Background": lootCategory === loot.value }
          )}
          onClick={() => setLootCategory(loot.value)}
        >
          <span className="text-center font-bold">{loot.desc_kr}</span>
        </div>
      ))}
    </div>
  );
}
