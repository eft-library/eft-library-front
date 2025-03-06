"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import MapDetailClient from "@/components/page/mapDetail/data/mapDetailClient";
import type {
  MapData,
  MapType,
} from "@/components/page/mapDetail/data/mapType";
import Loading from "@/components/custom/loading/loading";

export default function GetMapDetail() {
  const [mapInfo, setMapInfo] = useState<MapData>();
  const [mapType, setMapType] = useState<MapType>();
  const param = useParams<{ id: string }>();

  useEffect(() => {
    const getMapById = async () => {
      const data = await requestData(`${API_ENDPOINTS.GET_MAP}/${param.id}`);

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch map data:",
          data?.msg || "Unknown error"
        );
        return null;
      }

      setMapInfo(data.data);
    };

    const getMapSelector = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.map}`
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch map data:",
          data?.msg || "Unknown error"
        );
        return null;
      }

      setMapType(data.data);
    };

    if (param.id) {
      getMapById();
      getMapSelector();
    }
  }, [param.id]);

  if (!mapInfo || !mapType) return <Loading />;

  return <MapDetailClient mapInfo={mapInfo} mapType={mapType} />;
}
