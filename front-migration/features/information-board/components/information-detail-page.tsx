import Link from "next/link";
import { CalendarDays, ChevronLeft } from "lucide-react";

import { formatIsoDateTime } from "@/lib/utils/date-time";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { Locale } from "@/i18n/config";
import type { InformationDetailResponse } from "@/types/api/news";

interface InformationDetailPageProps {
  boardPath: string;
  boardTitle: string;
  detail: InformationDetailResponse;
  locale: Locale;
  labels: {
    updatedAtLabel: string;
    latestPostsLabel: string;
    backToListLabel: string;
  };
}

function getDisplayTitle(path: string, title: string) {
  if (path === "notice") {
    return "공지사항";
  }

  return title;
}

export function InformationDetailPage({
  boardPath,
  boardTitle,
  detail,
  locale,
  labels,
}: InformationDetailPageProps) {
  const displayTitle = getDisplayTitle(boardPath, boardTitle);
  const title = String(
    pickLocalizedField(
      detail.information as unknown as Record<string, unknown>,
      locale,
      "title",
    ) ?? "",
  );
  const content = String(
    pickLocalizedField(
      detail.information as unknown as Record<string, unknown>,
      locale,
      "content",
    ) ?? "",
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#111418] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <Link
            href={`/${boardPath}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 transition hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-300"
          >
            <ChevronLeft className="h-4 w-4" />
            {labels.backToListLabel}
          </Link>
        </div>

        <article className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
          <header className="border-b border-gray-100 px-6 py-6 dark:border-[#2a3038] sm:px-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span className="inline-flex rounded-md border border-orange-300/60 bg-orange-50 px-2 py-1 text-xs font-bold text-orange-600 dark:border-orange-400/30 dark:bg-orange-400/10 dark:text-orange-300">
                {displayTitle}
              </span>
              <span>EFT Library</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {formatIsoDateTime(detail.information.update_time, locale)}
              </span>
            </div>
            <h1 className="mt-4 max-w-3xl text-2xl font-black leading-tight text-gray-900 dark:text-white sm:text-3xl">
              {title}
            </h1>
          </header>

          <div
            className="mx-auto min-h-80 max-w-3xl px-6 py-12 text-base leading-8 text-gray-700 dark:text-gray-300 sm:px-8 [&_a]:text-orange-500 [&_a]:underline-offset-2 hover:[&_a]:text-orange-400 [&_a:hover]:underline [&_b]:font-bold [&_br]:leading-10 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-black [&_h3]:mt-10 [&_h3]:text-xl [&_h3]:font-bold [&_li]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-5 [&_strong]:font-black [&_ul]:list-disc [&_ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>

        {detail.information_group.length > 0 ? (
          <section className="rounded-lg border border-gray-200 bg-white px-5 py-5 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              {labels.latestPostsLabel}
            </h2>
            <div className="mt-3 divide-y divide-gray-100 dark:divide-[#2a3038]">
              {detail.information_group.map((post) => {
                const relatedTitle = String(
                  pickLocalizedField(
                    post as unknown as Record<string, unknown>,
                    locale,
                    "title",
                  ) ?? "",
                );

                return (
                  <Link
                    key={post.id}
                    href={`/${boardPath}/detail/${post.id}`}
                    className={`grid gap-2 py-3 text-sm transition sm:grid-cols-[1fr_auto] ${
                      post.id === detail.information.id
                        ? "text-orange-600 dark:text-orange-300"
                        : "text-gray-700 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-300"
                    }`}
                  >
                    <div className="font-semibold">{relatedTitle}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 sm:text-right">
                      {formatIsoDateTime(post.update_time, locale)}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
