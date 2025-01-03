"use client";

import { Grid, Box, Text, Image, Skeleton } from "@chakra-ui/react";
import Link from "next/link";
import { formatImage } from "@/lib/formatImage";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import type { SubMenu } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import React from "react";

export default function Info() {
  const [main, setMain] = useState<SubMenu[]>();
  const handleHover = (e: any) => {
    e.currentTarget.style.transform = "scale(1.1)"; // GridItem에 호버 효과 적용
    e.currentTarget.style.opacity = "0.8"; // GridItem에 호버 효과 적용
  };

  const handleHoverExit = (e: any) => {
    e.currentTarget.style.transform = "scale(1)"; // GridItem에 호버 효과 적용
    e.currentTarget.style.opacity = "1"; // GridItem에 호버 효과 적용
  };

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_MENU_INFO, setMain);
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(4, 1fr)"
        gap={12}
      >
        {!main
          ? Array(23)
              .fill(null)
              .map((_, index) => (
                <React.Fragment key={`main-null-info-${index}`}>
                  <Box
                    w="120px"
                    h="120px"
                    border="1px solid"
                    borderColor={ALL_COLOR.WHITE}
                    borderRadius="lg"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Skeleton height="110px" width="110px" />
                  </Box>
                </React.Fragment>
              ))
          : main.map((map: any) => (
              <Link href={map.link} key={map.value}>
                <Box
                  w="120px"
                  h="120px"
                  border="1px solid"
                  borderColor={ALL_COLOR.WHITE}
                  borderRadius="lg"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  cursor="pointer"
                  onMouseEnter={handleHover} // 호버시 효과 적용
                  onMouseLeave={handleHoverExit} // 호버 이후 효과 제거
                >
                  <Image
                    src={formatImage(map.image)}
                    alt={map.en_name}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    borderRadius="lg"
                  />
                </Box>
                <Text
                  color={ALL_COLOR.WHITE}
                  textAlign="center"
                  mt="2"
                  fontWeight={600}
                >
                  {map.kr_name}
                </Text>
              </Link>
            ))}
      </Grid>
    </Box>
  );
}
