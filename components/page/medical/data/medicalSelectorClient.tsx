"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";
import type { MedicalSelectorClient } from "./medicalTypes";

export default function MedicalSelectorClient({
  medicalType,
}: MedicalSelectorClient) {
  const { setMedicalCategory, medicalCategory } = useAppStore((state) => state);

  return (
    <div className="flex w-full justify-around flex-wrap rounded-lg border-solid border-2 border-white gap-1 p-1">
      {medicalType.json_value.map((medical) => (
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
