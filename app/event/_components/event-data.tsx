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

export default function EventData() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [eventData, setEventData] = useState<InformationData>();
  const param = useSearchParams();

  useEffect(() => {
    const getEventPage = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_INFORMATION_LIST}?page=${Number(
          param.get("id"),
        )}&page_size=10&info_type=EVENT`,
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch event data:",
          data?.msg || "Unknown error",
        );
        return null;
      }
      setEventData(data.data);
    };

    if (param.get("id")) {
      getEventPage();
    }
  }, [param]);

  if (!eventData) return <Loading />;

  return (
    <Information
      informationData={eventData}
      routeLink="/event"
      title={information18N.event.title[localeKey]}
    />
  );
}
