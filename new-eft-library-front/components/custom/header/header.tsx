"use client";

import { useEffect, useState } from "react";
import { requestData, requestUserData } from "@/lib/config/api";
import { API_ENDPOINTS, USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { Button } from "@/components/ui/button";
import DeafultMenu from "./defaultMenu";
import Link from "next/link";
import { useAppStore } from "@/store/provider";
import { useSession, signIn } from "next-auth/react";
import TopNaviLogo from "@/assets/navi/topNaviLogo";

interface MenuData {
  en_name: string;
  link: string;
  order: number;
  value: string;
  kr_name: string;
  image: string | null;
}

interface SubMenu extends MenuData {
  parent_value: string;
}

interface Menu extends MenuData {
  sub_menus: SubMenu[];
}

export default function Header() {
  const { user, setNpcId, setUser } = useAppStore((state) => state);
  const { data: session } = useSession();
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [headerData, setHeaderData] = useState<Menu[] | null>(null);

  const setQuest = (parent: string, value: string) => {
    if (parent === "QUEST") {
      setNpcId(value);
    }
  };
  const fetchHeaderData = async (isMounted: boolean) => {
    try {
      const data = await requestData(API_ENDPOINTS.GET_NAVI_MENU);

      if (isMounted) {
        if (!data || data.status !== 200) {
          console.error(
            "Failed to fetch header data:",
            data?.msg || "Unknown error"
          );
        } else {
          setHeaderData(data.data);
        }
      }
    } catch (error) {
      console.error("Error while fetching header data:", error);
    }
  };

  useEffect(() => {
    let isMounted = true; // 컴포넌트 마운트 상태 확인 변수

    fetchHeaderData(isMounted);

    // 클린업 함수 => 메모리 누수 방지
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const getUserInfo = async (isMounted: boolean) => {
      try {
        const data = await requestUserData(
          USER_API_ENDPOINTS.GET_USER_INFO,
          {},
          session
        );

        if (isMounted) {
          if (!data || data.status !== 200) {
            console.error(
              "Failed to fetch user data:",
              data?.msg || "Unknown error"
            );
          } else {
            setUser(data.data);
          }
        }
      } catch (error) {
        console.error("Error while fetching header data:", error);
      }
    };

    if (session && session.accessToken) {
      getUserInfo(isMounted);
    }

    // 클린업 함수 => 메모리 누수 방지
    return () => {
      isMounted = false;
    };
  }, [session, setUser]);

  if (!headerData) return null;
  if (session && !user) return null;

  return (
    <div className="fixed w-full z-10 bg-transparent backdrop-blur-md backdrop-contrast-60">
      <div className="grid grid-cols-3 h-14">
        <div></div>
        <div className="flex justify-center items-center">
          <Link href="/" aria-label="EFT Library">
            <TopNaviLogo />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          {headerData.map((main) =>
            main.value !== "USER" ? (
              <DeafultMenu
                key={main.value}
                menuData={main}
                selectedMenu={selectedMenu}
                setSelectedMenu={() => setSelectedMenu}
                setQuest={setQuest}
              />
            ) : (
              session &&
              user && (
                <DeafultMenu
                  key={main.value}
                  menuData={main}
                  selectedMenu={selectedMenu}
                  setSelectedMenu={() => setSelectedMenu}
                  setQuest={setQuest}
                />
                // <UserMenuButton
                //   key={main.value}
                //   main={main}
                //   userInfo={user.user}
                //   selectedMenu={selectedMenu}
                //   changeMenu={changeMenu}
                //   setQuest={setQuest}
                // />
              )
            )
          )}
          {!session && (
            <Button
              variant="ghost"
              size="sm"
              className="font-bold text-white hover:bg-light-gray p-4"
              onClick={() => signIn()}
            >
              로그인
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
