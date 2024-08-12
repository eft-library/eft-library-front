"use client";

import type { NoticeInfo } from "@/types/types";
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

export default function NoticeDetail() {
  const param = useSearchParams();
  const [noticeInfo, setNoticeInfo] = useState<NoticeInfo>();

  const getPatchNotesPage = (page: number) => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_NOTICE}?page=${page}&page_size=10`,
      setNoticeInfo
    );
  };

  useEffect(() => {
    getPatchNotesPage(Number(param.get("id")));
  }, [param]);

  if (!noticeInfo) return null;

  return (
    <Box w={"95%"}>
      {noticeInfo.data.map((notes) => (
        <Link href={`/notice/detail/${notes.id}`} key={notes.id}>
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
                {notes.notice_kr}
              </Text>
            </Box>
          </Box>
        </Link>
      ))}
      <Pagination
        total={noticeInfo.max_pages}
        routeLink={"/notice?id="}
        currentPage={Number(param.get("id"))}
      />
    </Box>
  );
}
