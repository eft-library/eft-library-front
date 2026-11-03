export const traderOrder = [
  "prapor",
  "therapist",
  "fence",
  "skier",
  "peacekeeper",
  "mechanic",
  "ragman",
  "jaeger",
  "ref",
] as const;

export const traderLevelColors: Record<
  number,
  { badge: string; filter: string }
> = {
  1: {
    badge: "text-emerald-300",
    filter: "text-emerald-700 dark:text-emerald-300",
  },
  2: { badge: "text-sky-300", filter: "text-sky-700 dark:text-sky-300" },
  3: {
    badge: "text-violet-300",
    filter: "text-violet-700 dark:text-violet-300",
  },
  4: { badge: "text-amber-300", filter: "text-amber-700 dark:text-amber-300" },
};
