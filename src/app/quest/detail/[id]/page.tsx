import QuestDetailMain from "./contents/questDetailMain";
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
  const product = await fetch(`${API_ENDPOINTS.GET_QUEST}/${id}`).then((res) =>
    res.json()
  );

  const res = product.data;

  return {
    title: `${res.title_kr}`,
    description: `${res.name_kr} ${res.title_kr}`,
    openGraph: {
      title: `타르코프 ${res.name_kr}`,
      description: `타르코프 ${res.name_kr}`,
      images: [formatImage(res.image)],
      url: `https://eftlibrary.com/quest/detail/${id}`,
      siteName: "Escape From Tarkov Library",
    },
  };
}

export default function QuestDetail() {
  return <QuestDetailMain />;
}
