import QuestData from "./_components/quest-data";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { Metadata } from "next";
import type { QuestDataTypes } from "./_components/quest.types";

type paramsType = Promise<{ id: string }>;

type MetaProps = {
  params: paramsType;
};

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  // params에서 id 추출
  const id = (await params).id;

  // fetch data
  const product = await fetch(`${API_ENDPOINTS.GET_QUEST_BY_NPC}/${id}`).then(
    (res) => res.json(),
  );

  const res: QuestDataTypes = product.data;

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
}

export default function Quest({ params }: MetaProps) {
  return <QuestData params={params} />;
}
