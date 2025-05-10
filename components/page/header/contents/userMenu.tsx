"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ExitDialog from "./exitDialog";
import type { MenuButton } from "./headerTypes";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { headerI18N } from "@/lib/consts/i18nConsts";

export default function UserMenu({
  menuData,
  selectedMenu,
  setSelectedMenu,
}: MenuButton) {
  const { data: session } = useSession();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setSelectedMenu(menuData.value)}
    >
      <Button className="px-4 py-2 font-bold text-white bg-transparent mx-1 text-base hover:bg-NeutralGray focus:outline-none backdrop-blur-md backdrop-contrast-60">
        {session?.email ? session.email.split("@")[0] : "뉴비"}
      </Button>
      {selectedMenu === menuData.value && (
        <div
          className="absolute top-12 left-[-30px] z-40 flex flex-col font-semibold justify-center items-center p-4 bg-Background rounded-lg shadow-lg min-w-[150px] border-white border-2"
          onMouseEnter={() => setSelectedMenu(menuData.value)}
          onMouseLeave={() => setSelectedMenu(null)}
        >
          <Button
            onClick={() => signOut()}
            className="px-4 py-2 font-bold text-white bg-transparent mx-1 text-base hover:bg-NeutralGray focus:outline-none backdrop-blur-md backdrop-contrast-60"
          >
            {headerI18N.logout[localeKey]}
          </Button>
          {menuData.sub_menus.map((sub) =>
            sub.value === "USER_DELETE" ? (
              <ExitDialog key={sub.value} />
            ) : (
              <Link key={sub.value} href={sub.link}>
                <Button className="px-4 py-2 font-bold text-white bg-transparent mx-1 text-base hover:bg-NeutralGray focus:outline-none backdrop-blur-md backdrop-contrast-60">
                  {sub.name[localeKey]}
                </Button>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}
