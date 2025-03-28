"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";
import { keyColumn } from "@/lib/consts/columnConsts";

export default function KeySelectorClient() {
  const { setKeyCategory, keyCategory } = useAppStore((state) => state);

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
