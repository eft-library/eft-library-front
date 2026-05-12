"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";
import { pickLocalizedText } from "@/lib/utils/localized-text";
import type { getBossPageCopy } from "@/features/boss/config";
import type { BossCharacter } from "@/types/api/boss";

const healthParts = [
  { key: "head_hp", label: { ko: "머리", en: "Head", ja: "頭" } },
  { key: "thorax_hp", label: { ko: "흉부", en: "Thorax", ja: "胸部" } },
  { key: "stomach_hp", label: { ko: "복부", en: "Stomach", ja: "腹部" } },
  { key: "right_arm_hp", label: { ko: "오른쪽 팔", en: "Right arm", ja: "右腕" } },
  { key: "left_arm_hp", label: { ko: "왼팔", en: "Left arm", ja: "左腕" } },
  { key: "right_leg_hp", label: { ko: "오른다리", en: "Right leg", ja: "右脚" } },
  { key: "left_leg_hp", label: { ko: "왼다리", en: "Left leg", ja: "左脚" } },
] as const;

function getHealthBarWidth(value: number, maxPartHealth: number) {
  if (maxPartHealth <= 0) {
    return 0;
  }

  return Math.max(12, Math.min(100, (value / maxPartHealth) * 100));
}

export function BossHealthSection({
  boss,
  followers,
  locale,
  labels,
}: {
  boss: BossCharacter;
  followers: BossCharacter[];
  locale: Locale;
  labels: ReturnType<typeof getBossPageCopy>;
}) {
  const characters = useMemo(() => [boss, ...followers], [boss, followers]);
  const [selectedCharacterId, setSelectedCharacterId] = useState(boss.id);
  const selectedCharacter =
    characters.find((character) => character.id === selectedCharacterId) ?? boss;
  const selectedName = pickLocalizedText(selectedCharacter, locale);
  const maxPartHealth = Math.max(
    ...healthParts.map((part) => selectedCharacter[part.key]),
  );

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 text-gray-900 shadow-sm dark:border-[#33404c] dark:bg-[#20252b] dark:text-white sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">{labels.healthBreakdownLabel}</h2>
        <span className="text-sm text-gray-500 dark:text-gray-300">
          {labels.totalHealthLabel}: {selectedCharacter.health_total}
        </span>
      </div>

      {characters.length > 1 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {characters.map((character) => {
            const isActive = character.id === selectedCharacter.id;

            return (
              <button
                key={character.id}
                type="button"
                onClick={() => setSelectedCharacterId(character.id)}
                className={cn(
                  "min-h-10 rounded-md border px-4 py-2 text-sm font-semibold transition",
                  isActive
                    ? "border-orange-500 bg-orange-500 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-gray-600 dark:bg-[#1d2228] dark:text-gray-200 dark:hover:border-orange-400 dark:hover:text-orange-300",
                )}
              >
                {pickLocalizedText(character, locale)}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.65fr)]">
        {selectedCharacter.health_image ? (
          <div className="overflow-hidden rounded-xl bg-black">
            <Image
              src={selectedCharacter.health_image}
              alt={`${selectedName} health`}
              width={900}
              height={600}
              className="h-auto w-full object-contain"
            />
          </div>
        ) : null}

        <div className="space-y-3">
          {healthParts.map((part) => {
            const value = selectedCharacter[part.key];

            return (
              <div key={part.key} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{part.label[locale]}</span>
                  <span className="text-gray-500 dark:text-gray-300">{value}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-[#11151a]">
                  <div
                    className="h-full rounded-full bg-orange-500"
                    style={{
                      width: `${getHealthBarWidth(value, maxPartHealth)}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
