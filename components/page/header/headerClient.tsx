"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DeafultMenu from "./contents/defaultMenu";
import Link from "next/link";
import { useAppStore } from "@/store/provider";
import { useSession, signIn } from "next-auth/react";
import UserMenu from "./contents/userMenu";
import LocalSwitcher from "@/components/custom/localeSwitcher/localSwitcher";
import type { Menu } from "./contents/headerTypes";
import Logo from "@/assets/navi/logo";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { headerI18N } from "@/lib/consts/i18nConsts";

export default function HeaderClient({ headerData }: { headerData: Menu[] }) {
  const { setNpcId } = useAppStore((state) => state);
  const { data: session } = useSession();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const setQuest = (parent: string, value: string) => {
    if (parent === "QUEST") {
      setNpcId(value);
    }
  };

  const onChangeMenu = (menu: string | null) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="fixed w-full z-20 bg-Background">
      <div className="flex justify-center items-center h-16">
        <div className="flex items-center space-x-6 gap-6">
          <Link href="/" aria-label="EFT Library">
            <Logo width={400} height={200} />
          </Link>
          <div className="flex items-center space-x-2">
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
                {headerI18N.login[localeKey]}
              </Button>
            )}
            <LocalSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
