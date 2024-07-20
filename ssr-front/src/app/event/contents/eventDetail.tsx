"use client";

import type { Quest, Event } from "@/types/types";
import React, { useState, useEffect } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import "@/assets/quest.css";
import { formatISODate } from "@/lib/formatISODate";

export default function EventDetail() {
  const [eventList, setEventList] = useState<Event[]>();

  useEffect(() => {
    fetchDataWithNone(`${API_ENDPOINTS.GET_ALL_EVENT}`, setEventList);
  }, []);

  if (!eventList) return null;

  return (
    <Box w={"95%"}>
      {eventList.map((event) => (
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
    </Box>
  );
}
