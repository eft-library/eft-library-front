import { connection } from "next/server";

import { getHideoutDetail } from "@/features/hideout/api";
import { HideoutRoute } from "@/features/hideout/route";
import { createPageMetadata, fallbackMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const data = await getHideoutDetail(id);
    const name = data.master.name_ko || data.master.name_en;

    return createPageMetadata({
      title: `타르코프 은신처 ${name}`,
      description: `Escape from Tarkov 은신처 ${name} 단계별 건설 조건, 필요 아이템, 건설 시간, 제작 정보를 제공합니다.`,
      path: `/hideout/${id}`,
    });
  } catch {
    return fallbackMetadata();
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;

  return <HideoutRoute stationId={id} />;
}
