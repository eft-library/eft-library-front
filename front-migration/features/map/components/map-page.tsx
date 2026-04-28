import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { pickLocalizedText } from "@/lib/utils/localized-text";
import type { MapDetailResponse } from "@/types/api/map";
import { Map3DViewer } from "./map-3d-viewer";

export function MapPage({
  mapId,
  mapDetail,
  locale,
}: {
  mapId: string;
  mapDetail: MapDetailResponse;
  locale: Locale;
}) {
  const activeMapName = pickLocalizedText(mapDetail.map, locale);

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-gray-950 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-orange-500">3D Map</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{activeMapName}</h1>
          </div>

          <nav className="flex flex-wrap gap-2" aria-label="Maps">
            {mapDetail.top_level_map.map((entry) => (
              <Link
                key={entry.normalized_name}
                href={`/map/${entry.normalized_name}`}
                aria-current={entry.normalized_name === mapId ? "page" : undefined}
                className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                  entry.normalized_name === mapId
                    ? "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                    : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 dark:border-gray-700 dark:bg-[#252830] dark:text-gray-200"
                }`}
              >
                {pickLocalizedText(entry, locale)}
              </Link>
            ))}
          </nav>
        </section>

        <Map3DViewer map={mapDetail.map} />

        {mapDetail.related_maps.length > 0 ? (
          <section className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              Related Floors
            </h2>
            <div className="flex flex-wrap gap-2">
              {mapDetail.related_maps.map((entry) => {
                const isActive = entry.normalized_name === mapDetail.map.normalized_name;

                return (
                  <Link
                    key={entry.normalized_name}
                    href={`/map/${entry.normalized_name}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                        : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 dark:border-gray-700 dark:bg-[#252830] dark:text-gray-200"
                    }`}
                  >
                    {pickLocalizedText(entry, locale)}
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
