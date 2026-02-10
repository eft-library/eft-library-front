import BossData from "./_components/boss-data";
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
  const product = await fetch(`${API_ENDPOINTS.GET_BOSS}/${id}`).then((res) =>
    res.json(),
  );

  const res = product.data;

  return {
    title: `타르코프 ${res.boss.name.ko} - EFT Library`,
    description: `Escape from Tarkov (타르코프) 보스 ${res.boss.name.ko}  스폰 위치, 스폰 확률, 피통, 추종자, 전리품에 대한 정보를 제공합니다.`,
    openGraph: {
      images: [res.image],
      title: `타르코프 ${res.boss.name.ko} - EFT Library`,
      description: `Escape from Tarkov (타르코프) 보스 ${res.boss.name.ko}  스폰 위치, 스폰 확률, 피통, 추종자, 전리품에 대한 정보를 제공합니다.`,
      url: `https://eftlibrary.com/boss/${res.id}`,
      siteName: "EFT Library",
    },
    twitter: {
      images: [res.image],
      title: `타르코프 ${res.boss.name.ko} - EFT Library`,
      description: `Escape from Tarkov (타르코프) 보스 ${res.boss.name.ko}  스폰 위치, 스폰 확률, 피통, 추종자, 전리품에 대한 정보를 제공합니다.`,
    },
  };
}

export default async function Boss({ params }: MetaProps) {
  return <BossData params={params} />;
}
