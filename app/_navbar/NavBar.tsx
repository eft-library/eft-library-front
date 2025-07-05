"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "../../components/ui/button";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const navigationMenus = {
    지도: [
      "세관",
      "등대",
      "삼림",
      "해안선",
      "공장",
      "리저브",
      "연구소",
      "인터체인지",
      "그라운드 제로",
      "타르코프 시내",
      "대화형 지도",
    ],
    퀘스트: [
      "퀘스트 로드맵",
      "퀘스트 플래너",
      "프라퍼",
      "테라피스트",
      "펜스",
      "스키어",
      "피스키퍼",
      "메카닉",
      "래그맨",
      "예거",
      "등대지기",
      "레프",
      "BTR 운전사",
    ],
    아이템: [
      "무기",
      "탄약",
      "방탄모",
      "의료품",
      "컨테이너",
      "전술 조끼",
      "방탄 조끼",
      "열쇠",
      "헤드셋",
      "가방",
      "식량",
      "전리품",
      "얼굴 커버",
      "안경",
      "완장",
    ],
    정보: [
      "아이템 시세",
      "아이템 랭크",
      "보스",
      "은신처",
      "이벤트",
      "패치노트",
      "시즌 초기화",
      "공지사항",
    ],
  };
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

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
            {Object.keys(navigationMenus).map((menuKey) => (
              <div
                key={menuKey}
                className="relative"
                onMouseEnter={() => setActiveMenu(menuKey)}
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
                  {menuKey}
                </a>

                {/* Dropdown Menu */}
                {activeMenu === menuKey && (
                  <div
                    className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-0 w-48 border rounded-md shadow-lg z-50 ${
                      theme === "dark"
                        ? "bg-[#2a2d35] border-gray-600"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="py-2">
                      {navigationMenus[
                        menuKey as keyof typeof navigationMenus
                      ].map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className={`block px-4 py-2 text-sm transition-colors text-center ${
                            theme === "dark"
                              ? "text-gray-300 hover:text-orange-400 hover:bg-gray-700/50"
                              : "text-gray-700 hover:text-orange-500 hover:bg-gray-100"
                          }`}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <a
              href="#"
              className={`transition-colors text-sm ${
                theme === "dark"
                  ? "text-white hover:text-orange-400"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              로그인
            </a>
          </div>

          {/* Language Selector and Search Bar */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className={`p-2 rounded-md transition-colors ${
                theme === "dark"
                  ? "text-gray-300 hover:text-orange-400"
                  : "text-gray-600 hover:text-orange-500"
              }`}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {/* Language Selector */}
            {/* <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 min-w-[100px] ${
                  theme === "dark"
                    ? "bg-[#36393f] border-gray-600 text-white hover:border-orange-400 hover:bg-[#40444b]"
                    : "bg-white border-gray-300 text-gray-700 hover:border-orange-500 hover:bg-gray-50"
                }`}
              >
                <span className="text-base">{getCurrentLanguage().flag}</span>
                <span className="text-sm font-medium">
                  {getCurrentLanguage().name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isLanguageMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLanguageMenuOpen && (
                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-44 border rounded-lg shadow-xl z-50 overflow-hidden ${
                    theme === "dark"
                      ? "bg-[#36393f] border-gray-600"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="py-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 text-left ${
                          currentLanguage === language.code
                            ? theme === "dark"
                              ? "bg-orange-400/20 text-orange-400 border-l-2 border-orange-400"
                              : "bg-orange-50 text-orange-600 border-l-2 border-orange-500"
                            : theme === "dark"
                            ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-base">{language.flag}</span>
                        <span className="font-medium">{language.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div> */}

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
