"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { InformationInfoDetail } from "../../../custom/informationDetail/informationDetailTypes";
import InformationDetailClient from "../../../custom/informationDetail/informationDetail";

export default function GetPatchNotesDetail() {
  const [patchNotesInfo, setPatchNotesInfo] = useState<InformationInfoDetail>();
  const param = useParams<{ id: string }>();

  useEffect(() => {
    const getPatchNotesById = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_PATCH_NOTES_BY_ID}/${param.id}`
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch patch notes data:",
          data?.msg || "Unknown error"
        );
        return null;
      }

      setPatchNotesInfo(data.data);
    };

    if (param.id) {
      getPatchNotesById();
    }
  }, [param.id]);

  if (!patchNotesInfo) return null;

  return (
    <InformationDetailClient
      informationInfo={patchNotesInfo}
      routeLink="/patch-notes"
    />
  );
}
