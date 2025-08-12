"use client";

import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import type { MapOfTarkov } from "./map-of-tarkov.types";
import MapOfTarkovView from "./map-of-tarkov-view";
import Loading from "@/components/custom/Loading/loading";
import { useQuery } from "@tanstack/react-query";

export default function MapOfTarkovData() {
  const { id } = useParams<{ id: string }>();

  const fetchMOTData = async (id: string): Promise<MapOfTarkov> => {
    const res = await fetch(`${API_ENDPOINTS.GET_MAP_OF_TARKOV}/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch map of tarkov data");
    }
    const json = await res.json();

    if (json.status !== 200) {
      throw new Error(json.msg || "Unknown error");
    }

    return json.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["motData", id],
    queryFn: () => fetchMOTData(id),
    enabled: !!id,
  });
  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  if (!data) return <div>데이터가 없습니다.</div>;

  return <MapOfTarkovView mapData={data} />;
}
