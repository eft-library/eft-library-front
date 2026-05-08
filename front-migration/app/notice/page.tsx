import { InformationBoardRoute } from "@/features/information-board/route";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "EFT Library 공지사항",
  description: "EFT Library 공지 목록입니다.",
  path: "/notice",
});

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
