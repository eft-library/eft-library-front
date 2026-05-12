import Link from "next/link";

import { HorizontalAdBanner } from "@/components/shared/ad-banner";
import { RichHtmlImageViewer } from "@/components/shared/rich-html-image-viewer";
import { getStorySVG } from "@/assets/story/storySvg";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";
import { formatIsoDateTime } from "@/lib/utils/date-time";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import { type getStoryPageCopy } from "@/features/story/config";
import { StoryRoadmapFlow } from "@/features/story/components/story-roadmap-flow";
import type {
  StoryDetailEntry,
  StoryRoadmapNode,
  StorySelectorEntry,
} from "@/types/api/story";

interface StoryPageProps {
  storyId: string;
  selector: StorySelectorEntry[];
  detail: StoryDetailEntry;
  roadmap: StoryRoadmapNode[];
  locale: Locale;
  labels: ReturnType<typeof getStoryPageCopy>;
}

function getStorySectionHtml(
  detail: StoryDetailEntry,
  locale: Locale,
  prefix: "requirements" | "objectives" | "guide",
) {
  const content = pickLocalizedField(
    detail as unknown as Record<string, unknown>,
    locale,
    prefix,
  );

  return typeof content === "string" ? content : "";
}

function StoryRichSection({
  title,
  html,
  emptyLabel,
}: {
  title: string;
  html: string;
  emptyLabel: string;
}) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
      <h2 className="text-lg font-semibold">{title}</h2>
      {html ? (
        <RichHtmlImageViewer
          html={html}
          imageAltFallback={title}
          className={cn(
            "mt-5",
            "[&_td]:align-top [&_th]:text-left",
          )}
        />
      ) : (
        <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">{emptyLabel}</p>
      )}
    </section>
  );
}

export function StoryPage({
  storyId,
  selector,
  detail,
  roadmap,
  locale,
  labels,
}: StoryPageProps) {
  const chapterTitle = String(
    pickLocalizedField(
      detail as unknown as Record<string, unknown>,
      locale,
      "title",
    ) ?? "",
  );
  const requirementsHtml = getStorySectionHtml(detail, locale, "requirements");
  const objectivesHtml = getStorySectionHtml(detail, locale, "objectives");
  const guideHtml = getStorySectionHtml(detail, locale, "guide");

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#111418] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="pt-4 text-center">
          <h1 className="text-4xl font-black sm:text-5xl">{labels.pageTitle}</h1>
          <HorizontalAdBanner />
        </section>

        <section aria-label={labels.selectorLabel}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
            {selector.map((entry) => {
              const title = String(
                pickLocalizedField(
                  entry as unknown as Record<string, unknown>,
                  locale,
                  "title",
                ) ?? "",
              );

              return (
                <Link
                  key={entry.id}
                  href={`/story/${entry.id}`}
                  className={cn(
                    "group flex min-h-44 flex-col items-center justify-center gap-3 rounded-lg border-2 p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 dark:focus:ring-offset-[#111418]",
                    entry.id === storyId
                      ? "border-orange-300 bg-white text-orange-600 shadow-orange-200/40 dark:border-gray-300 dark:bg-white/10 dark:text-orange-300"
                      : "border-gray-300 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-[#3a434f] dark:bg-[#181c21] dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-300",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-28 w-28 items-center justify-center rounded-lg bg-gray-100 text-slate-500 transition group-hover:scale-105 dark:bg-black/25 dark:text-slate-200",
                      entry.id === storyId && "bg-gray-900 text-white dark:bg-white/10",
                    )}
                  >
                    {getStorySVG(entry.id, 80, 80, "#c7e0e9")}
                  </div>
                  <span className="text-sm font-black">{title}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {storyId === "roadmap" ? (
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-black">{chapterTitle}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {labels.roadmapDescription}
                </p>
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-gray-400">
                {labels.updatedAtLabel}: {formatIsoDateTime(detail.update_time, locale)}
              </div>
            </div>
            <div className="mt-6">
              {roadmap.length > 0 ? (
                <StoryRoadmapFlow nodes={roadmap} locale={locale} />
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {labels.noSectionLabel}
                </p>
              )}
            </div>
          </section>
        ) : (
          <>
            <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
              <h2 className="text-lg font-semibold">{labels.chapterSummaryLabel}</h2>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
                {labels.pageDescription}
              </p>
            </section>
            <StoryRichSection
              title={labels.requirementsLabel}
              html={requirementsHtml}
              emptyLabel={labels.noSectionLabel}
            />
            <StoryRichSection
              title={labels.objectivesLabel}
              html={objectivesHtml}
              emptyLabel={labels.noSectionLabel}
            />
            <StoryRichSection
              title={labels.guideLabel}
              html={guideHtml}
              emptyLabel={labels.noSectionLabel}
            />
          </>
        )}
      </div>
    </main>
  );
}
