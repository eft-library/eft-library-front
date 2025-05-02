"use client";

import type { MapOfTarkovWrapper } from "./mapOfTarkovType";
import MapOfTarkovClient from "./mapOfTarkovClient";
import MapOfTarkovSelectorClient from "./mapOfTarkovSelectorClient";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function MapOfTarkovWrapper({ mapData }: MapOfTarkovWrapper) {
  const param = useParams<{ id: string }>();
  const [imageSelect, setImageSelect] = useState<string>(param.id);

  return (
    <>
      <MapOfTarkovSelectorClient
        setImageSelect={setImageSelect}
        imageSelect={imageSelect}
        mapData={mapData}
      />
      <MapOfTarkovClient mapData={mapData} imageSelect={imageSelect} />
    </>
  );
}
