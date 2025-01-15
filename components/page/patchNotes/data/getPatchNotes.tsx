"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import type { InformationData } from "../../../custom/information/informationTypes";
import Information from "../../../custom/information/information";
import Loading from "@/components/custom/loading/loading";

export default function GetPatchNotes() {
  const [patchNotesData, setPatchNotesData] = useState<InformationData>();
  const param = useSearchParams();

  useEffect(() => {
    const getPatchNotesPage = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_PATCH_NOTES}?page=${Number(
          param.get("id")
        )}&page_size=10`
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch patch notes data:",
          data?.msg || "Unknown error"
        );
        return null;
      }
      setPatchNotesData(data.data);
    };

    if (param.get("id")) {
      getPatchNotesPage();
    }
  }, [param]);

  if (!patchNotesData) return <Loading />;

  return (
    <Information informationData={patchNotesData} routeLink="/patch-notes" />
  );
}
