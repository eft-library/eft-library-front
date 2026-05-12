"use client";

import Image from "next/image";
import { useState } from "react";

import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";
import { pickLocalizedText } from "@/lib/utils/localized-text";
import type { getBossPageCopy } from "@/features/boss/config";
import type { BossCharacter, BossItemEntry } from "@/types/api/boss";

import { BossItemGrid } from "./boss-item-grid";

export function BossFollowerSection({
  followers,
  followerItemsByBossId,
  locale,
  labels,
}: {
  followers: BossCharacter[];
  followerItemsByBossId: Record<string, BossItemEntry[]>;
  locale: Locale;
  labels: ReturnType<typeof getBossPageCopy>;
}) {
  const [selectedFollowerId, setSelectedFollowerId] = useState(followers[0]?.id ?? "");

  if (followers.length === 0) {
    return null;
  }

  const selectedFollower =
    followers.find((follower) => follower.id === selectedFollowerId) ?? followers[0];

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 text-gray-900 shadow-sm dark:border-[#33404c] dark:bg-[#20252b] dark:text-white sm:p-7">
      <h2 className="text-2xl font-bold">{labels.followersLabel}</h2>

      <div className="mt-5 flex flex-wrap gap-2">
        {followers.map((follower) => {
          const isActive = follower.id === selectedFollower.id;

          return (
            <button
              key={follower.id}
              type="button"
              onClick={() => setSelectedFollowerId(follower.id)}
              className={cn(
                "min-h-10 rounded-md border px-4 py-2 text-sm font-semibold transition",
                isActive
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-gray-600 dark:bg-[#1d2228] dark:text-gray-200 dark:hover:border-orange-400 dark:hover:text-orange-300",
              )}
            >
              {pickLocalizedText(follower, locale)}
            </button>
          );
        })}
      </div>

      <article className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-[#33404c] dark:bg-[#1d2228]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Image
            src={selectedFollower.image}
            alt={pickLocalizedText(selectedFollower, locale)}
            width={80}
            height={80}
            className="h-20 w-20 rounded object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">
              {pickLocalizedText(selectedFollower, locale)}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
              {labels.totalHealthLabel}: {selectedFollower.health_total}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <BossItemGrid
            items={followerItemsByBossId[selectedFollower.id] ?? []}
            locale={locale}
            emptyLabel={labels.noLootLabel}
          />
        </div>
      </article>
    </section>
  );
}
