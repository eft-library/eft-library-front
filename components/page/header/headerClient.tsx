"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DeafultMenu from "./contents/defaultMenu";
import Link from "next/link";
import { useAppStore } from "@/store/provider";
import { useSession, signIn } from "next-auth/react";
import TopNaviLogo from "@/assets/navi/topNaviLogo";
import UserMenu from "./contents/userMenu";
import LocalSwitcher from "@/components/custom/localeSwitcher/localSwitcher";
import type { Menu } from "./contents/headerTypes";

export default function HeaderClient({ headerData }: { headerData: Menu[] }) {
  const { setNpcId } = useAppStore((state) => state);
  const { data: session } = useSession();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const setQuest = (parent: string, value: string) => {
    if (parent === "QUEST") {
      setNpcId(value);
    }
  };

  const onChangeMenu = (menu: string | null) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="fixed w-full z-20 bg-transparent backdrop-blur-md backdrop-contrast-60">
      <div className="grid grid-cols-4 h-14">
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
              className="px-4 py-2 font-bold text-white bg-transparent mx-1 text-base hover:bg-NeutralGray focus:outline-none backdrop-blur-md backdrop-contrast-60"
              onClick={() => signIn()}
            >
              로그인
            </Button>
          )}
        </div>
        <div className="flex items-center">
          <LocalSwitcher />
        </div>
      </div>
    </div>
  );
}
