import MapOfTarkov from "@/components/custom/mapOfTarkov/mapOfTarkov";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { formatImage } from "@/lib/func/formatImage";
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
  const product = await fetch(`${API_ENDPOINTS.GET_MAP_OF_TARKOV}/${id}`).then(
    (res) => res.json()
  );

  const res = product.data.map_info;

  return {
    title: `타르코프 지도 ${res.name_kr}`,
    description: "타르코프 지도, tarkov map",
    openGraph: {
      title: `타르코프 지도 ${res.name_kr}`,
      description: `타르코프 지도 ${res.name_kr}`,
      images: [formatImage(res.mot_image)],
      url: `https://eftlibrary.com/map-of-tarkov/${id}`,
      siteName: "Escape From Tarkov Library",
    },
  };
}

export default function MapOfTarkovPage() {
  return <MapOfTarkov />;
}
