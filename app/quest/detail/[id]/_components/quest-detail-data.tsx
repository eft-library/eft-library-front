import QuestDetailView from "./quest-detail-view";
import { notFound } from "next/navigation";
import { fetchQusetDetailData } from "../_lib/fetch-quest-detail";

export default async function QuestDetailData({ id }: { id: string }) {
  try {
    const data = await fetchQusetDetailData(id);

    if (!data) {
      notFound(); // 404 페이지로
    }

    return <QuestDetailView quest={data} />;
  } catch (error) {
    console.error(error);
    notFound(); // 또는 에러 페이지로
  }
}
