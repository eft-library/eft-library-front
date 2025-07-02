"use client";

import type { MapOfTarkovWrapper } from "./mapOfTarkovType";
import MapOfTarkovClient from "./mapOfTarkovClient";
import MapOfTarkovSelectorClient from "./mapOfTarkovSelectorClient";
import { useParams } from "next/navigation";
import { useState } from "react";
import AdBanner from "@/components/custom/adsense/adBanner";

export default function MapOfTarkovWrapper({ mapData }: MapOfTarkovWrapper) {
  const param = useParams<{ id: string }>();
  const [imageSelect, setImageSelect] = useState<string>(param.id);

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <MapOfTarkovSelectorClient
        setImageSelect={setImageSelect}
        imageSelect={imageSelect}
        mapData={mapData}
      />
      <MapOfTarkovClient mapData={mapData} imageSelect={imageSelect} />
    </div>
  );
}
