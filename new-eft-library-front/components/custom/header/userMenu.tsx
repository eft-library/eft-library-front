"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ExitDialog from "./exitDialog";

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

interface MenuButton {
  menuData: Menu;
  selectedMenu: string | null;
  setSelectedMenu: (menu: string | null) => void;
}

export default function UserMenu({
  menuData,
  selectedMenu,
  setSelectedMenu,
}: MenuButton) {
  const { data: session } = useSession();

  return (
    <div
      className="relative group"
      onMouseEnter={() => setSelectedMenu(menuData.value)}
    >
      <Button className="px-4 py-2 font-bold text-white bg-transparent mx-1 text-base hover:bg-lightGray focus:outline-none backdrop-blur-md backdrop-contrast-60">
        {session?.email ? session.email.split("@")[0] : "뉴비"}
      </Button>
      {selectedMenu === menuData.value && (
        <div
          className="absolute top-12 left-[-30px] z-40 flex flex-col font-semibold justify-center items-center p-4 bg-mapBlack rounded-lg shadow-lg min-w-[140px]"
          onMouseEnter={() => setSelectedMenu(menuData.value)}
          onMouseLeave={() => setSelectedMenu(null)}
        >
          <Button
            onClick={() => signOut()}
            className="px-4 py-2 font-bold text-white bg-transparent mx-1 text-base hover:bg-lightGray focus:outline-none backdrop-blur-md backdrop-contrast-60"
          >
            로그아웃
          </Button>
          {menuData.sub_menus.map((sub) =>
            sub.value === "USER_DELETE" ? (
              <ExitDialog key={sub.value} />
            ) : (
              <Link key={sub.value} href={sub.link}>
                <Button className="px-4 py-2 font-bold text-white bg-transparent mx-1 text-base hover:bg-lightGray focus:outline-none backdrop-blur-md backdrop-contrast-60">
                  {sub.kr_name}
                </Button>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}
