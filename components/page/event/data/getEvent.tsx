"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import type { InformationData } from "../../../custom/information/informationTypes";
import Information from "../../../custom/information/information";
import Loading from "@/components/custom/loading/loading";

export default function GetEvent() {
  const [eventData, setEventData] = useState<InformationData>();
  const param = useSearchParams();

  useEffect(() => {
    const getEventPage = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_EVENT}?page=${Number(
          param.get("id")
        )}&page_size=10`
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch event data:",
          data?.msg || "Unknown error"
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

  return <Information informationData={eventData} routeLink="/event" />;
}
