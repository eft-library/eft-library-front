import { connection } from "next/server";

import { getBossDetail } from "@/features/boss/api";
import { BossRoute } from "@/features/boss/route";
import { createPageMetadata, fallbackMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const data = await getBossDetail(id);
    const name = data.boss.name_ko || data.boss.name_en;

    return createPageMetadata({
      title: `타르코프 ${name}`,
      description: `Escape from Tarkov 보스 ${name}의 스폰 위치, 스폰 확률, 체력, 추종자, 전리품 정보를 제공합니다.`,
      path: `/boss/${id}`,
      image: data.boss.image,
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

  return <BossRoute bossId={id} />;
}
