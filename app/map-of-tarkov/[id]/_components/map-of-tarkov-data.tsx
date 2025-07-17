"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { MapOfTarkov } from "./map-of-tarkov.types";
import MapOfTarkovView from "./map-of-tarkov-view";

export default function MapOfTarkovData() {
  const [mapData, setMapData] = useState<MapOfTarkov>();
  const param = useParams<{ id: string }>();

  useEffect(() => {
    const getMap = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_MAP_OF_TARKOV}/${param.id}`
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch map data:",
          data?.msg || "Unknown error"
        );
        return null;
      }

      setMapData(data.data);
    };

    if (param.id) {
      getMap();
    }
  }, [param.id]);

  if (!mapData) return null;

  return <MapOfTarkovView mapData={mapData} />;
}
