import DetailMain from "@/components/boardDetail/detailMain";
import { Metadata, ResolvingMetadata } from "next";
import type { MetaProps } from "@/types/types";
import API_ENDPOINTS from "@/config/endPoints";

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // params에서 id 추출
  const id = params.id;

  // fetch data
  const product = await fetch(
    `${API_ENDPOINTS.GET_BOARD_BY_TYPE}/question/detail?board_id=${id}`
  ).then((res) => res.json());

  const res = product.data;

  return {
    title: `${res.title}`,
    description: `${res.title}`,
    openGraph: {
      images: res.thumbnail ? res.thumbnail : "/og.png",
      title: `${res.title}`,
      description: `${res.title}`,
      url: `https://eftlibrary.com/board/question/detail/${id}`,
      siteName: "Escape From Tarkov Library",
    },
  };
}

export default function QuestionDetail() {
  return <DetailMain siteParam="question" />;
}
