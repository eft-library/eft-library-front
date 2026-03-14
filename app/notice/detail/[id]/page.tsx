import { cacheRequestData } from "@/lib/config/api";
import NoticeDetailData from "./_components/notice-detail-data";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { Metadata } from "next";

type paramsType = Promise<{ id: string }>;
type MetaProps = { params: paramsType };

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await cacheRequestData(
      `${API_ENDPOINTS.GET_INFORMATION_BY_ID_TYPE}/NOTICE/detail/${id}`,
    );
    const data = res.data;
    return {
      title: `${data.information.name.ko} - EFT Library`,
      description: `${data.information.name.ko}`,
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
  } catch {
    return { title: "EFT Library" };
  }
}

export default async function NoticeDetail({ params }: MetaProps) {
  const { id } = await params;
  return <NoticeDetailData id={id} />;
}
