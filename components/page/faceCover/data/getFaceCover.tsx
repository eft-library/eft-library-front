"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import FaceCoverClient from "./faceCoverClient";

interface GetFaceCover {
  isClass: boolean;
}

export default async function GetFaceCover({ isClass }: GetFaceCover) {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/face-cover");

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch face cover data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <FaceCoverClient face_cover_data={data.data} isClass={isClass} />;
}
