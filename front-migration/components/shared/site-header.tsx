"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  ChevronDown,
  Info,
  Map,
  Menu,
  Package,
  Search,
  Target,
  User,
  UserRoundPen,
  X,
} from "lucide-react";

import { LocaleSwitcher } from "@/components/shared/locale-switcher";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";
import { pickLocalizedText } from "@/lib/utils/localized-text";
import type { HomeAutocompleteItem, HomeMenuGroup } from "@/types/api/home";

interface SiteHeaderProps {
  menuGroups: HomeMenuGroup[];
  autocompleteItems: HomeAutocompleteItem[];
  browseSectionsLabel: string;
  statusLabel: string;
  localeLabel: string;
  brandSubtitle: string;
  searchPlaceholder: string;
  noSearchResultsLabel: string;
  loginLabel: string;
  logoutLabel: string;
  myPageLabel: string;
  guestLabel: string;
  locale: Locale;
}

function getMenuIcon(menuId: string) {
  switch (menuId) {
    case "MAP":
      return <Map className="h-4 w-4" />;
    case "QUEST":
      return <Target className="h-4 w-4" />;
    case "ITEM":
      return <Package className="h-4 w-4" />;
    case "INFO":
      return <Info className="h-4 w-4" />;
    case "COMMUNITY":
      return <UserRoundPen className="h-4 w-4" />;
    default:
      return null;
  }
}

function getAutocompleteText(item: HomeAutocompleteItem, locale: Locale) {
  switch (locale) {
    case "en":
      return item.autocomplete_text_en;
    case "ja":
      return item.autocomplete_text_ja;
    case "ko":
    default:
      return item.autocomplete_text_ko;
  }
}

