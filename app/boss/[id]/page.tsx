import { cacheRequestData } from "@/lib/config/api";
import BossData from "./_components/boss-data";
import { Metadata } from "next";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

type paramsType = Promise<{ id: string }>;
type MetaProps = { params: paramsType };

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await cacheRequestData(`${API_ENDPOINTS.GET_BOSS}/${id}`);
    const data = res.data;
    return {
      title: `타르코프 ${data.boss.name.ko} - EFT Library`,
      description: `Escape from Tarkov (타르코프) 보스 ${data.boss.name.ko} 스폰 위치, 스폰 확률, 피통, 추종자, 전리품에 대한 정보를 제공합니다.`,
      openGraph: {
        images: [data.boss.image],
        title: `타르코프 ${data.boss.name.ko} - EFT Library`,
        description: `Escape from Tarkov (타르코프) 보스 ${data.boss.name.ko} 스폰 위치, 스폰 확률, 피통, 추종자, 전리품에 대한 정보를 제공합니다.`,
        url: `https://eftlibrary.com/boss/${data.boss.id}`,
        siteName: "EFT Library",
      },
      twitter: {
        images: [data.boss.image],
        title: `타르코프 ${data.boss.name.ko} - EFT Library`,
        description: `Escape from Tarkov (타르코프) 보스 ${data.boss.name.ko} 스폰 위치, 스폰 확률, 피통, 추종자, 전리품에 대한 정보를 제공합니다.`,
      },
    };
  } catch {
    return { title: "EFT Library" };
  }
}

export default async function Boss({ params }: MetaProps) {
  const { id } = await params;
  return <BossData id={id} />;
}
