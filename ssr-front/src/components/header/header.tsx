"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import { VStack, Button, Grid, GridItem, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import TopNaviLogi from "@/assets/topNaviLogo";

interface SubMenu {
  parent_value: string;
  en_name: string;
  order: number;
  update_time: string;
  kr_name: string;
  value: string;
  link: string;
  image: string;
}

interface Menu {
  en_name: string;
  link: string | null;
  order: number;
  update_time: string;
  value: string;
  kr_name: string;
  image: string | null;
  sub_menus: SubMenu[];
}

export default function Header() {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState<Menu[]>([]); // 초기 상태를 빈 배열로 설정

  const changeMenu = (menuName: string) => {
    setSelectedMenu(menuName);
  };

  useEffect(() => {
    fetchDataWithNone("/api/menu/navi", setHeaderData);
  }, []);

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
          <TopNaviLogi />
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
              _hover={{ bg: ALL_COLOR.DARK_GRAY }}
              color={ALL_COLOR.WHITE}
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
                  bg={ALL_COLOR.MAP_BLACK}
                >
                  {main.sub_menus.map((sub, sub_index) => (
                    <Box p={2} key={sub_index} _hover={{ bg: ALL_COLOR.GRAY }}>
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
