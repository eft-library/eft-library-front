import PatchNotesDetail from "@/components/page/patchNotesDetail/patchNotesDetail";
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
  const product = await fetch(
    `${API_ENDPOINTS.GET_PATCH_NOTES_BY_ID}/${id}`
  ).then((res) => res.json());

  const res = product.data;

  return {
    title: `${res.information.name.ko} - EFT Library`,
    description: `${res.information.name.ko}`,
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
}

export default function PatchNotesDetailPage() {
  return <PatchNotesDetail />;
}
