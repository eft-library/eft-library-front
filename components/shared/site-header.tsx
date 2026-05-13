"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import {
  ChevronDown,
  Info,
  Map,
  Menu,
  Moon,
  Package,
  Search,
  Sun,
  Target,
  User,
  UserRoundPen,
  X,
} from "lucide-react";

import Logo from "@/assets/navi/logo";
import { LocaleSwitcher } from "@/components/shared/locale-switcher";
import { NotificationMenu } from "@/components/shared/notification-menu";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";
import { pickLocalizedText } from "@/lib/utils/localized-text";
import type { HomeAutocompleteItem, HomeMenuGroup } from "@/types/api/home";

interface SiteHeaderProps {
  menuGroups: HomeMenuGroup[];
  autocompleteItems: HomeAutocompleteItem[];
  localeLabel: string;
  searchPlaceholder: string;
  noSearchResultsLabel: string;
  loginLabel: string;
  logoutLabel: string;
  myPageLabel: string;
  guestLabel: string;
  themeToggleLabel: string;
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
    <div ref={wrapperRef} className="relative w-full">
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
        className="h-9 w-full rounded-md border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:bg-white focus:border-orange-300 focus:bg-white dark:border-transparent dark:bg-[#36393f] dark:text-white dark:placeholder:text-gray-400 dark:hover:bg-[#36393f] dark:hover:text-white dark:focus:border-orange-400 dark:focus:bg-[#36393f] dark:focus:text-white"
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

function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = isMounted ? resolvedTheme === "dark" : false;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-700 transition hover:bg-orange-50 hover:text-orange-500 dark:border dark:border-[#464b55] dark:bg-[#242830] dark:text-orange-300 dark:hover:border-orange-500/40 dark:hover:bg-[#2c313a] dark:hover:text-orange-200"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export function SiteHeader({
  menuGroups,
  autocompleteItems,
  localeLabel,
  searchPlaceholder,
  noSearchResultsLabel,
  loginLabel,
  logoutLabel,
  myPageLabel,
  themeToggleLabel,
  locale,
}: SiteHeaderProps) {
  const { status } = useSession();
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

  const visibleMenuGroups = useMemo(
    () => menuGroups.filter((group) => group.id !== "USER"),
    [menuGroups],
  );

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-[#3a4048] dark:bg-[#292d35]/95">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center">
          <Logo width={172} height={32} />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center gap-5 lg:flex">
          <nav className="flex min-w-0 flex-1 items-center justify-center gap-7">
            {visibleMenuGroups.map((group) =>
               (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(group.id)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button
                    type="button"
                    className="flex h-14 items-center gap-1 text-sm font-semibold text-gray-700 transition hover:text-orange-500 dark:text-gray-100 dark:hover:text-orange-300"
                  >
                    {pickLocalizedText(group, locale)}
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  </button>

                  {activeMenu === group.id ? (
                    <div className="absolute left-1/2 top-full z-20 mt-0 w-52 -translate-x-1/2 rounded-md border border-gray-200 bg-white py-2 shadow-lg dark:border-[#3a4048] dark:bg-[#25282e]">
                      <div className="grid gap-1">
                        {group.sub_menus.map((item) => (
                          <Link
                            key={item.id}
                            href={item.url}
                            className="px-3 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-orange-500 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-orange-300"
                          >
                            {pickLocalizedText(item, locale)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ),
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            {status === "authenticated" ? (
              <>
                <NotificationMenu />
                <div
                  ref={userMenuRef}
                  className="relative flex h-9 items-center"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <button
                    type="button"
                    aria-label={myPageLabel}
                    title={myPageLabel}
                    onFocus={() => setIsUserMenuOpen(true)}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-700 transition hover:bg-orange-50 hover:text-orange-500 dark:border dark:border-[#464b55] dark:bg-[#242830] dark:text-orange-300 dark:hover:border-orange-500/40 dark:hover:bg-[#2c313a] dark:hover:text-orange-200"
                  >
                    <User className="h-4 w-4" />
                  </button>

                  {isUserMenuOpen ? (
                    <div className="absolute left-1/2 top-full z-20 mt-2 w-40 -translate-x-1/2 rounded-md border border-gray-200 bg-white py-2 shadow-lg before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-[''] dark:border-gray-600 dark:bg-[#25282e]">
                      <Link
                        href="/mypage/profile"
                        className="block px-4 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-white/5 dark:hover:text-orange-300"
                      >
                        {myPageLabel}
                      </Link>
                      <button
                        type="button"
                        onClick={() => signOut()}
                        className="block w-full px-4 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-white/5 dark:hover:text-orange-300"
                      >
                        {logoutLabel}
                      </button>
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={() => signIn("google")}
                className="h-9 rounded-md px-2 text-sm font-semibold text-gray-700 transition hover:text-orange-500 dark:text-gray-100 dark:hover:text-orange-300"
              >
                {loginLabel}
              </button>
            )}
            <ThemeToggle label={themeToggleLabel} />
            <LocaleSwitcher label={localeLabel} locale={locale} />
            <div className="w-52 xl:w-60">
              <SearchAutocomplete
                autocompleteItems={autocompleteItems}
                locale={locale}
                placeholder={searchPlaceholder}
                noResultsLabel={noSearchResultsLabel}
              />
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle label={themeToggleLabel} />
          <button
            type="button"
            onClick={() => setIsMobileOpen((value) => !value)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-gray-700 transition hover:text-orange-500 dark:bg-transparent dark:text-gray-100 dark:hover:text-orange-300"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileOpen ? (
        <div className="border-t border-gray-200 bg-white px-4 py-4 shadow-lg dark:border-[#3a4048] dark:bg-[#1c2026] lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-4">
            <div className="flex items-center justify-end">
              <LocaleSwitcher label={localeLabel} locale={locale} />
            </div>

            <SearchAutocomplete
              autocompleteItems={autocompleteItems}
              locale={locale}
              placeholder={searchPlaceholder}
              noResultsLabel={noSearchResultsLabel}
            />

            {status === "authenticated" ? (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-[#1f2329]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-orange-400" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {myPageLabel}
                    </span>
                  </div>
                </div>
                <div className="mt-3 grid gap-2">
                  <NotificationMenu
                    variant="mobile"
                    onNavigate={() => setIsMobileOpen(false)}
                  />
                  <Link
                    href="/mypage/profile"
                    onClick={() => setIsMobileOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-white hover:text-orange-500 dark:text-gray-200 dark:hover:bg-white/5 dark:hover:text-orange-300"
                  >
                    {myPageLabel}
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="rounded-md px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-white hover:text-orange-500 dark:text-gray-200 dark:hover:bg-white/5 dark:hover:text-orange-300"
                  >
                    {logoutLabel}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => signIn("google")}
                className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-[#1f2329] dark:text-gray-200 dark:hover:border-orange-400 dark:hover:text-orange-300"
              >
                {loginLabel}
              </button>
            )}

            {visibleMenuGroups.map((group) =>
              (
                <details key={group.id} className="rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-[#1f2329]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">
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
                        className="rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-white hover:text-orange-500 dark:text-gray-200 dark:hover:bg-white/5 dark:hover:text-orange-300"
                      >
                        {pickLocalizedText(item, locale)}
                      </Link>
                    ))}
                  </div>
                </details>
              ),
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
