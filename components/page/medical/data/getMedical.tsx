"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import MediKitClient from "./medikitClient";
import DrugClient from "@/components/page/medical/data/drugClient";
import ItemClient from "@/components/page/medical/data/itemClient";
import StimulantClient from "@/components/page/medical/data/stimulantClient";

interface GetMedical {
  medicalType: string;
}

export default async function GetMedical({ medicalType }: GetMedical) {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/medical");

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch medical data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  if (medicalType === "Medikit")
    return <MediKitClient medicalList={data.data} />;

  if (medicalType === "Drug") return <DrugClient medicalList={data.data} />;

  if (medicalType === "Medical item")
    return <ItemClient medicalList={data.data} />;

  if (medicalType === "Stimulant")
    return <StimulantClient medicalList={data.data} />;
}
