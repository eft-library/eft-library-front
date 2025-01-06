"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";
import TextSpan from "../../gridContents/textSpan";

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
    <div className="flex justify-center w-full flex-wrap gap-2">
      {keyType.json_value.map((key) => (
        <div
          key={key.value}
          className={cn(
            "rounded-lg flex justify-center items-center p-[8px] w-[120px] h-[40px] cursor-pointer hover:bg-NeutralGray border-solid border-[1px] border-white",
            { "bg-NeutralGray": keyCategory === key.value }
          )}
          onClick={() => setKeyCategory(key.value)}
        >
          <TextSpan size="xs">{key.desc_kr}</TextSpan>
        </div>
      ))}
    </div>
  );
}
