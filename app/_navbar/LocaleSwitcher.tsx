"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { ChevronDown } from "lucide-react";
import { setUserLocale } from "@/i18n/locale";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/config";

export default function LocalSwitcher() {
  const languages = [
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
  ];
  const { theme } = useTheme();
  const locale = useLocale();
  const [currentLanguage, setCurrentLanguage] = useState(locale);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const handleLanguageChange = (langCode: string) => {
    const locale = langCode as Locale;
    setCurrentLanguage(locale);
    setUserLocale(locale);
    setIsLanguageMenuOpen(false);
  };

  const getCurrentLanguage = () => {
    return (
      languages.find((lang) => lang.code === currentLanguage) || languages[0]
    );
  };

  return (
    <>
      <div className="relative">
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
      </div>
    </>
  );
}
