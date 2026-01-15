"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import type { BossData } from "./boss.types";
import BossView from "./boss-view";
import Loading from "@/components/custom/Loading/loading";

export default function BossData() {
  const { id } = useParams<{ id: string }>();

  const fetchBossData = async (id: string): Promise<BossData> => {
    const res = await fetch(`${API_ENDPOINTS.GET_BOSS}/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch boss data");
    }
    const json = await res.json();

    if (json.status !== 200) {
      throw new Error(json.msg || "Unknown error");
    }

    return json.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["bossData", id],
    queryFn: () => fetchBossData(id),
    enabled: !!id,
  });

  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  if (!data) return <div />;

  return <BossView bossData={data} />;
}
