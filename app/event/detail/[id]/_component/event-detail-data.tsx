"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { InformationInfoDetail } from "@/components/custom/information/information.types";
import { information18N } from "@/lib/consts/i18nConsts";
import InformationDetail from "@/components/custom/information/information-detail";

export default function EventDetailData() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [eventInfo, setEventInfo] = useState<InformationInfoDetail>();
  const param = useParams<{ id: string }>();

  useEffect(() => {
    const getEventById = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_EVENT_BY_ID}/${param.id}`
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch event data:",
          data?.msg || "Unknown error"
        );
        return null;
      }

      setEventInfo(data.data);
    };

    if (param.id) {
      getEventById();
    }
  }, [param.id]);

  if (!eventInfo) return null;

  return (
    <InformationDetail
      informationInfo={eventInfo}
      routeLink="/event"
      title={information18N.event.title[localeKey]}
    />
  );
}
