import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { ItemInfoResponse } from "@/types/api/item-info";

function getLocalizedName(item: ItemInfoResponse, locale: Locale) {
  const localized = pickLocalizedField(
    item as unknown as Record<string, unknown>,
    locale,
    "name",
  );

  return typeof localized === "string" && localized ? localized : item.name_en;
}

export function ItemInfoPage({
  item,
  locale,
}: {
  item: ItemInfoResponse;
  locale: Locale;
}) {
  const itemName = getLocalizedName(item, locale);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="relative h-44 w-44 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-[#1f222a]">
              <Image
                src={item.image}
                alt={itemName}
                fill
                sizes="176px"
                className="object-contain p-4"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
                Item Info
              </p>
              <h1 className="mt-2 text-3xl font-bold">{itemName}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                현재 V3 item info 엔드포인트는 기본 메타데이터 중심이라, 상세 능력치 대신 분류와
                이미지, 규격 정보를 명확하게 보이도록 정리했습니다.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 text-sm">
                {item.parent_category ? (
                  <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-[#1f222a]">
                    {item.parent_category}
                  </span>
                ) : null}
                {item.category ? (
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                    {item.category}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-4">
          <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
            <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Normalized Name</p>
            <p className="mt-3 break-all font-mono text-sm">{item.normalized_name}</p>
          </article>
          <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
            <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Size</p>
            <p className="mt-3 text-lg font-semibold">
              {item.width} x {item.height}
            </p>
          </article>
          <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
            <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Weight</p>
            <p className="mt-3 text-lg font-semibold">{item.weight ?? 0} kg</p>
          </article>
          <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
            <p className="text-xs uppercase tracking-[0.16em] text-gray-400">List Shortcut</p>
            <Link
              href={`/${item.normalized_name}`}
              className="mt-3 inline-flex text-sm font-medium text-orange-500 hover:text-orange-400"
            >
              Open related page
            </Link>
          </article>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
          <h2 className="text-lg font-semibold">Localized Names</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#1f222a]">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Korean</p>
              <p className="mt-2 text-sm font-medium">{item.name_ko}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#1f222a]">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">English</p>
              <p className="mt-2 text-sm font-medium">{item.name_en}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#1f222a]">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-400">Japanese</p>
              <p className="mt-2 text-sm font-medium">{item.name_ja}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
