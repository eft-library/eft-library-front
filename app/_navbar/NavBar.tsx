"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import type { NavBarTypes } from "./NavBar.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { headerI18N } from "@/lib/consts/i18nConsts";
// import { useAppStore } from "@/store/provider";
import LocalSwitcher from "./LocaleSwitcher";
import { useSession } from "next-auth/react";

export default function NavBar({ navData }: NavBarTypes) {
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
            <div className="text-xl font-bold text-orange-400">EFT LIBRARY</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 relative">
            {navData.map((navMain) => (
              <div
                key={`nav-main-${navMain.value}`}
                className="relative"
                onMouseEnter={() => setActiveMenu(navMain.value)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <a
                  href="#"
                  className={`transition-colors text-sm py-4 block ${
                    theme === "dark"
                      ? "text-white hover:text-orange-400"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  {navMain.name[localeKey]}
                </a>

                {/* Dropdown Menu */}
                {activeMenu === navMain.value && (
                  <div
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-0 w-48 border rounded-md shadow-lg z-50 ${
                      theme === "dark"
                        ? "bg-[#2a2d35] border-gray-600"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="py-2">
                      {navMain.sub_menus.map((navSub) => (
                        <a
                          key={`nav-sub-${navSub.value}`}
                          href="#"
                          className={`block px-4 py-2 text-sm transition-colors text-center ${
                            theme === "dark"
                              ? "text-gray-300 hover:text-orange-400 hover:bg-gray-700/50"
                              : "text-gray-700 hover:text-orange-500 hover:bg-gray-100"
                          }`}
                        >
                          {navSub.name[localeKey]}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {!session && (
              <a
                href="#"
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
          {/* <div className="md:hidden">
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
          </div> */}
        </div>
      </div>
    </nav>
  );
}
