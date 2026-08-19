import { notFound } from "next/navigation";
import { Suspense } from "react";

import { LiveMapPage } from "@/features/live-map/components/live-map-page";
import { getLiveMapCompletionGraph, getLiveMapDetail } from "@/features/live-map/api";
import { createPageMetadata, fallbackMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ normalized_name: string }>;
}) {
  try {
    const { normalized_name: normalizedName } = await params;
    const data = await getLiveMapDetail(normalizedName);
    const map =
      data.map_selector.find((entry) => entry.normalized_name === normalizedName) ??
      data.map_selector[0];
    const name = map?.name_ko || map?.name_en || normalizedName;

    return createPageMetadata({
      title: `${name} Live Map`,
      description: `Escape from Tarkov ${name} 실시간 위치 지도를 제공합니다.`,
      path: `/live-map/${normalizedName}`,
      image: data.floors[0]?.image,
    });
  } catch {
    return fallbackMetadata();
  }
}

export default function Page({
  params,
}: {
  params: Promise<{ normalized_name: string }>;
}) {
  return (
    <Suspense fallback={<LiveMapLoadingFallback />}>
      <LiveMapContent params={params} />
    </Suspense>
  );
}

async function LiveMapContent({
  params,
}: {
  params: Promise<{ normalized_name: string }>;
}) {
  const { normalized_name: normalizedName } = await params;
  const [data, completionGraph] = await Promise.all([
    getLiveMapDetail(normalizedName),
    getLiveMapCompletionGraph(),
  ]);

  if (!data.floors.length) {
    notFound();
  }

  return (
    <LiveMapPage
      data={data}
      initialCompletionGraph={completionGraph}
      normalizedName={normalizedName}
    />
  );
}

function LiveMapLoadingFallback() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-background text-foreground"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span
          className="size-5 animate-spin rounded-full border-2 border-current border-r-transparent"
          aria-hidden="true"
        />
        <span>지도를 불러오는 중...</span>
      </div>
    </div>
  );
}
