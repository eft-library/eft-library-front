import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { MapDetailResponse } from "@/types/api/map";

function getLocalizedName(
  value: { name_en: string; name_ko: string; name_ja: string },
  locale: Locale,
) {
  const localized = pickLocalizedField(
    value as unknown as Record<string, unknown>,
    locale,
    "name",
  );

  return typeof localized === "string" && localized ? localized : value.name_en;
}

export function MapPage({
  mapId,
  mapDetail,
  locale,
}: {
  mapId: string;
  mapDetail: MapDetailResponse;
  locale: Locale;
}) {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
            3D Map
          </p>
          <h1 className="mt-2 text-3xl font-bold">
            {getLocalizedName(mapDetail.map, locale)}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
            기존 3D 뷰어 라이브러리 없이, V3 map detail에서 내려주는 `glb` 파일 주소와 레이어
            메타데이터를 기준으로 기본 정보와 이동 동선을 먼저 구성했습니다.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {mapDetail.top_level_map.map((entry) => (
              <Link
                key={entry.normalized_name}
                href={`/map/${entry.normalized_name}`}
                className={`rounded-full border px-3 py-2 text-sm font-medium ${
                  entry.normalized_name === mapId
                    ? "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                    : "border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-[#1f222a] dark:text-gray-200"
                }`}
              >
                {getLocalizedName(entry, locale)}
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
            <h2 className="text-lg font-semibold">Model Asset</h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              실제 3D 렌더링은 나중에 붙일 수 있도록, 지금은 모델 주소와 레이어 정보를 먼저
              노출합니다.
            </p>
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4 font-mono text-xs break-all dark:border-gray-700 dark:bg-[#1f222a]">
              {mapDetail.map.three_image ?? "No model asset"}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {mapDetail.map.three_json.map((entry, index) => (
                <div
                  key={`${mapDetail.map.normalized_name}-${index}`}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm dark:border-gray-700 dark:bg-[#1f222a]"
                >
                  <div className="font-medium">{String(entry.geometry ?? "geometry")}</div>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {String(entry.material ?? "material")}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
            <h2 className="text-lg font-semibold">Related Floors</h2>
            <div className="mt-4 grid gap-3">
              {mapDetail.related_maps.map((entry) => (
                <Link
                  key={entry.normalized_name}
                  href={`/map/${entry.normalized_name}`}
                  className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm transition hover:border-orange-300 dark:border-gray-700 dark:bg-[#1f222a]"
                >
                  {getLocalizedName(entry, locale)}
                </Link>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
