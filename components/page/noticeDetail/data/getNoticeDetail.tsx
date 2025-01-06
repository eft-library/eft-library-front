"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { InformationInfoDetail } from "../../../custom/informationDetail/informationDetailTypes";
import InformationDetailClient from "../../../custom/informationDetail/informationDetail";

export default function GetNoticeDetail() {
  const [noticeInfo, setNoticeInfo] = useState<InformationInfoDetail>();
  const param = useParams<{ id: string }>();

  useEffect(() => {
    const getNoticeById = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_NOTICE_BY_ID}/${param.id}`
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch notice data:",
          data?.msg || "Unknown error"
        );
        return null;
      }

      setNoticeInfo(data.data);
    };

    if (param.id) {
      getNoticeById();
    }
  }, [param.id]);

  if (!noticeInfo) return null;

  return (
    <InformationDetailClient informationInfo={noticeInfo} routeLink="/notice" />
  );
}
