import QuestDetail from "@/components/custom/questDetail/questDetail";
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
    title: `${res.title_kr}`,
    description: `${res.name_kr} ${res.title_kr}`,
    openGraph: {
      title: `타르코프 ${res.title_kr}`,
      description: `타르코프 ${res.title_kr}`,
      images: [formatImage(res.image)],
      url: `https://eftlibrary.com/quest/detail/${id}`,
      siteName: "Escape From Tarkov Library",
    },
  };
}

export default function QuestDetailPage() {
  return <QuestDetail />;
}
