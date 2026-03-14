import { cacheRequestData } from "@/lib/config/api";
import PatchNotesDetailData from "./_components/patch-notes-detail-data";
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
      `${API_ENDPOINTS.GET_INFORMATION_BY_ID_TYPE}/PATCH-NOTES/detail/${id}`,
    );
    const data = res.data;

    return {
      title: `${data.information.name.ko} - EFT Library`,
      description: `${data.information.name.ko}`,
      openGraph: {
        title: "EFT Library 패치노트 상세 정보 - EFT Library",
        description:
          "Escape from Tarkov (타르코프) 패치노트 상세 정보를 한글 번역으로 제공합니다.",
        url: `https://eftlibrary.com/patch-notes/detail/${id}`,
        siteName: "EFT Library",
      },
      twitter: {
        title: "EFT Library 패치노트 상세 정보 - EFT Library",
        description:
          "Escape from Tarkov (타르코프) 패치노트 상세 정보를 한글 번역으로 제공합니다.",
      },
    };
  } catch {
    return { title: "EFT Library" };
  }
}

export default async function PatchNotesDetail({ params }: MetaProps) {
  const { id } = await params;
  return <PatchNotesDetailData id={id} />;
}
