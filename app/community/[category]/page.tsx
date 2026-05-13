import { CommunityListPage } from "@/features/community/components/community-list-page";
import { communityCategories } from "@/lib/constants/community-categories";
import { createPageMetadata, fallbackMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const match = communityCategories.find((entry) => entry.id === category);

  if (!match) {
    return fallbackMetadata("EFT Library PMC 라운지");
  }

  const label = match.labels.ko;

  return createPageMetadata({
    title: `EFT Library PMC 라운지 ${label}`,
    description: `EFT Library PMC 라운지 ${label} 게시판입니다. Escape from Tarkov 이야기를 나눌 수 있습니다.`,
    path: `/community/${category}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;
  return <CommunityListPage category={category} />;
}
