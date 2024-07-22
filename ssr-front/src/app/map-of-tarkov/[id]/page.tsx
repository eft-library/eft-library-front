import MapOfTarkovMain from "./contents/mapOfTarkovMain";
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
  const product = await fetch(`${API_ENDPOINTS.GET_MAP_OF_TARKOV}/${id}`).then(
    (res) => res.json()
  );

  const res = product.data.map_info;

  return {
    title: `타르코프 지도 : ${res.name_kr} | EFT Library`,
    description: "EFT Library 타르코프 지도",
    openGraph: {
      images: [formatImage(res.mot_image)],
    },
  };
}

export default function MapOfTarkov() {
  return <MapOfTarkovMain />;
}
