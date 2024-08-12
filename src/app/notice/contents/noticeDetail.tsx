"use client";

import type { InformationData } from "@/types/types";
import React, { useState, useEffect } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import "@/assets/quest.css";
import { useSearchParams } from "next/navigation";
import InformationMain from "@/components/information/informainMain";

export default function NoticeDetail() {
  const param = useSearchParams();
  const [noticeInfo, setNoticeInfo] = useState<InformationData>();

  const getPatchNotesPage = (page: number) => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_NOTICE}?page=${page}&page_size=10`,
      setNoticeInfo
    );
  };

  useEffect(() => {
    getPatchNotesPage(Number(param.get("id")));
  }, [param]);

  if (!noticeInfo) return null;

  return (
    <InformationMain
      information={noticeInfo}
      pageId={Number(param.get("id"))}
      link="/notice?id="
      detail_link="/notice/detail"
    />
  );
}
