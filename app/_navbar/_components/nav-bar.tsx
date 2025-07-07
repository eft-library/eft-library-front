"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
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

export default function NavBar({ navData }: NavBarTypes) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { data: session } = useSession();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

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
              <Link href="/" aria-label="EFT Library">
                <Logo width={200} height={100} />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 relative">
            {navData
              .filter((item) => item.value !== "USER")
              .map((navMain) => (
                <RenderNav
                  key={`nav-main-${navMain.value}`}
                  navMain={navMain}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                />
              ))}

            {session &&
              navData
                .filter((item) => item.value === "USER")
                .map((navMain) => (
                  <RenderNav
                    key={`nav-main-${navMain.value}`}
                    navMain={navMain}
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                ))}

            {session && (
              <a
                href="#"
                onClick={() => signOut()}
                className={`transition-colors text-sm ${
                  theme === "dark"
                    ? "text-white hover:text-orange-400"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {headerI18N.logout[localeKey]}
              </a>
            )}

            {!session && (
              <a
                href="#"
                onClick={() => signIn()}
                className={`transition-colors text-sm ${
                  theme === "dark"
                    ? "text-white hover:text-orange-400"
                    : "text-gray-700 hover:text-orange-500"
                }`}
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
              className={`p-2 rounded-md transition-colors ${
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
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="검색..."
                className={`w-64 pl-10 h-9 focus:ring-orange-400 ${
                  theme === "dark"
                    ? "bg-[#36393f] border-[#36393f] text-white placeholder-gray-400 focus:border-orange-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500"
                }`}
              />
            </div> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
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

      {isMobileMenuOpen && (
        <div
          className={`md:hidden border-t py-4 px-4 sm:px-6 lg:px-8 ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="flex flex-col space-y-4">
            {/* Mobile Language Selector */}
            <div className="sm:hidden mb-4">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className={`w-full flex items-center justify-center px-4 py-3 rounded-lg border transition-all duration-200 mb-4 ${
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
              {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="검색..."
                  className={`w-full pl-10 h-9 focus:ring-orange-400 ${theme === "dark" ? "bg-[#36393f] border-[#36393f] text-white placeholder-gray-400 focus:border-orange-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500"}`}
                />
              </div> */}
            </div>

            {/* Mobile Menu Items with Dropdowns */}

            {navData
              .filter((item) => item.value !== "USER")
              .map((navMain) => (
                <RenderNavM
                  key={`nav-main-${navMain.value}`}
                  navMain={navMain}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                />
              ))}

            {session &&
              navData
                .filter((item) => item.value === "USER")
                .map((navMain) => (
                  <RenderNavM
                    key={`nav-main-${navMain.value}`}
                    navMain={navMain}
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                ))}

            {session && (
              <a
                href="#"
                onClick={() => signOut()}
                className={`transition-colors text-sm ${
                  theme === "dark"
                    ? "text-white hover:text-orange-400"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {headerI18N.logout[localeKey]}
              </a>
            )}

            {!session && (
              <a
                href="#"
                onClick={() => signIn()}
                className={`transition-colors text-sm ${
                  theme === "dark"
                    ? "text-white hover:text-orange-400"
                    : "text-gray-700 hover:text-orange-500"
                }`}
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
