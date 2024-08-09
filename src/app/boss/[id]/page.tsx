import BossMain from "./contents/bossMain";
import { Metadata, ResolvingMetadata } from "next";
import { formatImage } from "@/lib/formatImage";
import API_ENDPOINTS from "@/config/endPoints";
import type { MetaProps } from "@/types/types";

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // params에서 id 추출
  const id = params.id;

  // fetch data
  const product = await fetch(`${API_ENDPOINTS.GET_BOSS}/${id}`).then((res) =>
    res.json()
  );

  const res = product.data;

  return {
    title: `타르코프 ${res.name_kr}`,
    description: "타르코프 보스, tarkov boss",
    openGraph: {
      images: [formatImage(res.image)],
      title: "EFT Library 보스",
      description: "EFT Library 보스",
      url: "https://eftlibrary.com/boss",
      siteName: "Escape From Tarkov Library",
    },
  };
}

export default function Boss() {
  return <BossMain />;
}
