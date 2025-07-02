"use client";

import type { RoadmapTab } from "./roadmapTypes";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function RoadmapTab({
  npcList,
  setTabState,
  tabState,
}: RoadmapTab) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="border-2 border-solid border-white rounded-lg w-full">
      <div className="flex text-lg">
        <button
          className={`flex-1 font-bold py-2 hover:bg-NeutralGray ${
            tabState === "all" ? "bg-NeutralGray text-white" : "text-white"
          }`}
          onClick={() => setTabState("all")}
        >
          ALL
        </button>
        {npcList.length > 0 &&
          npcList.map((npc) => (
            <button
              key={npc.id}
              className={`flex-1 font-bold py-2 hover:bg-NeutralGray ${
                tabState === npc.id ? "bg-NeutralGray text-white" : "text-white"
              }`}
              onClick={() => setTabState(npc.id)}
            >
              {npc.name[localeKey]}
            </button>
          ))}
      </div>
    </div>
  );
}
