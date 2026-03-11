import { cacheLife } from "next/cache";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import MedicalView from "./medical-view";

async function fetchItem() {
  "use cache";
  cacheLife({
    stale: 86400, // 24시간 fresh
    revalidate: 86400, // 24시간 후 재검증
    expire: 172800, // 2일 후 만료
  });

  const res = await fetch(API_ENDPOINTS.GET_ITEM_LIST + "/medical");
  return res.json();
}

export default async function MedicalData() {
  const data = await fetchItem();

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch medical data:",
      data?.msg || "Unknown error",
    );
    return null;
  }

  return <MedicalView medical={data.data} />;
}
