import { connection } from "next/server";

import { getInformationDetail } from "@/features/information-board/api";
import { InformationDetailRoute } from "@/features/information-board/route";
import {
  createPageMetadata,
  fallbackMetadata,
  stripHtml,
  truncateDescription,
} from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const data = await getInformationDetail("PATCH-NOTES", id);
    const title = data.information.title_ko || data.information.title_en;
    const content = stripHtml(data.information.content_ko || data.information.content_en);

    return createPageMetadata({
      title: `타르코프 패치노트 ${title}`,
      description: truncateDescription(
        content || `Escape from Tarkov 패치노트 ${title} 상세 정보를 제공합니다.`,
      ),
      path: `/patch-notes/detail/${id}`,
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

  return <InformationDetailRoute slug="patch-notes" informationId={id} />;
}
