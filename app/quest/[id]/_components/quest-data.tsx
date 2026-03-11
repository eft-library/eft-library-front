import { notFound } from "next/navigation";
import QuestView from "./quest-view";
import { fetchQuestData } from "../_lib/fetch-quest";

export default async function QuestData({ id }: { id: string }) {
  try {
    const data = await fetchQuestData(id);

    if (!data) {
      notFound();
    }

    return <QuestView questData={data} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
