"use client";

import { VStack, Button, Grid, GridItem, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import API_ENDPOINTS from "@/config/endPoints";
import { fetchDataWithNone } from "@/lib/api";
import TopNaviLogi from "@/assets/topNaviLogo";
import HeaderSkeleton from "./headerSkeleton";
import type { Menu } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function Header() {
  const { backWhite, whiteMapBlack, darkLightgray } = useColorValue();
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
          <TopNaviLogi color={backWhite} />
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
              _hover={{ bg: darkLightgray }}
              color={backWhite}
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
                  bg={whiteMapBlack}
                >
                  {main.sub_menus.map((sub, sub_index) => (
                    <Box p={2} key={sub_index} _hover={{ bg: darkLightgray }}>
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
