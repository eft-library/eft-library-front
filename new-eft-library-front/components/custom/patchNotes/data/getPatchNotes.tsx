"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import PatchNotesClient from "@/components/custom/patchNotes/data/patchNotesClient";

interface PatchNotesInfo {
  id: string;
  name_en: string[];
  name_kr: string[];
  notes_en: string;
  notes_kr: string;
  update_time: string;
}
interface PatchNotesData {
  data: PatchNotesInfo[];
  total_count: number;
  max_pages: number;
  current_page: number;
}

export default function GetPatchNotes() {
  const [patchNotesData, setPatchNotesData] = useState<PatchNotesData>();
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

  if (!patchNotesData) return null;

  return <PatchNotesClient patchNotesData={patchNotesData} />;
}
