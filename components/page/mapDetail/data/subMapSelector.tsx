"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import type {
  SubMapSelector,
  SubMap,
} from "@/components/page/mapDetail/data/mapType";

export default function SubMapSelector({
  onClickMapAction,
  mapId,
}: SubMapSelector) {
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

  if (!subMap) return null;

  return (
    <div className="flex justify-center">
      {subMap.map((sub) => (
        <p
          key={sub.id}
          onClick={() => onClickMapAction(sub)}
          className={`font-bold px-2 cursor-pointer ${
            mapId === sub.id ? "text-yellow-500" : "text-yellow-700"
          } hover:text-yellow-500`}
        >
          * {sub.name_kr}
        </p>
      ))}
    </div>
  );
}
