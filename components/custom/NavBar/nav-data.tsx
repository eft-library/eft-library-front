import NavBar from "./nav-bar";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { cacheRequestData } from "@/lib/config/api";

export default async function NavData() {
  try {
    const data = await cacheRequestData(API_ENDPOINTS.GET_NAVI_WITH_SEARCH);
    return <NavBar navData={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
