import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";
import { formatIsoDateTime } from "@/lib/utils/date-time";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import {
  storyNodeTypeMeta,
  type getStoryPageCopy,
} from "@/features/story/config";
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

function getCanvasMetrics(nodes: StoryRoadmapNode[]) {
  const positionedNodes = nodes.filter(
    (node) => node.x_coordinate !== null && node.y_coordinate !== null,
  );

  if (positionedNodes.length === 0) {
    return null;
  }

  const xValues = positionedNodes.map((node) => node.x_coordinate as number);
  const yValues = positionedNodes.map((node) => node.y_coordinate as number);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  return {
    minX,
    maxX,
    minY,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
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
        <div
          className={cn(
            "prose prose-sm mt-5 max-w-none text-gray-700 dark:prose-invert dark:text-gray-200",
            "prose-headings:text-gray-900 dark:prose-headings:text-white",
            "prose-a:text-orange-500 prose-a:underline-offset-2 hover:prose-a:text-orange-400",
            "prose-strong:text-gray-900 dark:prose-strong:text-white",
            "[&_img]:rounded-lg [&_img]:border [&_img]:border-gray-200 [&_img]:bg-black/20 [&_img]:p-1 dark:[&_img]:border-gray-700",
            "[&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_td]:align-top [&_th]:text-left",
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">{emptyLabel}</p>
      )}
    </section>
  );
}

function StoryRoadmapCanvas({
  nodes,
  locale,
  updatedAt,
  labels,
}: {
  nodes: StoryRoadmapNode[];
  locale: Locale;
  updatedAt: string;
  labels: ReturnType<typeof getStoryPageCopy>;
}) {
  const metrics = getCanvasMetrics(nodes);
  const scale = 0.18;
  const cardWidth = 220;
  const cardHeight = 132;

  const sortedNodes = [...nodes].sort((left, right) => {
    const leftY = left.y_coordinate ?? 0;
    const rightY = right.y_coordinate ?? 0;

    if (leftY !== rightY) {
      return leftY - rightY;
    }

    return (left.x_coordinate ?? 0) - (right.x_coordinate ?? 0);
  });

  if (!metrics) {
    return (
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
        <p className="text-sm text-gray-500 dark:text-gray-400">{labels.noSectionLabel}</p>
      </section>
    );
  }

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
            {labels.nodeCountLabel}
          </div>
          <div className="mt-2 text-2xl font-semibold">{nodes.length}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
            {labels.chapterCountLabel}
          </div>
          <div className="mt-2 text-2xl font-semibold">
            {new Set(nodes.map((node) => node.id.split("-")[0])).size}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
            {labels.coordinateRangeLabel}
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            X {Math.round(metrics.minX)} to {Math.round(metrics.maxX)}
            <br />
            Y {Math.round(metrics.minY)} to {Math.round(metrics.maxY)}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">{labels.roadmapLabel}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
              {labels.roadmapDescription}
            </p>
          </div>
          <div className="text-xs uppercase tracking-[0.18em] text-gray-400">
            {labels.updatedAtLabel}: {formatIsoDateTime(updatedAt, locale)}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-[#111318] p-4 dark:border-gray-700">
          <div
            className="relative rounded-lg bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] [background-size:22px_22px]"
            style={{
              width: `${Math.max(1200, metrics.width * scale + cardWidth + 160)}px`,
              height: `${Math.max(960, metrics.height * scale + cardHeight + 160)}px`,
            }}
          >
            {sortedNodes.map((node) => {
              const title = String(
                pickLocalizedField(
                  node as unknown as Record<string, unknown>,
                  locale,
                  "title",
                ) ?? "",
              );
              const contents = String(
                pickLocalizedField(
                  node as unknown as Record<string, unknown>,
                  locale,
                  "contents",
                ) ?? "",
              );
              const desc = String(
                pickLocalizedField(
                  node as unknown as Record<string, unknown>,
                  locale,
                  "desc",
                ) ?? "",
              );
              const left = ((node.x_coordinate ?? 0) - metrics.minX) * scale + 48;
              const top = ((node.y_coordinate ?? 0) - metrics.minY) * scale + 48;
              const nodeTypeMeta = storyNodeTypeMeta[node.node_type];

              return (
                <article
                  key={node.id}
                  className={cn(
                    "absolute overflow-hidden rounded-xl border p-3 text-white shadow-lg backdrop-blur-sm",
                    nodeTypeMeta.accentClass,
                  )}
                  style={{
                    left: `${left}px`,
                    top: `${top}px`,
                    width: `${cardWidth}px`,
                    minHeight: `${cardHeight}px`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
                        nodeTypeMeta.badgeClass,
                      )}
                    >
                      {node.node_type}
                    </span>
                    {node.value_text ? (
                      <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-medium text-white/80">
                        {node.value_text}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold leading-5">{title}</h3>
                  {desc ? (
                    <p className="mt-2 text-xs font-medium text-white/75">{desc}</p>
                  ) : null}
                  {contents ? (
                    <p className="mt-2 line-clamp-4 text-xs leading-5 text-white/80">
                      {contents}
                    </p>
                  ) : null}
                  {node.image ? (
                    <div className="mt-3 overflow-hidden rounded-lg border border-white/10 bg-black/20">
                      <Image
                        src={node.image}
                        alt={title}
                        width={400}
                        height={220}
                        className="h-24 w-full object-cover"
                      />
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
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
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
                {labels.pageTitle}
              </p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{chapterTitle}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                {storyId === "roadmap" ? labels.roadmapDescription : labels.pageDescription}
              </p>
            </div>
            <div className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                {labels.updatedAtLabel}
              </div>
              <div className="mt-2 font-mono">
                {formatIsoDateTime(detail.update_time, locale)}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
              {labels.selectorLabel}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
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
                      "rounded-full border px-3 py-2 text-sm font-medium transition",
                      entry.id === storyId
                        ? "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                        : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-[#2a2d35] dark:text-gray-200 dark:hover:border-orange-400 dark:hover:text-orange-300",
                    )}
                  >
                    {title}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {storyId === "roadmap" ? (
          <StoryRoadmapCanvas
            nodes={roadmap}
            locale={locale}
            updatedAt={detail.update_time}
            labels={labels}
          />
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
