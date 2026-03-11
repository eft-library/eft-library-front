import QuestData from "./_components/quest-data";
import { Metadata } from "next";
import { fetchQuestData } from "./_lib/fetch-quest";

type paramsType = Promise<{ id: string }>;
type MetaProps = { params: paramsType };

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetchQuestData(id); // ← 직접 fetch 대신 재사용
    const trader = res.trader_list.find((info) => info.id === id);

    return {
      title: `타르코프 퀘스트 ${trader?.name.ko} - EFT Library`,
      description: `Escape from Tarkov (타르코프) 전체 퀘스트. ${trader?.name.ko} 퀘스트와 목표, 보상, 카파 정보를 제공합니다.`,
      openGraph: {
        images: [trader?.image || ""],
        title: `타르코프 퀘스트 ${trader?.name.ko} - EFT Library`,
        description: `Escape from Tarkov (타르코프) 전체 퀘스트. ${trader?.name.ko} 퀘스트와 목표, 보상, 카파 정보를 제공합니다.`,
        url: `https://eftlibrary.com/quest/${trader?.id}`,
        siteName: "EFT Library",
      },
      twitter: {
        images: [trader?.image || ""],
        title: `타르코프 퀘스트 ${trader?.name.ko} - EFT Library`,
        description: `Escape from Tarkov (타르코프) 전체 퀘스트. ${trader?.name.ko} 퀘스트와 목표, 보상, 카파 정보를 제공합니다.`,
      },
    };
  } catch {
    return { title: "EFT Library" }; // fallback
  }
}

export default async function Quest({ params }: MetaProps) {
  const { id } = await params;
  return <QuestData id={id} />;
}
