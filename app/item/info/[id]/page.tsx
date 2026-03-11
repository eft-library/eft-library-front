import ItemData from "./_components/item-data";
import { Metadata } from "next";
import { fetchItemData } from "./_lib/fetch-item-detail";

type paramsType = Promise<{ id: string }>;
type MetaProps = { params: paramsType };

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetchItemData(id);

    return {
      title: `타르코프 ${res.name.ko} - EFT Library`,
      description: `Escape from Tarkov (타르코프) ${res.name.ko}. Escape from Tarkov(타르코프) 아이템별로 무기, 방어구, 의료품, 탄약, 모딩 부품, 퀘스트 아이템 등 다양한 장비에 대한 정보를 제공하며, 상인 교환, 은신처 건설 및 제작, 퀘스트 재료와 보상까지 폭넓은 정보를 제공합니다.`,
      openGraph: {
        title: `타르코프 ${res.name.ko} - EFT Library`,
        description: `Escape from Tarkov (타르코프) ${res.name.ko}. Escape from Tarkov(타르코프) 아이템별로 무기, 방어구, 의료품, 탄약, 모딩 부품, 퀘스트 아이템 등 다양한 장비에 대한 정보를 제공하며, 상인 교환, 은신처 건설 및 제작, 퀘스트 재료와 보상까지 폭넓은 정보를 제공합니다.`,
        images: [res.image],
        url: `https://eftlibrary.com/item/info/${id}`,
        siteName: "EFT Library",
      },
      twitter: {
        title: `타르코프 ${res.name.ko} - EFT Library`,
        description: `Escape from Tarkov (타르코프) ${res.name.ko}. Escape from Tarkov(타르코프) 아이템별로 무기, 방어구, 의료품, 탄약, 모딩 부품, 퀘스트 아이템 등 다양한 장비에 대한 정보를 제공하며, 상인 교환, 은신처 건설 및 제작, 퀘스트 재료와 보상까지 폭넓은 정보를 제공합니다.`,
        images: [res.image],
      },
      robots: {
        index: false,
        follow: true, // 필요한 경우 false로 변경 가능
      },
    };
  } catch {
    return { title: "EFT Library" }; // fallback
  }
}

export default async function Item({ params }: MetaProps) {
  const { id } = await params;
  return <ItemData id={id} />;
}
