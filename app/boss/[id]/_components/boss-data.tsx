import type { BossData } from "./boss.types";
import BossView from "./boss-view";
import { notFound } from "next/navigation";
import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

export default async function BossData({ id }: { id: string }) {
  try {
    const data = await cacheRequestData(`${API_ENDPOINTS.GET_BOSS}/${id}`);
    return <BossView bossData={data.data} />;
  } catch (error) {
    notFound();
  }
}
