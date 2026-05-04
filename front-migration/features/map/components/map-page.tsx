import type { Locale } from "@/i18n/config";
import { pickLocalizedText } from "@/lib/utils/localized-text";
import type { MapDetailResponse } from "@/types/api/map";
import { Map3DViewer } from "./map-3d-viewer";
import { MapSelector } from "./map-selector";

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
        <section className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-orange-500">3D Map</p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{activeMapName}</h1>
          </div>
        </section>

        <MapSelector mapId={mapId} mapDetail={mapDetail} locale={locale} />

        <Map3DViewer map={mapDetail.map} />
      </div>
    </main>
  );
}
