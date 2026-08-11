import { List } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";
import type { QuestAffinityType } from "@/types/api/quest";

const affinityLabels: Record<Locale, Record<QuestAffinityType, string>> = {
  ko: {
    level_1: "우호도 레벨 1",
    level_2: "우호도 레벨 2",
    level_3: "우호도 레벨 3",
    level_4: "우호도 레벨 4",
    main_quest: "주요 임무",
  },
  en: {
    level_1: "Loyalty Level 1",
    level_2: "Loyalty Level 2",
    level_3: "Loyalty Level 3",
    level_4: "Loyalty Level 4",
    main_quest: "Main Quest",
  },
  ja: {
    level_1: "親密度レベル 1",
    level_2: "親密度レベル 2",
    level_3: "親密度レベル 3",
    level_4: "親密度レベル 4",
    main_quest: "メイン任務",
  },
};

const affinityStyles: Record<QuestAffinityType, string> = {
  level_1: "border-l-slate-500",
  level_2: "border-l-sky-500",
  level_3: "border-l-violet-500",
  level_4: "border-l-amber-500",
  main_quest: "border-l-rose-500",
};

const affinityIconStyles: Record<QuestAffinityType, string> = {
  level_1: "text-slate-500 dark:text-slate-300",
  level_2: "text-sky-600 dark:text-sky-400",
  level_3: "text-violet-600 dark:text-violet-400",
  level_4: "text-amber-600 dark:text-amber-400",
  main_quest: "text-rose-600 dark:text-rose-400",
};

export function getQuestAffinityLabel(type: QuestAffinityType, locale: Locale) {
  return affinityLabels[locale][type];
}

function AffinityIcon({ type }: { type: QuestAffinityType }) {
  if (type === "main_quest") {
    return (
      <List
        aria-hidden="true"
        className={cn("size-4", affinityIconStyles[type])}
        strokeWidth={3}
      />
    );
  }

  const romanNumeral = {
    level_1: "I",
    level_2: "II",
    level_3: "III",
    level_4: "IV",
  }[type];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-4 items-center justify-center rounded-sm bg-current text-[9px] font-black leading-none",
        affinityIconStyles[type],
      )}
    >
      <span className="text-white dark:text-[#20242b]">{romanNumeral}</span>
    </span>
  );
}

export function QuestAffinityBadge({
  affinityType,
  className,
  compact = false,
  locale,
}: {
  affinityType: QuestAffinityType | null | undefined;
  className?: string;
  compact?: boolean;
  locale: Locale;
}) {
  if (!affinityType) {
    return null;
  }

  const label = getQuestAffinityLabel(affinityType, locale);

  return (
    <span
      title={compact ? label : undefined}
      aria-label={compact ? label : undefined}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-md border border-l-[3px] border-gray-300 bg-gray-50 px-2 py-1 text-[11px] font-bold text-gray-700 shadow-sm dark:border-gray-600 dark:bg-[#20242b] dark:text-gray-200",
        affinityStyles[affinityType],
        compact && "size-6 justify-center p-0",
        className,
      )}
    >
      <AffinityIcon type={affinityType} />
      {compact ? null : <span>{label}</span>}
    </span>
  );
}
