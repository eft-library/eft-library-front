"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NoticeDetailClient from "@/components/custom/noticeDetail/data/noticeDetailClient";

interface InformationInfoDetail {
  information_group: InformationInfo[];
  information: InformationInfo;
}
interface InformationInfo {
  id: string;
  name_en: string[];
  name_kr: string[];
  notes_en: string;
  notes_kr: string;
  update_time: string;
}

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

  return <NoticeDetailClient noticeInfo={noticeInfo} />;
}
