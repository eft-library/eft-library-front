"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";

export default function KeySelectorClient() {
  const { setKeyCategory, keyCategory } = useAppStore((state) => state);

  const keyColumn = [
    { value: "ALL", desc_en: "All", desc_kr: "전체" },
    { value: "CUSTOMS", desc_en: "Customs", desc_kr: "세관" },
    { value: "GROUND_ZERO", desc_en: "Ground Zero", desc_kr: "그라운드 제로" },
    { value: "INTERCHANGE", desc_en: "Interchange", desc_kr: "인터체인지" },
    {
      value: "STREET_OF_TARKOV",
      desc_en: "Street of Tarkov",
      desc_kr: "타르코프 시내",
    },
    { value: "FACTORY", desc_en: "Factory", desc_kr: "팩토리" },
    { value: "LIGHT_HOUSE", desc_en: "Light House", desc_kr: "등대" },
    { value: "WOODS", desc_en: "Woods", desc_kr: "삼림" },
    { value: "SHORELINE", desc_en: "Shoreline", desc_kr: "해안선" },
    { value: "RESERVE", desc_en: "Reserve", desc_kr: "리저브" },
    { value: "THE_LAB", desc_en: "The Lab", desc_kr: "연구소" },
    { value: "N/A", desc_en: "N/A", desc_kr: "N/A" },
  ];

  return (
    <div className="flex w-full justify-between flex-wrap rounded-lg border-solid border-2 border-white gap-1 p-1">
      {keyColumn.map((key) => (
        <div
          key={key.value}
          className={cn(
            "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
            { "bg-CloudGray": keyCategory === key.value },
            { "text-Background": keyCategory === key.value }
          )}
          onClick={() => setKeyCategory(key.value)}
        >
          <span className="text-center font-bold">{key.desc_kr}</span>
        </div>
      ))}
    </div>
  );
}
