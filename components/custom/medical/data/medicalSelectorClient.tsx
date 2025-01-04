"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";

interface MedicalSelectorClient {
  medicalType: MedicalType;
}

interface MedicalType {
  id: string;
  json_value: MedicalJson[];
}

interface MedicalJson {
  value: string;
  desc_en: string;
  desc_kr: string;
}

export default function MedicalSelectorClient({
  medicalType,
}: MedicalSelectorClient) {
  const { setMedicalCategory, medicalCategory } = useAppStore((state) => state);

  return (
    <div className="flex justify-center w-full flex-wrap gap-2">
      {medicalType.json_value.map((medical) => (
        <div
          key={medical.value}
          className={cn(
            "rounded-lg flex justify-center items-center p-[8px] w-[120px] h-[40px] cursor-pointer hover:bg-NeutralGray border-solid border-[1px] border-white",
            { "bg-NeutralGray": medicalCategory === medical.value }
          )}
          onClick={() => setMedicalCategory(medical.value)}
        >
          <span className="text-xs text-center font-bold">
            {medical.desc_kr}
          </span>
        </div>
      ))}
    </div>
  );
}
