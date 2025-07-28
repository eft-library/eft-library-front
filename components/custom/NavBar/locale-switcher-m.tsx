"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { setUserLocale } from "@/i18n/locale";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/config";

export default function LocalSwitcherM() {
  const languages = [
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
  ];
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
    <div className="relative mb-4">
      <button
        onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200
                   bg-white border-gray-300 text-gray-700 hover:border-orange-500 hover:bg-gray-50
                   dark:bg-[#36393f] dark:border-gray-600 dark:text-white dark:hover:border-orange-400 dark:hover:bg-[#40444b]"
      >
        <div className="flex items-center space-x-3">
          <span className="text-base">{getCurrentLanguage().flag}</span>
          <span className="text-sm font-semibold">
            {getCurrentLanguage().name}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isLanguageMenuOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Mobile Language Dropdown */}
      {isLanguageMenuOpen && (
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 border rounded-lg shadow-xl z-50 overflow-hidden
                     bg-white border-gray-200
                     dark:bg-[#36393f] dark:border-gray-600"
        >
          <div className="py-1">
            {languages.map((language) => {
              const isSelected = currentLanguage === language.code;
              return (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm text-left transition-all duration-200
                    ${
                      isSelected
                        ? "bg-orange-50 text-orange-600 border-l-2 border-orange-500 dark:bg-orange-400/20 dark:text-orange-400 dark:border-orange-400"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700/50"
                    }`}
                >
                  <span className="text-base">{language.flag}</span>
                  <span className="font-semibold">{language.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
