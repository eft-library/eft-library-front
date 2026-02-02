import StoryDetailData from "./_components/story-detail-data";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
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
  const product = await fetch(`${API_ENDPOINTS.GET_STORY}/${id}`).then((res) =>
    res.json(),
  );

  const res = product.data;

  return {
    title: `타르코프 스토리 ${res.detail.name.ko} - EFT Library`,
    description: `Escape from Tarkov(타르코프)의 플레이 스토리를 흐름 중심으로 정리한 가이드입니다. ${res.detail.name.ko} 선행 조건, 목표, 진행 가이드를 통해 스토리 분기와 전체 루트를 한눈에 파악할 수 있습니다.`,
    openGraph: {
      title: `타르코프 스토리 ${res.detail.name.ko} - EFT Library`,
      description: `Escape from Tarkov(타르코프)의 플레이 스토리를 흐름 중심으로 정리한 가이드입니다. ${res.detail.name.ko} 선행 조건, 목표, 진행 가이드를 통해 스토리 분기와 전체 루트를 한눈에 파악할 수 있습니다.`,
      images: [],
      url: `https://eftlibrary.com/story/${id}`,
      siteName: "EFT Library",
    },
    twitter: {
      title: `타르코프 스토리 ${res.detail.name.ko} - EFT Library`,
      description: `Escape from Tarkov(타르코프)의 플레이 스토리를 흐름 중심으로 정리한 가이드입니다. ${res.detail.name.ko} 선행 조건, 목표, 진행 가이드를 통해 스토리 분기와 전체 루트를 한눈에 파악할 수 있습니다.`,
      images: [],
    },
  };
}

export default function Story() {
  return <StoryDetailData />;
}
