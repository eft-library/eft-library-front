"use client";

import type { InformationData } from "@/types/types";
import React, { useState, useEffect } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import "@/assets/quest.css";
import { useSearchParams } from "next/navigation";
import InformationMain from "@/components/information/informainMain";

export default function PatchNotesDetail() {
  const param = useSearchParams();
  const [patchNotesInfo, setPatchNotesInfo] = useState<InformationData>();

  const getPatchNotesPage = (page: number) => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_PATCH_NOTES}?page=${page}&page_size=10`,
      setPatchNotesInfo
    );
  };

  useEffect(() => {
    getPatchNotesPage(Number(param.get("id")));
  }, [param]);

  if (!patchNotesInfo) return null;

  return (
    <InformationMain
      information={patchNotesInfo}
      pageId={Number(param.get("id"))}
      link="/patch-notes?id="
      detail_link="/patch-notes/detail"
    />
  );
}
