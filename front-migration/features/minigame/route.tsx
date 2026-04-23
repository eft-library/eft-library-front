import { getUserLocale } from "@/i18n/locale";
import {
  getMinigameAllRank,
  getMinigameItems,
  getProgressItems,
} from "@/features/minigame/api";
import { MinigamePage } from "@/features/minigame/components/minigame-page";

export async function MinigameRoute() {
  const [locale, items, rankEntries, progress] = await Promise.all([
    getUserLocale(),
    getMinigameItems(),
    getMinigameAllRank(),
    getProgressItems(),
  ]);

  return (
    <MinigamePage
      items={items}
      rankEntries={rankEntries}
      progress={progress}
      locale={locale}
    />
  );
}
