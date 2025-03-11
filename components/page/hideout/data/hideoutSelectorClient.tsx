"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";
import Image from "next/image";
import type { HideoutSelectorClient } from "./hideoutTypes";

export default function HideoutSelectorClient({
  hideoutType,
}: HideoutSelectorClient) {
  const { setHideoutCategory, hideoutCategory } = useAppStore((state) => state);

  return (
    <div className="flex justify-center w-full flex-wrap gap-6">
      {hideoutType.json_value.map((hideout) => (
        <div
          key={hideout.value}
          className={cn(
            "rounded-lg flex justify-center items-center p-[8px] w-[50px] h-[50px] cursor-pointer hover:bg-NeutralGray border-solid border-[1px] border-white",
            { "bg-NeutralGray": hideoutCategory === hideout.value }
          )}
          onClick={() => setHideoutCategory(hideout.value)}
        >
          <Image
            src={hideout.image}
            width={34}
            height={34}
            alt={hideout.desc_en}
            style={{ width: "auto", height: "auto" }}
            placeholder="blur"
            blurDataURL={
              "data:image/jpeg;base64," +
              "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            }
          />
        </div>
      ))}
    </div>
  );
}
