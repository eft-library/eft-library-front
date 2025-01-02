"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import GlassesClient from "./glassesClient";

interface GetGlasses {
  isClass: boolean;
}

export default async function GetGlasses({ isClass = true }: GetGlasses) {
  const data = await requestData(API_ENDPOINTS.GET_ALL_GLASSES);

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch glasses data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <GlassesClient glassesData={data.data} isClass={isClass} />;
}
