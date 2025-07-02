"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTransition } from "react";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/i18n/locale";
import FlagEn from "@/assets/navi/en";
import FlagJa from "@/assets/navi/ja";
import FlagKo from "@/assets/navi/ko";

export default function LocalSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const [selected, setSelected] = useState<Locale>(locale as Locale);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const onChangeLanguage = (value: string) => {
    const locale = value as Locale;
    setSelected(locale);
    startTransition(() => {
      setUserLocale(locale);
    });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { value: "en", label: "English", img: <FlagEn /> },
    { value: "ko", label: "한국어", img: <FlagKo /> },
    { value: "ja", label: "日本語", img: <FlagJa /> },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center justify-between w-40 rounded-lg border border-white bg-Background px-3 py-2 hover:NeutralGray ${
          isPending && ""
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {menuItems.find((item) => item.value === selected)?.img}
        <span className="text-white font-bold ml-2">
          {menuItems.find((item) => item.value === selected)?.label}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-40 origin-top-right rounded-lg bg-Background border border-white shadow-lg">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {menuItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onChangeLanguage(item.value)}
                className={`block flex gap-2 w-full text-left px-3 py-2 transition hover:bg-NeutralGray font-bold ${
                  selected === item.value ? "text-GoldenYellow" : "text-white"
                }`}
                role="menuitem"
              >
                {item.img}
                <span className="text-white font-bold ml-2">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
