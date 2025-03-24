"use client";

import type { StationClient } from "./stationType";
import StationDetail from "./stationDetail";
import StationMap from "./stationMap";

export default function StationClient({ hideoutList }: StationClient) {
  console.log(hideoutList);
  return (
    <div className="w-full flex flex-col items-center">
      <StationMap />
      <StationDetail />
    </div>
  );
}
