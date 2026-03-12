import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import TermsView from "./terms-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function TermsData() {
  try {
    const data = await cacheRequestData(
      `${API_ENDPOINTS.GET_DYNAMIC_INFO}/${COLUMN_KEY.terms}`,
    );
    return <TermsView terms={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
