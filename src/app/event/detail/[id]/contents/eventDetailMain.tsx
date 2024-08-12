"use client";

import API_ENDPOINTS from "@/config/endPoints";
import { fetchDataWithNone } from "@/lib/api";
import { InformationInfoDetail } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Information from "@/components/information/information";

export default function EventDetailMain() {
  const param = useParams<{ id: string }>();
  const [eventDetail, setEventDetail] = useState<InformationInfoDetail>();
  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_EVENT_BY_ID}/${param.id}`,
      setEventDetail
    );
  }, [param]);

  if (!eventDetail) return null;

  return (
    <Information
      information={eventDetail.information}
      information_group={eventDetail.information_group}
      link="/event?id=1"
      detail_link="/event/detail"
    />
  );
}
