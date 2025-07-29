"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import TermsView from "./terms-view";

export default async function TermsData() {
  const data = await requestData(
    `${API_ENDPOINTS.GET_DYNAMIC_INFO}/${COLUMN_KEY.terms}`
  );

  if (!data || data.status !== 200) {
    console.error("Failed to fetch terms data:", data?.msg || "Unknown error");
    return null;
  }

  return <TermsView terms={data.data} />;
}
