import { getUserLocale } from "@/i18n/locale";
import {
  getHideoutAllItemRequirements,
  getHideoutDetail,
  getHideoutStations,
} from "@/features/hideout/api";
import { HideoutPage } from "@/features/hideout/components/hideout-page";

export async function HideoutRoute({
  stationId,
}: {
  stationId: string;
}) {
  const [locale, stationResponse, hideout, allItemRequirements] = await Promise.all([
    getUserLocale(),
    getHideoutStations(),
    getHideoutDetail(stationId),
    getHideoutAllItemRequirements(),
  ]);

  return (
    <HideoutPage
      selectedStation={stationId}
      stations={stationResponse.hideout_list}
      userHideout={stationResponse.user_hideout}
      hideout={hideout}
      allItemRequirements={allItemRequirements.items}
      locale={locale}
    />
  );
}
