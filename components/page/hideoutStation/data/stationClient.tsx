"use client";

import type { StationClient } from "./stationType";
import StationDetail from "./stationDetail";
import StationMap from "./stationMap";
import LevelSelector from "./levelSelector";
import { useState } from "react";

export default function StationClient({ hideoutData }: StationClient) {
  const [master, setMaster] = useState<string>("5d484fe3654e76006657e0ac");
  const [level, setLevel] = useState<string>("5d484fe3654e76006657e0ac-1");

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex">
        <StationMap
          masterId={master}
          onChangeMaster={setMaster}
          completeList={hideoutData.complete_list}
        />
        <LevelSelector
          masterId={master}
          hideoutData={hideoutData}
          onChangeLevel={setLevel}
          completeList={hideoutData.complete_list}
        />
      </div>
      <StationDetail levelId={level} hideoutData={hideoutData} />
    </div>
  );
}
