"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import Information from "../../../custom/information/information";
import type { InformationData } from "../../../custom/information/informationTypes";
import Loading from "@/components/custom/loading/loading";

export default function GetNotice() {
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

  if (!noticeData) return <Loading />;

  return <Information informationData={noticeData} routeLink="/notice" />;
}
