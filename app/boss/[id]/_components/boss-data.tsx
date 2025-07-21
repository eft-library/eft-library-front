"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { BossData } from "./boss.types";
import BossView from "./boss-view";
import Loading from "@/components/custom/Loading/loading";

export default function BossData() {
  const [bossData, setBossData] = useState<BossData>();
  const param = useParams<{ id: string }>();

  useEffect(() => {
    const getAllMap = async () => {
      const data = await requestData(`${API_ENDPOINTS.GET_BOSS}/${param.id}`);

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch boss data:",
          data?.msg || "Unknown error"
        );
        return null;
      }

      setBossData(data.data);
    };

    if (param.id) {
      getAllMap();
    }
  }, [param.id]);

  if (!bossData) return <Loading />;

  return <BossView bossData={bossData} />;
}
