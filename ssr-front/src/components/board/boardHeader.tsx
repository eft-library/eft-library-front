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

export default function BoardHeader({ siteParam }: BoardHeader) {
  const { data: session } = useSession();
  const [typeList, setTypeList] = useState<BoardType[]>();

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_BOARD_TYPE, setTypeList);
  }, []);

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
          {typeList.map((type) => (
            <Link key={type.id} href={`/board/${type.value}?id=1`}>
              <Box mx={2} _hover={{ color: ALL_COLOR.BEIGE }}>
                <Text fontWeight={600}>{type.name_kr}</Text>
              </Box>
            </Link>
          ))}
        </Flex>
      </Flex>
      <Flex justify="space-between" mt={2}>
        <Flex>
          <Link href={`/board/${siteParam}?id=1`}>
            <Flex mx={2} align="center" _hover={{ color: ALL_COLOR.BEIGE }}>
              <MdStickyNote2 />
              &nbsp;
              <Text fontWeight={600}>최신글</Text>
            </Flex>
          </Link>
          <Link href={`/board/${siteParam}/issue?id=1`}>
            <Flex mx={2} align="center" _hover={{ color: ALL_COLOR.BEIGE }}>
              <MdOutlineStar />
              &nbsp;
              <Text fontWeight={600}>인기글</Text>
            </Flex>
          </Link>
        </Flex>
        {session && (
          <Link href={"/board/write"}>
            <Flex mx={2} align="center">
              <Text fontWeight={600}>글쓰기</Text>
            </Flex>
          </Link>
        )}
      </Flex>
    </Flex>
  );
}
