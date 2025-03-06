"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";

interface KeySelectorClient {
  keyType: KeyType;
}

interface KeyType {
  id: string;
  json_value: KeyJson[];
}

interface KeyJson {
  value: string;
  desc_en: string;
  desc_kr: string;
}

export default function KeySelectorClient({ keyType }: KeySelectorClient) {
  const { setKeyCategory, keyCategory } = useAppStore((state) => state);

  return (
    <div className="flex w-full justify-between flex-wrap rounded-lg border-solid border-2 border-white gap-1 p-1">
      {keyType.json_value.map((key) => (
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
