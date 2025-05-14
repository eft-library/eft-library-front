import NoticeDetail from "@/components/page/noticeDetail/noticeDetail";
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
  const product = await fetch(`${API_ENDPOINTS.GET_NOTICE_BY_ID}/${id}`).then(
    (res) => res.json()
  );

  const res = product.data;
  return {
    title: `${res.information.name.ko} - EFT Library`,
    description: `${res.information.name.ko}`,
    openGraph: {
      title: "EFT Library 공지사항 상세 정보 - EFT Library",
      description: "EFT Library 사이트 관련 공지사항 상세 정보.",
      url: `https://eftlibrary.com/notice/detail/${id}`,
      siteName: "EFT Library",
    },
    twitter: {
      title: "EFT Library 공지사항 상세 정보 - EFT Library",
      description: "EFT Library 사이트 관련 공지사항 상세 정보.",
    },
  };
}

export default function NoticeDetailPage() {
  return <NoticeDetail />;
}
