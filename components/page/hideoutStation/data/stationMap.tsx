"use client";

import { formatImage } from "@/lib/func/formatImage";
import StationBackground from "@/assets/hideout/stationBackground";
import Image from "next/image";
import Loading from "@/components/custom/loading/loading";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { requestData } from "@/lib/config/api";
import type { StationMapColumn } from "./stationType";

export default function StationMap() {
  const [stationMapData, setStationMapData] = useState<StationMapColumn>();

  useEffect(() => {
    const getStationMap = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.stationType}`
      );
      if (data && data.status === 200) {
        setStationMapData(data.data);
      } else {
        console.error(
          "Failed to fetch station map data:",
          data?.msg || "Unknown error"
        );
      }
    };

    getStationMap();
  }, []);

  if (!stationMapData) return <Loading />;

  return (
    <div className="relative w-[800px] mb-4">
      <StationBackground />
      {stationMapData.json_value.station_list.map((station) => (
        <div
          key={station.id}
          className="absolute opacity-50 hover:opacity-100 transition-opacity duration-100 cursor-pointer"
          style={{
            top: station.top,
            left: station.left,
          }}
        >
          <Image
            src={formatImage(station.image)}
            alt={station.id}
            width={stationMapData.json_value.width}
            height={stationMapData.json_value.height}
          />
        </div>
      ))}
    </div>
  );
}
