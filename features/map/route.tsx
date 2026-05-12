import { getUserLocale } from "@/i18n/locale";
import { getMapDetail } from "@/features/map/api";
import { MapPage } from "@/features/map/components/map-page";

export async function MapRoute({ mapId }: { mapId: string }) {
  const [locale, mapDetail] = await Promise.all([getUserLocale(), getMapDetail(mapId)]);

  return <MapPage mapId={mapId} mapDetail={mapDetail} locale={locale} />;
}
