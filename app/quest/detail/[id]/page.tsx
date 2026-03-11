import QuestDetailData from "./_components/quest-detail-data";
import { Metadata } from "next";
import { fetchQusetDetailData } from "./_lib/fetch-quest-detail";

type paramsType = Promise<{ id: string }>;
type MetaProps = { params: paramsType };

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetchQusetDetailData(id);

    return {
      title: `${res.name.ko} - EFT Library`,
      description: `Escape from Tarkov (타르코프) ${res.name.ko} 퀘스트 목표, 보상, 카파, 이전 & 다음, 가이드에 대한 정보를 자세히 제공합니다.`,
      openGraph: {
        title: `타르코프 ${res.name.ko} - EFT Library`,
        description: `Escape from Tarkov (타르코프) ${res.name.ko} 퀘스트 목표, 보상, 카파, 이전 & 다음, 가이드에 대한 정보를 자세히 제공합니다.`,
        images: [res.image],
        url: `https://eftlibrary.com/quest/detail/${id}`,
        siteName: "EFT Library",
      },
      twitter: {
        title: `타르코프 ${res.name.ko} - EFT Library`,
        description: `Escape from Tarkov (타르코프) ${res.name.ko} 퀘스트 목표, 보상, 카파, 이전 & 다음, 가이드에 대한 정보를 자세히 제공합니다.`,
        images: [res.image],
      },
    };
  } catch {
    return { title: "EFT Library" }; // fallback
  }
}

export default async function QuestDetail({ params }: MetaProps) {
  const { id } = await params;
  return <QuestDetailData id={id} />;
}
