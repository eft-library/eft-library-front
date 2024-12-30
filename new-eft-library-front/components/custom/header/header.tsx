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
import UserMenu from "./userMenu";
import { useIsMounted } from "@/lib/hooks/useIsMounted";

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
  const { setNpcId } = useAppStore((state) => state);
  const { data: session } = useSession();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState<Menu[] | null>(null);
  const isMounted = useIsMounted();

  const setQuest = (parent: string, value: string) => {
    if (parent === "QUEST") {
      setNpcId(value);
    }
  };

  const onChangeMenu = (menu: string | null) => {
    setSelectedMenu(menu);
  };
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const data = await requestData(API_ENDPOINTS.GET_NAVI_MENU);

        if (isMounted()) {
          // isMounted가 true일 때만 상태 업데이트
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

    fetchHeaderData();
  }, [isMounted]);

  useEffect(() => {
    if (!session?.accessToken) return; // 세션이 없으면 데이터 요청 안함

    const getUserInfo = async () => {
      try {
        const data = await requestUserData(
          USER_API_ENDPOINTS.GET_USER_INFO,
          {},
          session
        );

        if (isMounted()) {
          // isMounted가 true일 때만 상태 업데이트
          if (!data || data.status !== 200) {
            console.error(
              "Failed to fetch user data:",
              data?.msg || "Unknown error"
            );
          } else {
            // setUser(data.data);
          }
        }
      } catch (error) {
        console.error("Error while fetching user data:", error);
      }
    };

    getUserInfo();
  }, [isMounted, session]);

  if (!headerData) return null;

  return (
    <div className="fixed w-full z-10 bg-transparent backdrop-blur-md backdrop-contrast-60">
      <div className="grid grid-cols-3 h-14">
        <div />
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
                setSelectedMenu={onChangeMenu}
                setQuest={setQuest}
              />
            ) : (
              session && (
                <UserMenu
                  key={main.value}
                  menuData={main}
                  selectedMenu={selectedMenu}
                  setSelectedMenu={onChangeMenu}
                />
              )
            )
          )}
          {!session && (
            <Button
              className="px-4 py-2 font-bold text-white bg-transparent mx-1 text-base hover:bg-lightGray focus:outline-none backdrop-blur-md backdrop-contrast-60"
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
