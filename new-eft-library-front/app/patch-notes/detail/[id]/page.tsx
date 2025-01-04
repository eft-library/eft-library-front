import PatchNotesDetail from "@/components/custom/patchNotesDetail/patchNotesDetail";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { Metadata, ResolvingMetadata } from "next";

type MetaProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // params에서 id 추출
  const id = params.id;

  // fetch data
  const product = await fetch(
    `${API_ENDPOINTS.GET_PATCH_NOTES_BY_ID}/${id}`
  ).then((res) => res.json());

  const res = product.data;

  return {
    title: `${res.information.name_kr}`,
    description: `${res.information_group.name_kr}`,
    openGraph: {
      title: "EFT Library 패치노트",
      description: "EFT Library 패치노트",
      url: `https://eftlibrary.com/patch-notes/detail/${id}`,
      siteName: "Escape From Tarkov Library",
    },
  };
}

export default function PatchNotesDetailPage() {
  return <PatchNotesDetail />;
}
