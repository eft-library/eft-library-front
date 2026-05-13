import Link from "next/link";
import Image from "next/image";
import { Flame, Pin, Star } from "lucide-react";

import { HorizontalAdBanner } from "@/components/shared/ad-banner";
import type { Locale } from "@/i18n/config";
import { pickLocalizedText } from "@/lib/utils/localized-text";
import type { HomeMainResponse } from "@/types/api/home";

import type { HomeNewsSection } from "../types";

interface HomePageLabels {
  recommendationFeature: string;
  event: string;
  comingSoon: string;
  patchNotes: string;
  tarkovInfo: string;
  notice: string;
  recentPosts: string;
  noNotice: string;
  noPosts: string;
}

function buildNewsSections(data: HomeMainResponse, labels: HomePageLabels): HomeNewsSection[] {
  return [
    {
      id: "recommend",
      title: labels.recommendationFeature,
      description: "⭐",
      items: data.news.recommend,
    },
    {
      id: "event",
      title: labels.event,
      description: "🎯",
      items: data.news.event,
    },
    {
      id: "next_update",
      title: labels.comingSoon,
      description: "📅",
      items: data.news.next_update,
    },
    {
      id: "patch",
      title: labels.patchNotes,
      description: "📋",
      items: data.news.patch,
    },
    {
      id: "tarkov_info",
      title: labels.tarkovInfo,
      description: "🎮",
      items: data.news.tarkov_info,
    },
  ];
}

interface HomePageProps {
  home: HomeMainResponse;
  labels: HomePageLabels;
  locale: Locale;
}

function getNewsTitle(item: HomeMainResponse["news"]["patch"][number], locale: Locale) {
  switch (locale) {
    case "en":
      return item.title_en;
    case "ja":
      return item.title_ja;
    case "ko":
    default:
      return item.title_ko;
  }
}

export function HomePage({ home, labels, locale }: HomePageProps) {
  const newsSections = buildNewsSections(home, labels);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
              {newsSections.map((section) => (
                <article
                  key={section.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-lg">{section.description}</span>
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <div
                        key={`${section.id}-${item.id}`}
                        className="text-xs text-gray-600 transition-colors hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
                      >
                        {item.link ? (
                          <Link href={item.link} className="block">
                            - {getNewsTitle(item, locale)}
                          </Link>
                        ) : (
                          `- ${getNewsTitle(item, locale)}`
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <HorizontalAdBanner className="my-0" />

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {home.main.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="group flex flex-col"
                  >
                    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:border-orange-300 hover:bg-gray-50 dark:border-gray-700/50 dark:bg-gray-800/20 dark:hover:border-orange-400/50 dark:hover:bg-gray-700/30">
                      <div className="relative mb-3 aspect-square overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700/50">
                        <Image
                          src={item.image}
                          alt={item.name_en}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                          className="object-cover transition-transform duration-200 group-hover:scale-110"
                        />
                      </div>
                      <h3 className="text-center text-sm font-semibold text-gray-700 transition-colors group-hover:text-orange-500 dark:text-gray-200 dark:group-hover:text-orange-400">
                        {pickLocalizedText(item, locale)}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[#303846] dark:bg-[#20262e]">
              <div className="mb-5 flex items-center gap-3">
                <Pin className="h-5 w-5 text-orange-400" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {labels.notice}
                </h2>
              </div>
              <div className="space-y-3">
                {home.news.notice.length > 0 ? (
                  home.news.notice.map((item, index) => (
                    <Link
                      key={`notice-${item.id}`}
                      href={item.link ?? "/"}
                      className="group flex items-start gap-3 rounded-md py-1 text-sm transition hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-300"
                    >
                      <span className="mt-0.5 w-4 shrink-0 text-center text-xs font-bold text-orange-400">
                        {index + 1}
                      </span>
                      <span className="line-clamp-2 text-gray-600 group-hover:text-orange-500 dark:text-gray-300 dark:group-hover:text-orange-300">
                        {getNewsTitle(item, locale)}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    {labels.noNotice}
                  </p>
                )}
              </div>
            </div>

            {home.home_posts.length > 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[#303846] dark:bg-[#20262e]">
                <div className="mb-5 flex items-center gap-3">
                  <Flame className="h-5 w-5 text-orange-400" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {labels.recentPosts}
                  </h2>
                </div>
                <div className="space-y-3">
                  {home.home_posts.map((post, index) => (
                    <Link
                      key={`home-post-${post.id}`}
                      href={`/community/detail/${String(post.id)}-${String(post.slug ?? "")}`}
                      className="block"
                    >
                      <div className="group flex items-start gap-3 rounded-md py-1 transition">
                        <span className="mt-0.5 flex w-4 shrink-0 justify-center text-xs font-bold text-orange-400">
                          {[0, 1].includes(index) ? (
                            <Star className="h-4 w-4 text-yellow-400" />
                          ) : (
                            index + 1
                          )}
                        </span>
                        <p className="line-clamp-2 text-sm text-gray-600 transition group-hover:text-orange-500 dark:text-gray-300 dark:group-hover:text-orange-300">
                          {String(post.title ?? "")}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-400 shadow-sm dark:border-[#303846] dark:bg-[#20262e] dark:text-gray-500">
                {labels.noPosts}
              </div>
            )}

            <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-[#303846] dark:bg-[#20262e]">
              <Link
                href="https://aff.gearupglobal.com/product/download/HSMniDfsEY6c"
                target="_blank"
              >
                <Image
                  src="/gearupboosterlogo.webp"
                  alt="gearupbooster"
                  width={300}
                  height={60}
                  loading="eager"
                  className="h-auto w-full"
                />
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
