import type { Metadata } from "next";

import { InformationBoardRoute } from "@/features/information-board/route";
import { getSiteUrl } from "@/lib/config/app-env";

export const metadata: Metadata = {
  title: "공지",
  description: "EFT Library 공지 목록입니다.",
  alternates: {
    canonical: `${getSiteUrl()}/notice`,
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page ?? "1");

  return (
    <InformationBoardRoute
      slug="notice"
      page={Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1}
    />
  );
}
