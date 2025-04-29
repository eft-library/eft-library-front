"use client";

import StationBackground from "@/assets/hideout/stationBackground";
import Loading from "@/components/custom/loading/loading";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { requestData } from "@/lib/config/api";
import type { StationMapColumn, StationMap } from "./stationType";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import { ALL_COLOR } from "@/lib/consts/colorConsts";

export const dynamic = "force-dynamic";

// TODO: 사용자 완료 리스트 받아서 테두리 색깔 구분을 해야함
export default function StationMap({
  onChangeMaster,
  masterId,
  completeList,
}: StationMap) {
  const [stationMapData, setStationMapData] = useState<StationMapColumn>();

  useEffect(() => {
    const getStationMap = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_DYNAMIC_INFO}/${COLUMN_KEY.stationType}`
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

  const getMaxSuffix = (id: string) => {
    const filteredList = completeList
      .filter((item) => item.startsWith(id + "-"))
      .map((item) => parseInt(item.split("-")[1], 10));

    const maxDepth = filteredList.length > 0 ? Math.max(...filteredList) : -1; // 기본값 -1

    if (maxDepth === 1) return ALL_COLOR.SandyOchre;
    if (maxDepth === 2) return ALL_COLOR.BurningOrange;
    if (maxDepth === 3) return ALL_COLOR.OliveTeal;
    if (maxDepth === 4) return ALL_COLOR.CobaltBlue;
    if (maxDepth === 5) return ALL_COLOR.IndigoViolet;
    if (maxDepth === 6) return ALL_COLOR.RoyalPurple;
    return ALL_COLOR.SoftAlloy; // maxDepth === -1일 경우 기본값
  };

  return (
    <div className="relative w-[800px] mb-4">
      <StationBackground />
      {stationMapData.json_value.station_list.map((station) => (
        <div
          key={station.id}
          onClick={() => onChangeMaster(station.id)}
          className={`absolute opacity-${
            masterId === station.id ? "100" : "70"
          } hover:opacity-100 transition-opacity duration-100 cursor-pointer`}
          style={{
            top: station.top,
            left: station.left,
          }}
        >
          {getStationSVG(
            station.id,
            stationMapData.json_value.width,
            stationMapData.json_value.height,
            getMaxSuffix(station.id)
          )}
        </div>
      ))}
    </div>
  );
}
