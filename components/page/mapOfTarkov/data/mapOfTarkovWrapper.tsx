"use client";

import type { MapOfTarkovWrapper } from "./mapOfTarkovType";
import MapOfTarkovClient from "./mapOfTarkovClient";
import MapOfTarkovSelectorClient from "./mapOfTarkovSelectorClient";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function MapOfTarkovWrapper({
  mapOfTarkovList,
}: MapOfTarkovWrapper) {
  const param = useParams<{ id: string }>();
  const [imageSelect, setImageSelect] = useState<string>(param.id);

  return (
    <>
      <MapOfTarkovSelectorClient
        setImageSelect={setImageSelect}
        imageSelect={imageSelect}
      />
      <MapOfTarkovClient
        mapOfTarkovList={mapOfTarkovList}
        imageSelect={imageSelect}
      />
    </>
  );
}
