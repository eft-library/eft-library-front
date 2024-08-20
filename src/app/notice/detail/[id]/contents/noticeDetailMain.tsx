"use client";

import API_ENDPOINTS from "@/config/endPoints";
import { fetchDataWithNone } from "@/lib/api";
import { InformationInfoDetail } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Information from "@/components/information/information";

export default function NoticeDetailMain() {
  const param = useParams<{ id: string }>();
  const [noticeDetail, setNoticeDetail] = useState<InformationInfoDetail>();
  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_NOTICE_BY_ID}/${param.id}`,
      setNoticeDetail
    );
  }, [param]);

  if (!noticeDetail) return null;

  return (
    <Information
      information={noticeDetail.information}
      information_group={noticeDetail.information_group}
      link="/notice?id=1"
      detail_link="/notice/detail"
      subTitle="공지사항"
    />
  );
}
