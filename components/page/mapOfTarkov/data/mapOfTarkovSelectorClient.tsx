"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { MapOfTarkovSelectorClient } from "./mapOfTarkovType";

export default function MapOfTarkovSelectorClient({
  mapOfTarkovType,
}: MapOfTarkovSelectorClient) {
  const param = useParams<{ id: string }>();

  const sortList = () => {
    const result = mapOfTarkovType.json_value.sort((a, b) => {
      return a.order - b.order;
    });
    return result;
  };

  return (
    <div className="flex justify-between w-full flex-wrap rounded-t-lg border-solid border-2 border-white p-1">
      {sortList().map((mapOfTarkov) => (
        <Link href={mapOfTarkov.link} key={mapOfTarkov.id}>
          <div
            className={cn(
              "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
              { "bg-CloudGray": param.id === mapOfTarkov.id },
              { "text-Background": param.id === mapOfTarkov.id }
            )}
          >
            <span className="text-center font-bold">{mapOfTarkov.name_kr}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
