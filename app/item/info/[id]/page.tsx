import { connection } from "next/server";

import { getItemInfo } from "@/features/item-info/api";
import { ItemInfoRoute } from "@/features/item-info/route";
import { createPageMetadata, fallbackMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const item = await getItemInfo(id);
    const name = item.name_ko || item.name_en;

    return createPageMetadata({
      title: `타르코프 ${name}`,
      description: `Escape from Tarkov ${name}. 무기, 방어구, 의료품, 탄약, 모딩 부품, 퀘스트 아이템 등 아이템 정보와 상인 교환, 은신처 제작, 퀘스트 재료 및 보상 정보를 제공합니다.`,
      path: `/item/info/${id}`,
      image: item.image,
      noIndex: true,
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

  return <ItemInfoRoute itemId={id} />;
}
