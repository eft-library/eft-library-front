"use client";

import { Grid, GridItem, Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import Link from "next/link";
import { formatImage } from "@/lib/formatImage";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";

export default function Info() {
  const [main, setMain] = useState([]);
  const handleHover = (e: any) => {
    e.target.style.transform = "scale(1.1)"; // 이미지 확대
    e.target.style.opacity = "0.8"; // 이미지 불투명도 변경
  };

  const handleHoverExit = (e: any) => {
    e.target.style.transform = "scale(1)"; // 이미지 축소
    e.target.style.opacity = "1"; // 이미지 불투명도 원래대로
  };

  useEffect(() => {
    fetchDataWithNone("/api/menu/info", setMain);
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(4, 1fr)"
        gap={12}
      >
        {main.map((map: any, index: number) => (
          <Link href={map.link} key={index}>
            <GridItem
              w="120px"
              h="120px"
              border="1px solid"
              borderColor={ALL_COLOR.WHITE}
              borderRadius={"lg"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor={"pointer"}
              backgroundImage={`url(${formatImage(map.image)})`}
              backgroundSize={"cover"}
              backgroundPosition={"center"}
              onMouseEnter={handleHover} // 호버시 효과 적용
              onMouseLeave={handleHoverExit} // 호버 이후 효과 제거
            />
            <Text color={ALL_COLOR.WHITE} textAlign={"center"} mt={"2"}>
              {map.kr_name}
            </Text>
          </Link>
        ))}
      </Grid>
    </Box>
  );
}
