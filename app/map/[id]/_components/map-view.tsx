"use client";

import { useState } from "react";
import type { MapData, MapViewTypes } from "./map.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { interactiveMapI18N } from "@/lib/consts/i18nConsts";

export default function MapView({ mapInfo }: MapViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const [mapData, setMapData] = useState<MapData>(mapInfo.map);

  const onClickMap = (value: MapData) => {
    setMapData(value);
  };
  if (!mapData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {interactiveMapI18N.title[localeKey]}
          </h1>
        </div>

        <div className="space-y-6">
          {/* Map Area */}

          {/* Filter Panel */}
        </div>
      </div>
    </div>
  );
}
