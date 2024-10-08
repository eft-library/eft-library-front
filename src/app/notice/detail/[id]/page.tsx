import { Metadata, ResolvingMetadata } from "next";
import API_ENDPOINTS from "@/config/endPoints";
import type { MetaProps } from "@/types/types";
import NoticeDetailMain from "./contents/noticeDetailMain";

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // params에서 id 추출
  const id = params.id;

  // fetch data
  const product = await fetch(`${API_ENDPOINTS.GET_NOTICE_BY_ID}/${id}`).then(
    (res) => res.json()
  );

  const res = product.data;
  return {
    title: `${res.information.name_kr}`,
    description: `${res.information_group.name_kr}`,
    openGraph: {
      title: "EFT Library 공지사항",
      description: "EFT Library 공지사항",
      url: `https://eftlibrary.com/notice/detail/${id}`,
      siteName: "Escape From Tarkov Library",
    },
  };
}

export default function NoticeDetail() {
  return <NoticeDetailMain />;
}
