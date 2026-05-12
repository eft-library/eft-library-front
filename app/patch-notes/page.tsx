import { InformationBoardRoute } from "@/features/information-board/route";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 패치노트",
  description: "Escape from Tarkov 최신 패치 노트와 변경 사항을 확인할 수 있습니다.",
  path: "/patch-notes",
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
      slug="patch-notes"
      page={Number.isFinite(currentPage) && currentPage > 0 ? currentPage : 1}
    />
  );
}
