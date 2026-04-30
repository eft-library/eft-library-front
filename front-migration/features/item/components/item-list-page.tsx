"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils/class-name";
import { pickLocalizedField } from "@/lib/utils/localized-text";

import type { ItemListPageProps } from "@/features/item/types";

function getPreviewFrameSize(width: number, height: number) {
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);
  const maxWidth = 216;
  const maxHeight = 168;
  const preferredCellSize = 36;
  const minWidth = 112;
  const minHeight = 112;

  const fitScale = Math.min(
    maxWidth / safeWidth,
    maxHeight / safeHeight,
    preferredCellSize,
  );

  const previewWidth = Math.max(
    minWidth,
    Math.round(safeWidth * fitScale),
  );
  const previewHeight = Math.max(
    minHeight,
    Math.round(safeHeight * fitScale),
  );

  return {
    width: previewWidth,
    height: previewHeight,
  };
}

export function ItemListPage({
  itemType,
  itemTabs,
  items,
  labels,
}: ItemListPageProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredItems = useMemo(() => {
    const keyword = deferredQuery.trim().toLowerCase();

    if (!keyword) {
      return items;
    }

    return items.filter((item) => {
      const localizedName = String(
        pickLocalizedField(
          item as unknown as Record<string, unknown>,
          labels.locale,
          "name",
        ) ?? "",
      ).toLowerCase();

      return (
        localizedName.includes(keyword) ||
        item.name_en.toLowerCase().includes(keyword) ||
        item.normalized_name.toLowerCase().includes(keyword)
      );
    });
  }, [deferredQuery, items, labels.locale]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#111418] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
                {itemType}
              </p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                {labels.title}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                {labels.description}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
          <nav className="flex gap-2 overflow-x-auto pb-1" aria-label={labels.title}>
            {itemTabs.map((tab) => {
              const isActive = tab.slug === itemType;

              return (
                <Link
                  key={tab.slug}
                  href={tab.href}
                  className={cn(
                    "shrink-0 rounded-md border px-3 py-2 text-sm font-bold transition",
                    isActive
                      ? "border-orange-300 bg-orange-50 text-orange-600 dark:border-orange-400/40 dark:bg-orange-400/10 dark:text-orange-300"
                      : "border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:text-orange-500 dark:border-[#2a3038] dark:bg-[#20242b] dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-300",
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {filteredItems.length}
              </span>{" "}
              / {items.length}
            </div>
            <div className="w-full max-w-md">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={labels.searchPlaceholder}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-orange-400 dark:border-[#2f3742] dark:bg-[#20242b] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-orange-500"
                />
              </label>
            </div>
          </div>
        </section>

        {filteredItems.length > 0 ? (
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => {
              const localizedName =
                String(
                  pickLocalizedField(
                    item as unknown as Record<string, unknown>,
                    labels.locale,
                    "name",
                  ) ?? "",
                ) ||
                item.name_en;
              const previewSize = getPreviewFrameSize(item.width, item.height);

              return (
                <Link
                  key={item.id}
                  href={`/item/info/${item.normalized_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-orange-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 dark:border-[#2a3038] dark:bg-[#181c21] dark:hover:border-orange-500 dark:focus:ring-offset-[#111418] sm:gap-5"
                >
                  <div
                    className={cn(
                      "relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-[#2a3038] dark:bg-[#20242b]",
                    )}
                    style={{
                      width: `${previewSize.width}px`,
                      height: `${previewSize.height}px`,
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={localizedName}
                      fill
                      sizes="176px"
                      className="object-contain p-1.5 sm:p-2"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="line-clamp-2 text-sm font-semibold text-gray-900 dark:text-white">
                      {localizedName}
                    </h2>
                    <p className="mt-2 truncate font-mono text-xs text-gray-500 dark:text-gray-400">
                      {item.normalized_name}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                        {itemType}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </section>
        ) : (
          <section className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {labels.noResultsLabel}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
