"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import MediKitClient from "./medikitClient";

interface GetMedical {
  medicalType: string;
}

export default async function GetMedical({ medicalType }: GetMedical) {
  const data = await requestData(API_ENDPOINTS.GET_ALL_MEDICAL);

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch medical data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  if (medicalType === "Medikit")
    return <MediKitClient medicalList={data.data} />;
}
