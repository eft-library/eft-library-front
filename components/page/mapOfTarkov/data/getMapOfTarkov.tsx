"use client";

import { useParams } from "next/navigation";
import { useQueries } from "@tanstack/react-query";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import Loading from "@/components/custom/loading/loading";
import MapOfTarkovWrapper from "./mapOfTarkovWrapper";

export default function GetMapOfTarkov() {
  const param = useParams<{ id: string }>();
  const mapId = param.id;

  const results = useQueries({
    queries: [
      {
        queryKey: ["map-info", mapId],
        queryFn: () =>
          requestData(`${API_ENDPOINTS.GET_MAP_OF_TARKOV_MAP}/${mapId}`),
        enabled: !!mapId,
      },
      {
        queryKey: ["map-boss", mapId],
        queryFn: () =>
          requestData(`${API_ENDPOINTS.GET_MAP_OF_TARKOV_BOSS}/${mapId}`),
        enabled: !!mapId,
      },
      {
        queryKey: ["map-extraction", mapId],
        queryFn: () =>
          requestData(
            `${API_ENDPOINTS.GET_MAP_OF_TARKOV_EXTRACTIONS}/${mapId}`
          ),
        enabled: !!mapId,
      },
      {
        queryKey: ["map-transits", mapId],
        queryFn: () =>
          requestData(`${API_ENDPOINTS.GET_MAP_OF_TARKOV_TRANSITS}/${mapId}`),
        enabled: !!mapId,
      },
      {
        queryKey: ["map-find", mapId],
        queryFn: () =>
          requestData(`${API_ENDPOINTS.GET_MAP_OF_TARKOV_FIND_INFO}/${mapId}`),
        enabled: !!mapId,
      },
      {
        queryKey: ["map-selector"],
        queryFn: () => requestData(API_ENDPOINTS.GET_MAP_OF_TARKOV_SELECTOR),
      },
    ],
  });

  const isLoading = results.some((res) => res.isLoading);

  if (isLoading) return <Loading />;

  const [
    mapInfoRes,
    bossInfoRes,
    extractionRes,
    transitsRes,
    findInfoRes,
    selectorRes,
  ] = results.map((res) => res.data?.data);

  const mapData = {
    map_info: mapInfoRes,
    boss_info: bossInfoRes,
    extraction_info: extractionRes,
    transits_info: transitsRes,
    find_info: findInfoRes,
    map_selector: selectorRes,
    map_id: mapId,
  };

  return <MapOfTarkovWrapper mapData={mapData} />;
}
