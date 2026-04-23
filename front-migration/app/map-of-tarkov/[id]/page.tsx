import { notFound } from "next/navigation";
import { connection } from "next/server";

import { MapOfTarkovPage } from "@/features/map-of-tarkov/components/map-of-tarkov-page";
import { getMapOfTarkovDetail } from "@/features/map-of-tarkov/api";
import { getUserLocale } from "@/i18n/locale";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const locale = await getUserLocale();
  const mapData = await getMapOfTarkovDetail(id);

  if (!mapData.map_info) {
    notFound();
  }

  return <MapOfTarkovPage mapData={mapData} locale={locale} />;
}
