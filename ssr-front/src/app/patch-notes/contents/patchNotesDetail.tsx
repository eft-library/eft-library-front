"use client";

import type { PatchNotesInfo } from "@/types/types";
import React, { useState, useEffect } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import "@/assets/quest.css";
import { formatISODate } from "@/lib/formatISODate";
import Pagination from "@/components/pagination/pagination";
import { useAppStore } from "@/store/provider";

export default function PatchNotesDetail() {
  const { patchNotesNum, setPatchNotesNum } = useAppStore((state) => state);
  const [patchNotesInfo, setPatchNotesInfo] = useState<PatchNotesInfo>();

  const getPatchNotesPage = (page: number) => {
    setPatchNotesNum(page);
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_PATCH_NOTES}?page=${page}&page_size=10`,
      setPatchNotesInfo
    );
  };

  useEffect(() => {
    getPatchNotesPage(patchNotesNum);
  }, []);

  if (!patchNotesInfo) return null;

  return (
    <Box w={"95%"}>
      {patchNotesInfo.data.map((notes) => (
        <Box
          borderRadius={"lg"}
          key={notes.id}
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
              {notes.name_kr}&nbsp;({formatISODate(notes.update_time)})
            </Text>
          </Box>
          <Box p={2}>
            {notes.patch_notes_kr.map((guide, index) => (
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
        total={patchNotesInfo.max_pages}
        onPageChange={getPatchNotesPage}
        currentPage={patchNotesNum}
      />
    </Box>
  );
}
