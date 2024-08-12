import { Metadata, ResolvingMetadata } from "next";
import API_ENDPOINTS from "@/config/endPoints";
import type { MetaProps } from "@/types/types";
import PatchNotesDetailMain from "./contents/patchNotesDetailMain";

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
    title: `${res.patch_notes.name_kr}`,
    description: `${res.patch_notes.name_kr}`,
    openGraph: {
      title: "EFT Library 패치노트",
      description: "EFT Library 패치노트",
      url: `https://eftlibrary.com/patch-notes/detail/${id}`,
      siteName: "Escape From Tarkov Library",
    },
  };
}

export default function PatchNotesDetail() {
  return <PatchNotesDetailMain />;
}
