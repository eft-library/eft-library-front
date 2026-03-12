import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import PrivacyPolicyView from "./privacy-policy-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function PrivacyPolicyData() {
  try {
    const data = await cacheRequestData(
      `${API_ENDPOINTS.GET_DYNAMIC_INFO}/${COLUMN_KEY.privacyPolicy}`,
    );
    return <PrivacyPolicyView privacyPolicy={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
