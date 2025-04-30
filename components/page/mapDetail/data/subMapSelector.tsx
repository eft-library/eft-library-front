"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import type {
  SubMapSelector,
  SubMap,
} from "@/components/page/mapDetail/data/mapType";
import Loading from "@/components/custom/loading/loading";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function SubMapSelector({
  onClickMapAction,
  mapId,
  mapSelector,
}: SubMapSelector) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const param = useParams<{ id: string }>();
  const [subMap, setSubMap] = useState<SubMap[]>();

  useEffect(() => {
    const getSubMapById = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_SUB_MAP}/${param.id}`
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch sub map data:",
          data?.msg || "Unknown error"
        );
        return null;
      }

      setSubMap(data.data);
    };

    getSubMapById();
  }, [param.id]);

  if (!subMap || !mapSelector) return <Loading />;

  return (
    <div className="mb-6">
      <div className="flex justify-between w-full flex-wrap rounded-t-lg border-solid border-2 border-white p-1">
        {mapSelector.map((mapInfo) => (
          <Link href={mapInfo.link} key={mapInfo.id}>
            <div
              className={cn(
                "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
                { "bg-CloudGray": param.id === mapInfo.id },
                { "text-Background": param.id === mapInfo.id }
              )}
            >
              <span className="text-center font-bold">
                {mapInfo.name[localeKey]}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex w-full flex-wrap rounded-b-lg border-solid border-2 border-t-0 border-white p-1 gap-1">
        {subMap.map((sub) => (
          <div
            key={sub.id}
            onClick={() => onClickMapAction(sub)}
            className={cn(
              "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
              { "bg-DeepSlate": mapId === sub.id }
            )}
          >
            <span className="text-center font-bold">{sub.name[localeKey]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
