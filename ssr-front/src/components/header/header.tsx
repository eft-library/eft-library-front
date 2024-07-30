"use client";

import { VStack, Button, Grid, GridItem, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import API_ENDPOINTS from "@/config/endPoints";
import { fetchDataWithNone, fetchUserData } from "@/lib/api";
import TopNaviLogo from "@/assets/navi/topNaviLogo";
import HeaderSkeleton from "./headerSkeleton";
import type { Menu, UserInfo } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useAppStore } from "@/store/provider";
import { useSession, signIn, signOut } from "next-auth/react";
import USER_API_ENDPOINTS from "@/config/userEndPoints";

export default function Header() {
  const { setNpcId } = useAppStore((state) => state);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState<Menu[]>(); // 초기 상태를 빈 배열로 설정
  const { data: session } = useSession();

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

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetchUserData(
        USER_API_ENDPOINTS.GET_USER_INFO,
        "POST",
        {},
        session
      );
      if (response.status === 200) {
        setUserInfo(response.data);
      }
    };
    if (session && session.accessToken) {
      getUserInfo();
    }
  }, [session]);

  if (!headerData) return <HeaderSkeleton />;

  if (session && !userInfo) return <HeaderSkeleton />;

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
        <Link href={"/"} aria-label="EFT Library">
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
                    <Link
                      key={sub.value}
                      onClick={() => setQuest(sub.parent_value, sub.value)}
                      href={sub.link}
                    >
                      <Box
                        p={2}
                        _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
                        borderRadius={"lg"}
                      >
                        {sub.kr_name}
                      </Box>
                    </Link>
                  ))}
                </VStack>
              )}
            </Button>
          ))}
        {session && userInfo ? (
          <Button
            variant="solid"
            fontWeight="bold"
            bg="transparent"
            _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
            color={ALL_COLOR.WHITE}
            p="4"
            boxShadow="none"
            backdropFilter="blur(8px)"
            backdropContrast="60%"
            onMouseEnter={() => changeMenu("user")}
            cursor={"default"}
          >
            {userInfo.nick_name}
            {selectedMenu === "user" && (
              <VStack
                align="stretch"
                p={4}
                position="absolute"
                top="50px"
                onMouseEnter={() => setSelectedMenu("user")}
                onMouseLeave={() => setSelectedMenu(null)}
                bg={ALL_COLOR.MAP_BLACK}
                borderRadius={"lg"}
              >
                <Box
                  p={2}
                  onClick={() => signOut()}
                  _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
                  borderRadius={"lg"}
                >
                  로그아웃
                </Box>
                <Link href={"/user/quest"}>
                  <Box
                    p={2}
                    _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
                    borderRadius={"lg"}
                  >
                    내 퀘스트
                  </Box>
                </Link>
                <Link href={"/user/profile"}>
                  <Box
                    p={2}
                    _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
                    borderRadius={"lg"}
                  >
                    마이 페이지
                  </Box>
                </Link>
              </VStack>
            )}
          </Button>
        ) : (
          <Button
            variant="solid"
            fontWeight="bold"
            bg="transparent"
            _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
            color={ALL_COLOR.WHITE}
            p="4"
            boxShadow="none"
            backdropFilter="blur(8px)"
            backdropContrast="60%"
            onClick={() => signIn()}
          >
            로그인
          </Button>
        )}
      </GridItem>
    </Grid>
  );
}
