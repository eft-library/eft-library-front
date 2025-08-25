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
import { Menu, X } from "lucide-react";
import LocalSwitcherM from "./locale-switcher-m";
import RenderNavM from "./render-nav-m";
import Logo from "@/assets/navi/logo";
import Link from "next/link";
import NavSearch from "./nav-search";
import Loading from "../Loading/loading";

export default function NavBar({ navData }: NavBarTypes) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { data: session } = useSession();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <Loading />;
  }
  return (
    <nav className="sticky top-0 z-[9999] border-b bg-white border-gray-200 dark:bg-[#2a2d35] dark:border-gray-700">
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
          <div className="hidden md:flex items-center space-x-8 relative">
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

            {session &&
              navData.main_menu_list
                .filter((item) => item.value === "USER")
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
              <a
                href="#"
                onClick={() => signOut()}
                className="transition-colors text-sm text-gray-700 hover:text-orange-500 dark:text-white dark:hover:text-orange-400"
              >
                {headerI18N.logout[localeKey]}
              </a>
            )}

            {!session && (
              <a
                href="#"
                onClick={() => signIn()}
                className="transition-colors text-sm text-gray-700 hover:text-orange-500 dark:text-white dark:hover:text-orange-400"
              >
                {headerI18N.login[localeKey]}
              </a>
            )}
          </div>

          {/* Language Selector and Search Bar */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <Button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-md transition-colors text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </Button>

            {/* Language Selector */}
            <LocalSwitcher />

            {/* Search Bar */}
            <NavSearch searchList={navData.search_list} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-orange-500 dark:text-white dark:hover:text-orange-400"
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

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4">
            {/* Mobile Language Selector */}
            <div className="sm:hidden mb-4">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="w-full flex items-center justify-center px-4 py-3 rounded-lg border mb-4 transition-all duration-200 bg-white border-gray-300 text-gray-700 hover:border-orange-500 hover:bg-gray-50 dark:bg-[#36393f] dark:border-gray-600 dark:text-white dark:hover:border-orange-400 dark:hover:bg-[#40444b]"
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

            {session &&
              navData.main_menu_list
                .filter((item) => item.value === "USER")
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
              <a
                href="#"
                onClick={() => signOut()}
                className="transition-colors text-sm text-gray-700 hover:text-orange-500 dark:text-white dark:hover:text-orange-400"
              >
                {headerI18N.logout[localeKey]}
              </a>
            )}

            {!session && (
              <a
                href="#"
                onClick={() => signIn()}
                className="transition-colors text-sm text-gray-700 hover:text-orange-500 dark:text-white dark:hover:text-orange-400"
              >
                {headerI18N.login[localeKey]}
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
