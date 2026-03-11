import BossData from "./_components/boss-data";
import { fetchBossData } from "./_lib/fetch-boss-data";
import { Metadata } from "next";

type paramsType = Promise<{ id: string }>;
type MetaProps = { params: paramsType };

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetchBossData(id);

    return {
      title: `타르코프 ${res.boss.name.ko} - EFT Library`,
      description: `Escape from Tarkov (타르코프) 보스 ${res.boss.name.ko} 스폰 위치, 스폰 확률, 피통, 추종자, 전리품에 대한 정보를 제공합니다.`,
      openGraph: {
        images: [res.boss.image],
        title: `타르코프 ${res.boss.name.ko} - EFT Library`,
        description: `Escape from Tarkov (타르코프) 보스 ${res.boss.name.ko} 스폰 위치, 스폰 확률, 피통, 추종자, 전리품에 대한 정보를 제공합니다.`,
        url: `https://eftlibrary.com/boss/${res.boss.id}`,
        siteName: "EFT Library",
      },
      twitter: {
        images: [res.boss.image],
        title: `타르코프 ${res.boss.name.ko} - EFT Library`,
        description: `Escape from Tarkov (타르코프) 보스 ${res.boss.name.ko} 스폰 위치, 스폰 확률, 피통, 추종자, 전리품에 대한 정보를 제공합니다.`,
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
