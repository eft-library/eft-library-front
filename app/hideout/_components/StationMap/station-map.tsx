"use client";

import StationBackground from "@/assets/hideout/stationBackground";
import { Button } from "@/components/ui/button";
import { StationMapStateTypes, StationMapTypes } from "../hideout.types";
import { useEffect, useState } from "react";
import Loading from "@/components/custom/Loading/loading";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import { getMaxSuffix } from "@/lib/func/jsxfunction";

export default function StationMap({
  onClickReset,
  onChangeMaster,
  completeList,
  masterId,
}: StationMapTypes) {
  const [stationMapData, setStationMapData] = useState<StationMapStateTypes>();

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

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="relative w-full h-96 overflow-hidden mb-4">
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
              getMaxSuffix(station.id, completeList)
            )}
          </div>
        ))}
      </div>
      {/* Mobile Facility Selector */}
      <div className="md:hidden mt-4">
        <div className="grid grid-cols-3 gap-2">
          {stationMapData.json_value.station_list.map((station) => (
            <Button
              key={station.id}
              size="sm"
              onClick={() => onChangeMaster(station.id)}
              style={{
                top: station.top,
                left: station.left,
              }}
              className={
                masterId === station.id
                  ? "bg-yellow-700 text-white hover:bg-yellow-800 text-xs"
                  : "bg-muted text-muted-foreground border border-border hover:bg-muted/80 text-xs"
              }
            >
              {getStationSVG(
                station.id,
                stationMapData.json_value.width,
                stationMapData.json_value.height,
                getMaxSuffix(station.id, completeList)
              )}
            </Button>
          ))}
        </div>
      </div>
      {/* 초기화 버튼 (모바일/데스크탑 모두 우측 정렬) */}
      <div className="mt-4 flex justify-end">
        <Button
          size="sm"
          onClick={onClickReset}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          초기화
        </Button>
      </div>
    </div>
  );
}
