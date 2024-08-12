"use client";

import type { InformationData } from "@/types/types";
import React, { useState, useEffect } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import "@/assets/quest.css";
import { useSearchParams } from "next/navigation";
import InformationMain from "@/components/information/informainMain";

export default function EventDetail() {
  const param = useSearchParams();
  const [eventInfo, setEventInfo] = useState<InformationData>();

  const getPatchNotesPage = (page: number) => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_EVENT}?page=${page}&page_size=10`,
      setEventInfo
    );
  };

  useEffect(() => {
    getPatchNotesPage(Number(param.get("id")));
  }, [param]);

  if (!eventInfo) return null;

  return (
    <InformationMain
      information={eventInfo}
      pageId={Number(param.get("id"))}
      link="/event?id="
      detail_link="/event/detail"
    />
  );
}
