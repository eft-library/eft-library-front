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
    const data = await getInformationDetail("NOTICE", id);
    const title = data.information.title_ko || data.information.title_en;
    const content = stripHtml(data.information.content_ko || data.information.content_en);

    return createPageMetadata({
      title,
      description: truncateDescription(content || `${title} 공지사항입니다.`),
      path: `/notice/detail/${id}`,
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

  return <InformationDetailRoute slug="notice" informationId={id} />;
}
