import { API_ENDPOINTS } from "@/lib/config/endpoint";
import MainView from "./main-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function MainData() {
  const data = await cacheRequestData(API_ENDPOINTS.GET_HOME);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch home data:", data?.msg || "Unknown error");
    return null;
  }

  return <MainView homeData={data.data} />;
}
