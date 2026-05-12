import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { pickLocalizedText } from "@/lib/utils/localized-text";
import type { BossItemEntry } from "@/types/api/boss";

function getPreviewFrameSize(width: number, height: number) {
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);
  const maxWidth = 124;
  const maxHeight = 112;
  const preferredCellSize = 28;

  const fitScale = Math.min(
    maxWidth / safeWidth,
    maxHeight / safeHeight,
    preferredCellSize,
  );

  return {
    width: Math.max(92, Math.round(safeWidth * fitScale)),
    height: Math.max(88, Math.round(safeHeight * fitScale)),
  };
}

export function BossItemGrid({
  items,
  locale,
  emptyLabel,
}: {
  items: BossItemEntry[];
  locale: Locale;
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-400">{emptyLabel}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((item, index) => {
        const localizedName = pickLocalizedText(item, locale);
        const previewSize = getPreviewFrameSize(item.width, item.height);

        return (
          <Link
            key={`${item.normalized_name}-${index}`}
            href={`/item/info/${item.normalized_name}`}
            className="group flex min-h-44 flex-col items-center rounded-xl border-2 border-gray-200 bg-white p-3 text-center transition hover:border-orange-300 hover:bg-gray-50 dark:border-[#33404c] dark:bg-[#1d2228] dark:hover:border-gray-500 dark:hover:bg-[#242a31]"
          >
            <div
              className="relative mb-3 flex items-center justify-center overflow-hidden rounded-lg"
              style={{
                width: `${previewSize.width}px`,
                height: `${previewSize.height}px`,
              }}
            >
              <Image
                src={item.image}
                alt={localizedName}
                fill
                sizes="120px"
                className="object-contain transition group-hover:scale-105"
              />
            </div>
            <span className="line-clamp-3 text-xs font-semibold leading-tight text-gray-900 dark:text-white">
              {localizedName}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
