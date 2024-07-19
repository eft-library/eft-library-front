"use client";

import type { Quest } from "@/types/types";
import React, { useState, useEffect } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import "@/assets/quest.css";
import { formatISODate } from "@/lib/formatISODate";

export default function EventDetail() {
  const [questList, setQuestList] = useState<Quest[]>();

  useEffect(() => {
    fetchDataWithNone(`${API_ENDPOINTS.GET_ALL_EVENT}`, setQuestList);
  }, []);

  if (!questList) return null;

  return (
    <Box w={"95%"}>
      {questList.map((quest) => (
        <React.Fragment key={quest.id}>
          {quest.event_sub.map((events, index) => (
            <Box
              borderRadius={"lg"}
              key={index}
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
                  {quest.title_en}&nbsp;({formatISODate(quest.update_time)})
                </Text>
              </Box>
              <Box p={2}>
                {events.event_text_kr.map((guide, index) => (
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
        </React.Fragment>
      ))}
    </Box>
  );
}
