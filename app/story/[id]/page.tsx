import { connection } from "next/server";

import { getStoryDetail } from "@/features/story/api";
import { StoryRoute } from "@/features/story/route";
import { createPageMetadata, fallbackMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const data = await getStoryDetail(id);

    if (data.detail === null) {
      return fallbackMetadata();
    }

    const name = data.detail.title_ko || data.detail.title_en;

    return createPageMetadata({
      title: `타르코프 스토리 ${name}`,
      description: `Escape from Tarkov 플레이 스토리를 흐름 중심으로 정리한 가이드입니다. ${name} 선행 조건, 목표, 진행 가이드를 통해 스토리 분기와 전체 루트를 확인할 수 있습니다.`,
      path: `/story/${id}`,
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

  return <StoryRoute storyId={id} />;
}
