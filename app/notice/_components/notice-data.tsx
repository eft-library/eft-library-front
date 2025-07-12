"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import type { InformationData } from "@/components/custom/information/information.types";
import Information from "@/components/custom/informaition";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { information18N } from "@/lib/consts/i18nConsts";

export default function NoticeData() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [noticeData, setNoticeData] = useState<InformationData>();
  const param = useSearchParams();

  useEffect(() => {
    const getNoticePage = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_NOTICE}?page=${Number(
          param.get("id")
        )}&page_size=10`
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch notice data:",
          data?.msg || "Unknown error"
        );
        return null;
      }
      setNoticeData(data.data);
    };

    if (param.get("id")) {
      getNoticePage();
    }
  }, [param]);

  if (!noticeData) return null;

  return (
    <Information
      informationData={noticeData}
      routeLink="/notice"
      title={information18N.notice.title[localeKey]}
      badgeColor="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    />
  );
}
