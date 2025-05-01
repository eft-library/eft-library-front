"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MapOfTarkovWrapper from "./mapOfTarkovWrapper";
import type { MapOfTarkov } from "./mapOfTarkovType";
import Loading from "@/components/custom/loading/loading";

export default function GetMapOfTarkov() {
  const [mapData, setMapData] = useState<MapOfTarkov>();
  const param = useParams<{ id: string }>();

  useEffect(() => {
    const getAllMap = async () => {
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
      getAllMap();
    }
  }, [param.id]);

  if (!mapData) return <Loading />;

  return <MapOfTarkovWrapper mapData={mapData} />;
}
