"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import MedicalSelectorClient from "@/components/custom/medical/data/medicalSelectorClient";

export default async function GetMedicalSelector() {
    const data = await requestData(
        `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.medicalType}`
    );

    if (!data || data.status !== 200) {
        console.error("Failed to fetch medical data:", data?.msg || "Unknown error");
        return null;
    }

    return <MedicalSelectorClient medicalType={data.data}/>
}
