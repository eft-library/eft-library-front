"use client";

import type { EventInfo } from "@/types/types";
import React, { useState, useEffect } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import "@/assets/quest.css";
import { formatISODate } from "@/lib/formatISODate";
import Pagination from "@/components/pagination/pagination";
import { useSearchParams } from "next/navigation";

export default function EventDetail() {
  const param = useSearchParams();
  const [eventInfo, setEventInfo] = useState<EventInfo>();

  const getEventPage = (page: number) => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_EVENT}?page=${page}&page_size=10`,
      setEventInfo
    );
  };

  useEffect(() => {
    getEventPage(Number(param.get("id")));
  }, []);

  if (!eventInfo) return null;

  return (
    <Box w={"95%"}>
      {eventInfo.data.map((event) => (
        <Box
          borderRadius={"lg"}
          key={event.id}
          display={"flex"}
          flexDirection={"column"}
          border={"1px solid"}
          borderColor={ALL_COLOR.WHITE}
          mb={4}
        >
          <Box
            mt={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text fontWeight={800}>
              {event.name_kr}&nbsp;({formatISODate(event.update_time)})
            </Text>
          </Box>
          <Box p={2}>
            {event.event_text_kr.map((guide, index) => (
              <Text
                key={index}
                mb={1}
                fontWeight={600}
                dangerouslySetInnerHTML={{
                  __html: `*&nbsp;&nbsp;${guide}`,
                }}
              />
            ))}
          </Box>
        </Box>
      ))}
      <Pagination
        total={eventInfo.max_pages}
        routeLink={"/event?id="}
        currentPage={Number(param.get("id"))}
      />
    </Box>
  );
}
