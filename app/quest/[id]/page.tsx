import QuestData from "./_components/quest-data";
import { Metadata } from "next";
import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { QuestJson } from "./_components/quest.types";

type paramsType = Promise<{ id: string }>;
type MetaProps = { params: paramsType };

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await cacheRequestData(
      `${API_ENDPOINTS.GET_QUEST_BY_NPC}/${id}`,
    );
    const data = res.data;
    const trader = data.trader_list.find((info: QuestJson) => info.id === id);

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
