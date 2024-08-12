"use client";

import API_ENDPOINTS from "@/config/endPoints";
import { fetchDataWithNone } from "@/lib/api";
import { PatchNotesDetail } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PatchNotesContents from "./patchNotesContents";

export default function PatchNotesDetailMain() {
  const param = useParams<{ id: string }>();
  const [patchNotesDetail, setPatchNotesDetail] = useState<PatchNotesDetail>();
  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_PATCH_NOTES_BY_ID}/${param.id}`,
      setPatchNotesDetail
    );
  }, [param]);

  if (!patchNotesDetail) return null;

  return (
    <PatchNotesContents
      patch_notes={patchNotesDetail.patch_notes}
      patch_notes_group={patchNotesDetail.patch_notes_group}
    />
  );
}
