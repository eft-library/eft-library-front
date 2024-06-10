"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import {
  VStack,
  Button,
  Grid,
  GridItem,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import API_ENDPOINTS from "@/config/endPoints";
import { fetchDataWithNone } from "@/lib/api";
import TopNaviLogi from "@/assets/topNaviLogo";
import HeaderSkeleton from "./headerSkeleton";
import type { Menu } from "@/types/types";

export default function Header() {
  const bgColor = useColorModeValue(ALL_COLOR.BACKGROUND, ALL_COLOR.WHITE);
  const subColor = useColorModeValue(ALL_COLOR.WHITE, ALL_COLOR.MAP_BLACK);
  const hoverColor = useColorModeValue(
    ALL_COLOR.DARK_GRAY,
    ALL_COLOR.LIGHT_GRAY
  );
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState<Menu[]>(); // 초기 상태를 빈 배열로 설정

  const changeMenu = (menuName: string) => {
    setSelectedMenu(menuName);
  };

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_NAVI_MENU, setHeaderData);
  }, []);

  if (!headerData) return <HeaderSkeleton />;

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      position={"fixed"}
      width={"100%"}
      zIndex={10}
      bg={"transparent"}
      backdropFilter={"blur(8px)"}
      backdropContrast={"60%"}
    >
      <GridItem colSpan={1} h="14" />
      <GridItem colSpan={1} h="14" display={"flex"} justifyContent={"center"}>
        <Link href={"/"}>
          <TopNaviLogi color={bgColor} />
        </Link>
      </GridItem>
      <GridItem colStart={3} colEnd={6} h="14" textAlign={"center"}>
        {headerData.length > 0 &&
          headerData.map((main, index) => (
            <Button
              key={index}
              onMouseEnter={() => changeMenu(main.value)}
              variant="solid"
              fontWeight="bold"
              bg="transparent"
              _hover={{ bg: hoverColor }}
              color={bgColor}
              p="4"
              boxShadow="none"
              backdropFilter="blur(8px)"
              backdropContrast="60%"
            >
              {main.kr_name}
              {selectedMenu === main.value && (
                <VStack
                  align="stretch"
                  p={4}
                  position="absolute"
                  top="50px"
                  onMouseEnter={() => setSelectedMenu(main.value)}
                  onMouseLeave={() => setSelectedMenu(null)}
                  bg={subColor}
                >
                  {main.sub_menus.map((sub, sub_index) => (
                    <Box p={2} key={sub_index} _hover={{ bg: hoverColor }}>
                      <Link href={sub.link}>{sub.kr_name}</Link>
                    </Box>
                  ))}
                </VStack>
              )}
            </Button>
          ))}
      </GridItem>
    </Grid>
  );
}
