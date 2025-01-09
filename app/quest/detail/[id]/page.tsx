import QuestDetail from "@/components/page/questDetail/questDetail";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { formatImage } from "@/lib/func/formatImage";
import { Metadata } from "next";

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
  const product = await fetch(`${API_ENDPOINTS.GET_QUEST}/${id}`).then((res) =>
    res.json()
  );

  const res = product.data;

  return {
    title: `${res.title_kr} - EFT Library`,
    description: `Escape from Tarkov (타르코프) ${res.title_kr} 퀘스트 목표, 보상, 카파, 이전 & 다음, 가이드에 대한 정보를 자세히 제공합니다.`,
    openGraph: {
      title: `타르코프 ${res.title_kr} - EFT Library`,
      description: `Escape from Tarkov (타르코프) ${res.title_kr} 퀘스트 목표, 보상, 카파, 이전 & 다음, 가이드에 대한 정보를 자세히 제공합니다.`,
      images: [formatImage(res.image)],
      url: `https://eftlibrary.com/quest/detail/${id}`,
      siteName: "EFT Library",
    },
    twitter: {
      title: `타르코프 ${res.title_kr} - EFT Library`,
      description: `Escape from Tarkov (타르코프) ${res.title_kr} 퀘스트 목표, 보상, 카파, 이전 & 다음, 가이드에 대한 정보를 자세히 제공합니다.`,
      images: [formatImage(res.image)],
    },
  };
}

export default function QuestDetailPage() {
  return <QuestDetail />;
}
