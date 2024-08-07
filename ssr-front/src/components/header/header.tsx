"use client";

import { Button, Grid, GridItem } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import TopNaviLogo from "@/assets/navi/topNaviLogo";
import HeaderSkeleton from "./headerSkeleton";
import { fetchDataWithNone, fetchUserData } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { useAppStore } from "@/store/provider";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { Menu, Header } from "@/types/types";
import MenuButton from "./menuButton";
import UserMenuButton from "./userMenuButton";

export default function Header() {
  const { setNpcId } = useAppStore((state) => state);
  const [userInfo, setUserInfo] = useState<Header>();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState<Menu[] | null>(null);
  const { data: session } = useSession();

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

  const changeMenu = (menuName: string) => {
    setSelectedMenu(menuName);
  };

  const setQuest = (parent: string, value: string) => {
    if (parent === "QUEST") {
      setNpcId(value);
    }
  };

  if (!headerData) return <HeaderSkeleton />;
  // if (session && !userInfo) return <HeaderSkeleton />;

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      position="fixed"
      width="100%"
      zIndex={10}
      bg="transparent"
      backdropFilter="blur(8px)"
      backdropContrast="60%"
    >
      <GridItem colSpan={1} h="14" />
      <GridItem
        colSpan={1}
        h="14"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Link href="/" aria-label="EFT Library">
          <TopNaviLogo />
        </Link>
      </GridItem>
      <GridItem
        colStart={3}
        colEnd={6}
        h="14"
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {headerData.map((main) =>
          main.value !== "USER" ? (
            <MenuButton
              key={main.value}
              main={main}
              selectedMenu={selectedMenu}
              changeMenu={changeMenu}
              setQuest={setQuest}
            />
          ) : (
            session &&
            userInfo && (
              <UserMenuButton
                key={main.value}
                main={main}
                userInfo={userInfo.user}
                selectedMenu={selectedMenu}
                changeMenu={changeMenu}
                setQuest={setQuest}
              />
            )
          )
        )}
        {!session && (
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
      {/* <Button onClick={() => signOut()}>asdasd</Button> */}
    </Grid>
  );
}
