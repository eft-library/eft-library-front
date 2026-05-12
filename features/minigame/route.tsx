import { getUserLocale } from "@/i18n/locale";
import {
  getMinigameAllRank,
  getMinigameItems,
} from "@/features/minigame/api";
import { MinigamePage } from "@/features/minigame/components/minigame-page";

export async function MinigameRoute() {
  const [locale, items, rankEntries] = await Promise.all([
    getUserLocale(),
    getMinigameItems(),
    getMinigameAllRank(),
  ]);

  return (
    <MinigamePage
      items={items}
      rankEntries={rankEntries}
      locale={locale}
    />
  );
}
