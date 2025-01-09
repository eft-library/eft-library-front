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
    <div className="flex justify-center w-full flex-wrap gap-2">
      {sortList().map((mapOfTarkov) => (
        <Link href={mapOfTarkov.link} key={mapOfTarkov.id}>
          <div
            className={cn(
              "rounded-lg flex justify-center items-center p-[8px] w-[120px] h-[40px] cursor-pointer hover:bg-NeutralGray border-solid border-[1px] border-white",
              { "bg-NeutralGray": param.id === mapOfTarkov.id }
            )}
          >
            <span className="text-center">{mapOfTarkov.name_kr}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
