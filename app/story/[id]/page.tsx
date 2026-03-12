import StoryDetailData from "./_components/story-detail-data";
import { Metadata } from "next";
import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

type paramsType = Promise<{ id: string }>;
type MetaProps = { params: paramsType };

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await cacheRequestData(`${API_ENDPOINTS.GET_STORY}/${id}`);
    const data = res.data;
    return {
      title: `타르코프 스토리 ${data.detail.name.ko} - EFT Library`,
      description: `Escape from Tarkov(타르코프)의 플레이 스토리를 흐름 중심으로 정리한 가이드입니다. ${data.detail.name.ko} 선행 조건, 목표, 진행 가이드를 통해 스토리 분기와 전체 루트를 한눈에 파악할 수 있습니다.`,
      openGraph: {
        title: `타르코프 스토리 ${data.detail.name.ko} - EFT Library`,
        description: `Escape from Tarkov(타르코프)의 플레이 스토리를 흐름 중심으로 정리한 가이드입니다. ${data.detail.name.ko} 선행 조건, 목표, 진행 가이드를 통해 스토리 분기와 전체 루트를 한눈에 파악할 수 있습니다.`,
        images: [],
        url: `https://eftlibrary.com/story/${id}`,
        siteName: "EFT Library",
      },
      twitter: {
        title: `타르코프 스토리 ${data.detail.name.ko} - EFT Library`,
        description: `Escape from Tarkov(타르코프)의 플레이 스토리를 흐름 중심으로 정리한 가이드입니다. ${data.detail.name.ko} 선행 조건, 목표, 진행 가이드를 통해 스토리 분기와 전체 루트를 한눈에 파악할 수 있습니다.`,
        images: [],
      },
    };
  } catch {
    return { title: "EFT Library" }; // fallback
  }
}

export default async function Story({ params }: MetaProps) {
  const { id } = await params;
  return <StoryDetailData id={id} />;
}
