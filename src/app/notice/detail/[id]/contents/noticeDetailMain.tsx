"use client";

import API_ENDPOINTS from "@/config/endPoints";
import { fetchDataWithNone } from "@/lib/api";
import { NoticeDetail } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NoticeContents from "./noticeContents";

export default function NoticeDetailMain() {
  const param = useParams<{ id: string }>();
  const [noticeDetail, setNoticeDetail] = useState<NoticeDetail>();
  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_NOTICE_BY_ID}/${param.id}`,
      setNoticeDetail
    );
  }, [param]);

  if (!noticeDetail) return null;

  return (
    <NoticeContents
      notice={noticeDetail.notice}
      notice_group={noticeDetail.notice_group}
    />
  );
}
