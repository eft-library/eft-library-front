"use client";

import StationBackground from "@/assets/hideout/stationBackground";
import Loading from "@/components/custom/loading/loading";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { requestData } from "@/lib/config/api";
import type { StationMapColumn } from "./stationType";
import StationSvg from "@/assets/hideout/hideoutSvg";

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

  const svgComponents = {
    "air-filtering-unit": StationSvg.AirFilteringUnit,
    "bitcoin-farm": StationSvg.BitCoinFarm,
    "booze-generator": StationSvg.BoozeGenerator,
    "christmas-tree": StationSvg.ChristmasTree,
    "cultist-circle": StationSvg.CultistCircle,
    "defective-wall": StationSvg.DefectiveWall,
    "gear-rack": StationSvg.GearRack,
    generator: StationSvg.Generator,
    gym: StationSvg.Gym,
    "hall-of-fame": StationSvg.HallOfFame,
    illumination: StationSvg.Illumination,
    "intelligence-center": StationSvg.IntelligenceCenter,
    lavatory: StationSvg.Lavatory,
    library: StationSvg.Library,
    medstation: StationSvg.MedStation,
    "nutrition-unit": StationSvg.NutritionUnit,
    "rest-space": StationSvg.RestSpace,
    "scav-case": StationSvg.ScavCase,
    security: StationSvg.Security,
    "shooting-range": StationSvg.ShootingRange,
    "solar-power": StationSvg.SolarPower,
    stash: StationSvg.Stash,
    vents: StationSvg.Vents,
    "water-collector": StationSvg.WaterCollector,
    "weapon-rack": StationSvg.WeaponRack,
    workbench: StationSvg.Workbench,
  };

  const getStationSVG = (id: string, width: number, height: number) => {
    if (!(id in svgComponents)) {
      return null;
    }
    const Svg = svgComponents[id as keyof typeof svgComponents];

    if (!Svg) {
      return null;
    }

    return <Svg height={height} width={width} color={"red"} />;
  };

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
          {/* <Image
            src={formatImage(station.image)}
            alt={station.id}
          /> */}
          {getStationSVG(
            station.id,
            stationMapData.json_value.width,
            stationMapData.json_value.height
          )}
        </div>
      ))}
    </div>
  );
}
