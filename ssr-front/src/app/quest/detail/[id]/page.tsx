import QuestDetailMain from "./contents/questDetailMain";
import { Metadata, ResolvingMetadata } from "next";
import { formatImage } from "@/lib/formatImage";
import API_ENDPOINTS from "@/config/endPoints";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
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
    title: `${res.title_kr} | EFT Library`,
    description: "EFT Library",
    openGraph: {
      images: [formatImage(res.image)],
    },
  };
}

export default function QuestDetail() {
  return <QuestDetailMain />;
}
