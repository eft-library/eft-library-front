"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import FooterClient from "./footerClient";

export default async function Footer() {
  const data = await requestData(
    `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.footer}`
  );

  if (!data || data.status !== 200) {
    console.error("Failed to fetch footer data:", data?.msg || "Unknown error");
    return null;
  }

  return <FooterClient footerData={data.data} />;
}
