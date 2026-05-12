import { getUserLocale } from "@/i18n/locale";
import { getHideoutDetail, getHideoutStations } from "@/features/hideout/api";
import { HideoutPage } from "@/features/hideout/components/hideout-page";

export async function HideoutRoute({
  stationId,
}: {
  stationId: string;
}) {
  const [locale, stationResponse, hideout] = await Promise.all([
    getUserLocale(),
    getHideoutStations(),
    getHideoutDetail(stationId),
  ]);

  return (
    <HideoutPage
      selectedStation={stationId}
      stations={stationResponse.hideout_list}
      userHideout={stationResponse.user_hideout}
      hideout={hideout}
      locale={locale}
    />
  );
}
