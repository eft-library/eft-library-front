import { CommunityListPage } from "@/features/community/components/community-list-page";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function Page({ params }: PageProps) {
  const { category } = await params;
  return <CommunityListPage category={category} />;
}
