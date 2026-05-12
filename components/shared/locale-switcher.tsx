"use client";

import { useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAppStore } from "@/components/providers/app-store-provider";
import { setUserLocale } from "@/i18n/locale";
import { type Locale } from "@/i18n/config";

const languages = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
] as const satisfies ReadonlyArray<{ code: Locale; label: string }>;

interface LocaleSwitcherProps {
  label: string;
  locale: Locale;
}

export function LocaleSwitcher({ label, locale }: LocaleSwitcherProps) {
  const router = useRouter();
  const setUiLocale = useAppStore((state) => state.setUiLocale);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const currentLanguage =
    languages.find((language) => language.code === locale) ?? languages[0];

  const handleLocaleChange = (nextLocale: Locale) => {
    startTransition(async () => {
      await setUserLocale(nextLocale);
      setUiLocale(nextLocale);
      router.refresh();
      setIsOpen(false);
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        disabled={isPending}
        className="flex h-9 items-center gap-2 rounded-md bg-gray-100 px-3 text-sm font-semibold text-gray-700 transition hover:text-orange-500 disabled:opacity-60 dark:bg-[#36393f] dark:text-gray-100 dark:hover:text-orange-300"
      >
        <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
        <span>{currentLanguage.label}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-full z-30 mt-2 w-36 rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-[#2a2d35]">
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => handleLocaleChange(language.code)}
              className={`block w-full px-4 py-2 text-left text-sm transition ${
                language.code === locale
                  ? "bg-orange-50 font-semibold text-orange-600 dark:bg-orange-500/15 dark:text-orange-300"
                  : "text-gray-700 hover:bg-gray-100 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-gray-700/50 dark:hover:text-orange-400"
              }`}
            >
              {language.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
