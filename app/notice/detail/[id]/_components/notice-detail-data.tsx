"use client";

import InformationDetail from "@/components/custom/information/information-detail";
import { InformationInfoDetail } from "@/components/custom/information/information.types";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { information18N } from "@/lib/consts/i18nConsts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function NoticeDetailData() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
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
    <InformationDetail
      informationInfo={noticeInfo}
      routeLink="/notice"
      title={information18N.notice.title[localeKey]}
    />
  );
}
