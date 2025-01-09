"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { MapSelectorClient, MapType } from "./mapType";

export default function MapSelectorClient({ mapType }: MapSelectorClient) {
  const param = useParams<{ id: string }>();

  const sortList = (columnList: MapType) => {
    return columnList.json_value.sort((a, b) => {
      return a.order - b.order;
    });
  };

  return (
    <div className="flex justify-center w-full flex-wrap gap-2">
      {sortList(mapType).map((mapInfo) => (
        <Link href={mapInfo.link} key={mapInfo.id}>
          <div
            className={cn(
              "rounded-lg flex justify-center items-center p-[8px] w-[120px] h-[40px] cursor-pointer hover:bg-NeutralGray border-solid border-[1px] border-white",
              { "bg-NeutralGray": param.id === mapInfo.id }
            )}
          >
            <span className="text-center">{mapInfo.name_kr}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
