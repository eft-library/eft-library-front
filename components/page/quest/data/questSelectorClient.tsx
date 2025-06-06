"use client";

import { useAppStore } from "@/store/provider";
import { handleHover, handleHoverExit } from "@/lib/func/jsxfunction";
import type { QuestSelectorClient } from "./questTypes";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function QuestSelectorClient({ npcList }: QuestSelectorClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { npcId, setNpcId } = useAppStore((state) => state);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="grid grid-cols-6 gap-4 w-[70%]">
        {npcList.map((npc) => (
          <div className="flex flex-col items-center" key={npc.id}>
            <div
              className={`cursor-pointer w-[140px] h-[140px] rounded-lg ${
                npcId === npc.id
                  ? "outline outline-4 outline-[color:Goldenrod]"
                  : "outline outline-2 outline-[color:white]"
              }`}
              style={{
                backgroundImage: `url(${npc.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => setNpcId(npc.id)}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverExit}
            />
            <p className="text-white text-center mt-2 font-bold">
              {npc.name[localeKey]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
