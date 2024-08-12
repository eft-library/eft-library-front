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
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PatchNotesDetail() {
  const param = useSearchParams();
  const [patchNotesInfo, setPatchNotesInfo] = useState<PatchNotesInfo>();

  const getPatchNotesPage = (page: number) => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_PATCH_NOTES}?page=${page}&page_size=10`,
      setPatchNotesInfo
    );
  };

  useEffect(() => {
    getPatchNotesPage(Number(param.get("id")));
  }, [param]);

  if (!patchNotesInfo) return null;

  return (
    <Box w={"95%"}>
      {patchNotesInfo.data.map((notes) => (
        <Link href={`/patch-notes/detail/${notes.id}`} key={notes.id}>
          <Box
            borderRadius={"lg"}
            display={"flex"}
            flexDirection={"column"}
            border={"1px solid"}
            borderColor={ALL_COLOR.WHITE}
            mb={4}
            _hover={{ color: ALL_COLOR.DARK_GRAY }}
          >
            <Box
              mt={2}
              p={4}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text fontWeight={800} fontSize={"xl"}>
                {notes.name_kr}
              </Text>
              <Text fontWeight={600}>{formatISODate(notes.update_time)}</Text>
            </Box>
            <Box mt={2} p={4}>
              <Text fontWeight={800} isTruncated>
                {notes.patch_notes_kr}
              </Text>
            </Box>
          </Box>
        </Link>
      ))}
      <Pagination
        total={patchNotesInfo.max_pages}
        routeLink={"/patch-notes?id="}
        currentPage={Number(param.get("id"))}
      />
    </Box>
  );
}
