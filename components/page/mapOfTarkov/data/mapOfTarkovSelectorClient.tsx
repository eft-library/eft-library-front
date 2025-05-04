"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { MapOfTarkovSelectorClient } from "./mapOfTarkovType";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";

export default function MapOfTarkovSelectorClient({
  setImageSelect,
  imageSelect,
  mapData,
}: MapOfTarkovSelectorClient) {
  const param = useParams<{ id: string }>();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="w-full">
      <div className="flex justify-between w-full flex-wrap rounded-t-lg border-solid border-2 border-white p-1">
        {mapData.map_selector.map((mapOfTarkov) => (
          <div key={mapOfTarkov.id}>
            <Link
              href={`/map-of-tarkov/${mapOfTarkov.id}`}
              className={cn(
                "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
                { "bg-CloudGray": param.id === mapOfTarkov.id },
                { "text-Background": param.id === mapOfTarkov.id }
              )}
            >
              <span className="text-center font-bold">
                {mapOfTarkov.name[localeKey]}
              </span>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex w-full flex-wrap rounded-b-lg border-solid border-2 border-t-0 border-white p-1 gap-1">
        {mapData.map_info.children.map((sub) => (
          <div
            key={`image-${sub.id}`}
            onClick={() => setImageSelect(sub.id)}
            className={cn(
              "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
              { "bg-DeepSlate": imageSelect === sub.id }
            )}
          >
            <span className="text-center font-bold">{sub.name[localeKey]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
