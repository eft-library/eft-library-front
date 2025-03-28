"use client";

import { medicalColumn } from "@/lib/consts/columnConsts";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";

export default function MedicalSelectorClient() {
  const { setMedicalCategory, medicalCategory } = useAppStore((state) => state);

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
