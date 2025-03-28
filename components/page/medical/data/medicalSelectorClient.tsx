"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";

export default function MedicalSelectorClient() {
  const { setMedicalCategory, medicalCategory } = useAppStore((state) => state);

  const medicalColumn = [
    { value: "ALL", desc_en: "All", desc_kr: "전체" },
    { value: "Drug", desc_en: "진통제", desc_kr: "진통제" },
    { value: "Stimulant", desc_en: "주사기", desc_kr: "주사기" },
    { value: "Medical item", desc_en: "부상 치료", desc_kr: "부상 치료" },
    { value: "Medikit", desc_en: "회복", desc_kr: "회복" },
  ];

  return (
    <div className="flex w-full justify-around flex-wrap rounded-lg border-solid border-2 border-white gap-1 p-1">
      {medicalColumn.map((medical) => (
        <div
          key={medical.value}
          className={cn(
            "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
            { "bg-CloudGray": medicalCategory === medical.value },
            { "text-Background": medicalCategory === medical.value }
          )}
          onClick={() => setMedicalCategory(medical.value)}
        >
          <span className="text-center font-bold">{medical.desc_kr}</span>
        </div>
      ))}
    </div>
  );
}
