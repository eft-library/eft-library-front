"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { useEffect, useState } from "react";
import type { BoardType, BoardHeader } from "@/types/types";
import Link from "next/link";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useSession } from "next-auth/react";
import { MdOutlineStar, MdStickyNote2 } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export default function BoardHeader({ siteParam }: BoardHeader) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [typeList, setTypeList] = useState<BoardType[]>();

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_BOARD_TYPE, setTypeList);
  }, []);

  const checkRecent = () => {
    if (pathname === "/board" || pathname === `/board/issue`) {
      return `/board?id=1`;
    } else {
      return `/board/${siteParam}?id=1`;
    }
  };

  const checkIssue = () => {
    if (pathname === "/board") {
      return `/board/issue?id=1`;
    } else if (pathname === `/board/issue`) {
      return `/board/issue?id=1`;
    } else {
      return `/board/${siteParam}/issue?id=1`;
    }
  };

  const returnTypeKr = () => {
    const filterType = typeList.find(
      (boardType) => boardType.value === siteParam
    );

    if (filterType) {
      return filterType.name_kr;
    } else {
      ("");
    }
  };

  if (!typeList) return null;

  return (
    <Flex
      direction="column"
      border="1px solid white"
      p={3}
      borderRadius="10px"
      mb={5}
    >
      <Flex mb={2}>
        <Flex>
          <Link href={`/board?id=1`}>
            <Box mx={2} _hover={{ color: ALL_COLOR.BEIGE }}>
              <Text fontWeight={600}>전체</Text>
            </Box>
          </Link>
          {typeList.map((type) => (
            <Link key={type.id} href={`/board/${type.value}?id=1`}>
              <Box mx={2} _hover={{ color: ALL_COLOR.BEIGE }}>
                <Text fontWeight={600}>{type.name_kr}</Text>
              </Box>
            </Link>
          ))}
        </Flex>
      </Flex>
      {siteParam !== "notice" && (
        <Flex justify="space-between" mt={2}>
          <Flex>
            <Link href={checkRecent()}>
              <Flex mx={2} align="center" _hover={{ color: ALL_COLOR.BEIGE }}>
                <MdStickyNote2 />
                &nbsp;
                <Text fontWeight={600}>{returnTypeKr()} 최신글</Text>
              </Flex>
            </Link>
            <Link href={checkIssue()}>
              <Flex mx={2} align="center" _hover={{ color: ALL_COLOR.BEIGE }}>
                <MdOutlineStar />
                &nbsp;
                <Text fontWeight={600}>{returnTypeKr()} 인기글</Text>
              </Flex>
            </Link>
          </Flex>
          {session && (
            <Link href={"/board/write"}>
              <Flex mx={2} align="center">
                <FaPencil />
                &nbsp;
                <Text fontWeight={600}>글쓰기</Text>
              </Flex>
            </Link>
          )}
        </Flex>
      )}
    </Flex>
  );
}
