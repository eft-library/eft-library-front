"use client";

import Loading from "@/components/custom/Loading/loading";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { MapInfoData } from "./map.types";
import MapView from "./map-view";
import { useQuery } from "@tanstack/react-query";

export default function MapData() {
  const { id } = useParams<{ id: string }>();

  const fetchMapData = async (id: string): Promise<MapInfoData> => {
    const res = await fetch(`${API_ENDPOINTS.GET_MAP}/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch map data");
    }
    const json = await res.json();

    if (json.status !== 200) {
      throw new Error(json.msg || "Unknown error");
    }

    return json.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["mapData", id],
    queryFn: () => fetchMapData(id),
    enabled: !!id,
  });

  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  if (!data) return <div />;

  return <MapView mapInfo={data} />;
}
