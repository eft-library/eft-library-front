"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import type { InformationData } from "@/components/custom/information/information.types";
import Information from "@/components/custom/information/informaition";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { information18N } from "@/lib/consts/i18nConsts";
import Loading from "@/components/custom/Loading/loading";

export default function NoticeData() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [noticeData, setNoticeData] = useState<InformationData>();
  const param = useSearchParams();

  useEffect(() => {
    const getNoticePage = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_INFORMATION_LIST}?page=${Number(
          param.get("id"),
        )}&page_size=10&info_type=NOTICE`,
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch notice data:",
          data?.msg || "Unknown error",
        );
        return null;
      }
      setNoticeData(data.data);
    };

    if (param.get("id")) {
      getNoticePage();
    }
  }, [param]);

  if (!noticeData) return <Loading />;

  return (
    <Information
      informationData={noticeData}
      routeLink="/notice"
      title={information18N.notice.title[localeKey]}
    />
  );
}
