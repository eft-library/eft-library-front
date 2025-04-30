"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MapDetailClient from "@/components/page/mapDetail/data/mapDetailClient";
import type { MapInfoData } from "@/components/page/mapDetail/data/mapType";
import Loading from "@/components/custom/loading/loading";

export default function GetMapDetail() {
  const [allMapInfo, setAllMapInfo] = useState<MapInfoData>();
  const param = useParams<{ id: string }>();

  useEffect(() => {
    const getAllMap = async () => {
      const data = await requestData(`${API_ENDPOINTS.GET_MAP}/${param.id}`);

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch map data:",
          data?.msg || "Unknown error"
        );
        return null;
      }

      setAllMapInfo(data.data);
    };

    if (param.id) {
      getAllMap();
    }
  }, [param.id]);

  if (!allMapInfo) return <Loading />;

  return <MapDetailClient mapInfo={allMapInfo} />;
}
