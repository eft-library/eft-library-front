"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import PrivacyPolicyView from "./privacy-policy-view";

export default async function PrivacyPolicyData() {
  const data = await requestData(
    `${API_ENDPOINTS.GET_DYNAMIC_INFO}/${COLUMN_KEY.privacyPolicy}`
  );

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch privacy policy data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <PrivacyPolicyView privacyPolicy={data.data} />;
}
