"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MapInfoData } from "./map.types";
import MapView from "./map-view";

export default function MapData() {
  const [mapData, setMapData] = useState<MapInfoData>();
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

      setMapData(data.data);
    };

    if (param.id) {
      getAllMap();
    }
  }, [param.id]);

  if (!mapData) return null;

  return <MapView mapInfo={mapData} />;
}
