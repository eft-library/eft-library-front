import { notFound } from "next/navigation";

import { getStoryDetail, getStoryRoadmap } from "@/features/story/api";
import { getStoryPageCopy } from "@/features/story/config";
import { StoryPage } from "@/features/story/components/story-page";
import { getUserLocale } from "@/i18n/locale";

export async function StoryRoute({ storyId }: { storyId: string }) {
  const locale = await getUserLocale();
  const labels = getStoryPageCopy(locale);
  const detailResponse = await getStoryDetail(storyId);

  if (detailResponse.detail === null) {
    notFound();
  }

  const roadmap = storyId === "roadmap" ? await getStoryRoadmap() : [];

  return (
    <StoryPage
      storyId={storyId}
      selector={detailResponse.selector}
      detail={detailResponse.detail}
      roadmap={roadmap}
      locale={locale}
      labels={labels}
    />
  );
}