function SearchAutocomplete({
  autocompleteItems,
  locale,
  placeholder,
  noResultsLabel,
}: {
  autocompleteItems: HomeAutocompleteItem[];
  locale: Locale;
  placeholder: string;
  noResultsLabel: string;
}) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const items = autocompleteItems.filter((item) => {
      if (!normalizedQuery) {
        return true;
      }

      return getAutocompleteText(item, locale)
        .toLowerCase()
        .includes(normalizedQuery);
    });

    return items
      .sort((left, right) => {
        const leftText = getAutocompleteText(left, locale).toLowerCase();
        const rightText = getAutocompleteText(right, locale).toLowerCase();
        const leftStartsWith = leftText.startsWith(normalizedQuery) ? 1 : 0;
        const rightStartsWith = rightText.startsWith(normalizedQuery) ? 1 : 0;

        if (leftStartsWith !== rightStartsWith) {
          return rightStartsWith - leftStartsWith;
        }

        return leftText.localeCompare(rightText);
      })
      .slice(0, 8);
  }, [autocompleteItems, locale, query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [query]);

  const isShowingPanel = isOpen && query.trim().length > 0;

  const renderHighlightedText = (text: string) => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return text;
    }

    const lowerText = text.toLowerCase();
    const lowerQuery = normalizedQuery.toLowerCase();
    const matchIndex = lowerText.indexOf(lowerQuery);

    if (matchIndex === -1) {
      return text;
    }

    const before = text.slice(0, matchIndex);
    const match = text.slice(matchIndex, matchIndex + normalizedQuery.length);
    const after = text.slice(matchIndex + normalizedQuery.length);

    return (
      <>
        {before}
        <span className="rounded bg-yellow-100 px-1 font-semibold text-gray-900 dark:bg-yellow-500/30 dark:text-yellow-100">
          {match}
        </span>
        {after}
      </>
    );
  };

  const onSelect = (item: HomeAutocompleteItem) => {
    setQuery("");
    setIsOpen(false);
    router.push(item.url);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setHighlightedIndex((prev) =>
              Math.min(prev + 1, suggestions.length - 1),
            );
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            setHighlightedIndex((prev) => Math.max(prev - 1, 0));
          }

          if (event.key === "Enter" && suggestions[highlightedIndex]) {
            event.preventDefault();
            onSelect(suggestions[highlightedIndex]);
          }

          if (event.key === "Escape") {
            setIsOpen(false);
          }
        }}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-orange-400 dark:border-gray-600 dark:bg-[#36393f] dark:text-white dark:placeholder:text-gray-400 dark:focus:border-orange-400"
      />

      {isShowingPanel ? (
        <div className="absolute left-0 top-full z-30 mt-2 max-h-72 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-[#2a2d35]">
          {suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <button
                key={`${item.url}-${index}`}
                type="button"
                onClick={() => onSelect(item)}
                className={cn(
                  "block w-full px-4 py-2 text-left text-sm transition",
                  highlightedIndex === index
                    ? "bg-gray-100 text-orange-500 dark:bg-gray-700/50 dark:text-orange-400"
                    : "text-gray-700 dark:text-gray-200",
                )}
              >
                {renderHighlightedText(getAutocompleteText(item, locale))}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
              {noResultsLabel}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader({
  menuGroups,
  autocompleteItems,
  browseSectionsLabel,
  statusLabel,
  localeLabel,
  brandSubtitle,
  searchPlaceholder,
  noSearchResultsLabel,
  loginLabel,
  logoutLabel,
  myPageLabel,
  guestLabel,
  locale,
}: SiteHeaderProps) {
  const { data: session, status } = useSession();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userLabel =
    session?.userInfo?.nickname ||
    session?.user?.name ||
    session?.user?.email ||
    guestLabel;

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-700 dark:bg-[#2a2d35]/95">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-sm font-semibold text-white shadow-sm">
              EFT
            </span>
            <div>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                EFT Library
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {brandSubtitle}
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <nav className="flex items-center gap-2">
              {menuGroups.map((group) => (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(group.id)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition hover:text-orange-500 dark:text-gray-100 dark:hover:text-orange-400"
                  >
                    {pickLocalizedText(group, locale)}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {activeMenu === group.id ? (
                    <div className="absolute left-1/2 top-full z-20 mt-0 w-56 -translate-x-1/2 rounded-md border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-600 dark:bg-[#2a2d35]">
                      <div className="grid gap-1">
                        {group.sub_menus.map((item) => (
                          <Link
                            key={item.id}
                            href={item.url}
                            className="px-3 py-2 text-center text-sm text-gray-700 transition hover:bg-gray-100 hover:text-orange-500 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-orange-400"
                          >
                            {pickLocalizedText(item, locale)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>
            {status === "authenticated" ? (
              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((value) => !value)}
                  className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-28 truncate">{userLabel}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isUserMenuOpen && "rotate-180",
                    )}
                  />
                </button>

                {isUserMenuOpen ? (
                  <div className="absolute right-0 top-full z-20 mt-2 w-40 rounded-md border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-600 dark:bg-[#2a2d35]">
                    <Link
                      href="/mypage/profile"
                      className="block px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-gray-700/50 dark:hover:text-orange-400"
                    >
                      {myPageLabel}
                    </Link>
                    <button
                      type="button"
                      onClick={() => signOut()}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-gray-700/50 dark:hover:text-orange-400"
                    >
                      {logoutLabel}
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => signIn("google")}
                className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
              >
                {loginLabel}
              </button>
            )}
            <LocaleSwitcher label={localeLabel} locale={locale} />
          </div>

          <button
            type="button"
            onClick={() => setIsMobileOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-700 transition hover:text-orange-500 dark:border-gray-700 dark:text-gray-100 dark:hover:text-orange-400 lg:hidden"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-200 pt-3 dark:border-gray-700 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {statusLabel}
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <SearchAutocomplete
              autocompleteItems={autocompleteItems}
              locale={locale}
              placeholder={searchPlaceholder}
              noResultsLabel={noSearchResultsLabel}
            />
          </div>
        </div>

        {isMobileOpen ? (
          <div className="grid gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/40 lg:hidden">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {browseSectionsLabel}
              </span>
              <LocaleSwitcher label={localeLabel} locale={locale} />
            </div>

            {status === "authenticated" ? (
              <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-[#2a2d35]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-orange-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {userLabel}
                    </span>
                  </div>
                </div>
                <div className="mt-3 grid gap-2">
                  <Link
                    href="/mypage/profile"
                    onClick={() => setIsMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-gray-700/50 dark:hover:text-orange-400"
                  >
                    {myPageLabel}
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="rounded-md px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-gray-700/50 dark:hover:text-orange-400"
                  >
                    {logoutLabel}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => signIn("google")}
                className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-[#2a2d35] dark:text-gray-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
              >
                {loginLabel}
              </button>
            )}

            <SearchAutocomplete
              autocompleteItems={autocompleteItems}
              locale={locale}
              placeholder={searchPlaceholder}
              noResultsLabel={noSearchResultsLabel}
            />

            {menuGroups.map((group) => (
              <details key={group.id} className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#2a2d35]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  <span className="flex items-center gap-2">
                    {getMenuIcon(group.id)}
                    {pickLocalizedText(group, locale)}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </summary>
                <div className="grid gap-1 px-3 pb-3">
                  {group.sub_menus.map((item) => (
                    <Link
                      key={item.id}
                      href={item.url}
                      onClick={() => setIsMobileOpen(false)}
                      className="rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-gray-700/50 dark:hover:text-orange-400"
                    >
                      {pickLocalizedText(item, locale)}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}
