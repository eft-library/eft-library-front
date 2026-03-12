import StoryView from "./story-detail-view";
import { notFound } from "next/navigation";
import { fetchStoryData } from "../_lib/fetch-story-data";

export default async function StoryDetailData({ id }: { id: string }) {
  try {
    const data = await fetchStoryData(id);

    if (!data) {
      notFound();
    }

    return <StoryView story={data} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
