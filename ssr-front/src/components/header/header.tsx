"use client";

import { VStack, Button, Grid, GridItem, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import API_ENDPOINTS from "@/config/endPoints";
import { fetchDataWithNone } from "@/lib/api";
import TopNaviLogo from "@/assets/navi/topNaviLogo";
import HeaderSkeleton from "./headerSkeleton";
import type { Menu } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useAppStore } from "@/store/provider";
import Login from "../login/login";

export default function Header() {
  const { setNpcId } = useAppStore((state) => state);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState<Menu[]>(); // 초기 상태를 빈 배열로 설정

  const changeMenu = (menuName: string) => {
    setSelectedMenu(menuName);
  };

  const setQuest = (parent: string, value: string) => {
    if (parent === "QUEST") {
      setNpcId(value);
    }
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
      <GridItem
        colSpan={1}
        h="14"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Link href={"/"}>
          <TopNaviLogo />
        </Link>
      </GridItem>
      <GridItem
        colStart={3}
        colEnd={6}
        h="14"
        textAlign={"center"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {headerData.length > 0 &&
          headerData.map((main) => (
            <Button
              key={main.value}
              onMouseEnter={() => changeMenu(main.value)}
              variant="solid"
              fontWeight="bold"
              bg="transparent"
              _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
              color={ALL_COLOR.WHITE}
              p="4"
              boxShadow="none"
              backdropFilter="blur(8px)"
              backdropContrast="60%"
              cursor={"default"}
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
                  bg={ALL_COLOR.MAP_BLACK}
                  borderRadius={"lg"}
                >
                  {main.sub_menus.map((sub) => (
                    <Box
                      p={2}
                      key={sub.value}
                      _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
                      borderRadius={"lg"}
                    >
                      <Link
                        onClick={() => setQuest(sub.parent_value, sub.value)}
                        href={sub.link}
                      >
                        {sub.kr_name}
                      </Link>
                    </Box>
                  ))}
                </VStack>
              )}
            </Button>
          ))}
        {/* <Login />
        <Button>
          <Link href={"/user/quest"}>내 퀘스트</Link>
        </Button> */}
      </GridItem>
    </Grid>
  );
}
