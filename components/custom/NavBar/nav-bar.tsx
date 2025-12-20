"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import type { NavBarTypes } from "./nav-bar.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { headerI18N } from "@/lib/consts/i18nConsts";
import LocalSwitcher from "./locale-switcher";
import { useSession, signIn, signOut } from "next-auth/react";
import RenderNav from "./render-nav";
import { LogIn, Menu, User, X } from "lucide-react";
import LocalSwitcherM from "./locale-switcher-m";
import RenderNavM from "./render-nav-m";
import Logo from "@/assets/navi/logo";
import Link from "next/link";
import NavSearch from "./nav-search";
import Loading from "../Loading/loading";
import Notification from "./notification";
import { useWebSocket } from "@/lib/hooks/useWebSocket";
import { wsStore } from "@/store/wsStore";

export default function NavBar({ navData }: NavBarTypes) {
  const { notifications } = wsStore((state) => state);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { data: session } = useSession();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!session?.accessToken) return;

    useWebSocket(session.accessToken);
  }, [session?.accessToken]);

  if (!mounted) {
    return <Loading />;
  }
  return (
    <nav
      className={`sticky top-0 z-50 border-b ${
        theme === "dark"
          ? "bg-[#2a2d35] border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-xl font-bold text-orange-400">
              <Link href="/" aria-label="EFT Library" scroll={false}>
                <Logo width={200} height={100} />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 relative">
            {navData.main_menu_list
              .filter((item) => item.value !== "USER")
              .map((navMain) => (
                <RenderNav
                  key={`nav-main-${navMain.value}`}
                  navMain={navMain}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
              ))}

            {session && (
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu("USER")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Button
                  variant="ghost"
                  className={`cursor-pointer flex items-center space-x-1 transition-colors text-sm py-4 h-auto ${
                    theme === "dark"
                      ? "text-white hover:text-orange-400 hover:bg-transparent"
                      : "text-gray-700 hover:text-orange-500 hover:bg-transparent"
                  }`}
                >
                  <User className="w-4 h-4" />
                  {/* {notificationCount > 0 && (
                    <span className="absolute top-2 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1">
                      {notificationCount}
                    </span>
                  )} */}
                </Button>

                {/* User Dropdown */}
                {activeMenu === "USER" && (
                  <div
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-0 w-40 border rounded-md shadow-lg z-50 ${
                      theme === "dark"
                        ? "bg-[#2a2d35] border-gray-600"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="py-2">
                      <Link href={"/mypage/profile"}>
                        <Button
                          variant="ghost"
                          className={`cursor-pointer w-full text-sm transition-colors text-center justify-center h-auto py-2 ${
                            theme === "dark"
                              ? "text-gray-300 hover:text-orange-400 hover:bg-gray-700/50"
                              : "text-gray-700 hover:text-orange-500 hover:bg-gray-100"
                          }`}
                        >
                          {headerI18N.myPage[localeKey]}
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          signOut();
                        }}
                        className={`cursor-pointer w-full text-sm transition-colors text-center justify-center h-auto py-2 ${
                          theme === "dark"
                            ? "text-gray-300 hover:text-orange-400 hover:bg-gray-700/50"
                            : "text-gray-700 hover:text-orange-500 hover:bg-gray-100"
                        }`}
                      >
                        {headerI18N.logout[localeKey]}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {session && (
              <Notification
                setActiveMenu={setActiveMenu}
                activeMenu={activeMenu}
                notificationList={notifications}
              />
            )}
            {!session && (
              <Button
                variant="ghost"
                onClick={() => signIn()}
                className={`cursor-pointer flex items-center space-x-1 transition-colors text-sm py-4 h-auto ${
                  theme === "dark"
                    ? "text-white hover:text-orange-400 hover:bg-transparent"
                    : "text-gray-700 hover:text-orange-500 hover:bg-transparent"
                }`}
              >
                {headerI18N.login[localeKey]}
              </Button>
            )}
          </div>

          {/* Language Selector and Search Bar */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <Button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`cursor-pointer p-2 rounded-md transition-colors ${
                theme === "dark"
                  ? "text-gray-300 hover:text-orange-400"
                  : "text-gray-600 hover:text-orange-500"
              }`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </Button>

            {/* Language Selector */}
            <LocalSwitcher />

            {/* Search Bar */}
            <NavSearch searchList={navData.search_list} />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${
                theme === "dark"
                  ? "text-white hover:text-orange-400"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden border-t overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
      >
        <div className="py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4">
            {/* Mobile Language Selector */}
            <div className="sm:hidden mb-4">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className={`cursor-pointer w-full flex items-center justify-center px-4 py-3 rounded-lg border transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-[#36393f] border-gray-600 text-white hover:border-orange-400 hover:bg-[#40444b]"
                    : "bg-white border-gray-300 text-gray-700 hover:border-orange-500 hover:bg-gray-50"
                }`}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>

              {/* language */}
              <LocalSwitcherM />

              {/* Mobile Search */}
              <NavSearch searchList={navData.search_list} />
            </div>

            {/* Mobile Menu Items with Dropdowns */}

            {navData.main_menu_list
              .filter((item) => item.value !== "USER")
              .map((navMain) => (
                <RenderNavM
                  key={`nav-main-${navMain.value}`}
                  navMain={navMain}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
              ))}
            {session && (
              <div className="rounded-lg">
                <button
                  onClick={() =>
                    setActiveMenu(activeMenu === "USER" ? null : "USER")
                  }
                  className={`w-full text-left transition-colors py-1 flex justify-between items-center ${
                    theme === "dark" ? "text-white" : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5" />
                    <span className="text-base font-medium">사용자</span>
                  </div>
                  <span
                    className={`transform transition-transform duration-200 ${
                      activeMenu === "USER" ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Mobile User Dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeMenu === "USER"
                      ? "max-h-32 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-8 mt-1 space-y-1 pb-1">
                    <Link href={"/mypage/profile"}>
                      <Button
                        variant="ghost"
                        className={`cursor-pointer w-full text-left justify-start text-sm transition-colors py-1 h-auto ${
                          theme === "dark"
                            ? "text-gray-300 hover:text-orange-400 hover:bg-transparent"
                            : "text-gray-600 hover:text-orange-500 hover:bg-transparent"
                        }`}
                      >
                        {headerI18N.myPage[localeKey]}
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        signOut();
                      }}
                      className={`cursor-pointer w-full text-left justify-start text-sm transition-colors py-1 h-auto ${
                        theme === "dark"
                          ? "text-gray-300 hover:text-orange-400 hover:bg-transparent"
                          : "text-gray-600 hover:text-orange-500 hover:bg-transparent"
                      }`}
                    >
                      {headerI18N.logout[localeKey]}
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {!session && (
              <div>
                <button
                  onClick={() => signIn()}
                  className={`cursor-pointer w-full text-left transition-colors py-1 flex justify-between items-center ${
                    theme === "dark" ? "text-white" : "text-gray-700"
                  } ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-orange-400 hover:bg-transparent"
                      : "text-gray-600 hover:text-orange-500 hover:bg-transparent"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {<LogIn className="w-5 h-5" />}
                    <span className="text-base font-medium">
                      {headerI18N.login[localeKey]}
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
