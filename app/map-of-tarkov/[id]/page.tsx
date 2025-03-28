import MapOfTarkov from "@/components/page/mapOfTarkov/mapOfTarkov";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { formatImage } from "@/lib/func/formatImage";
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
  const product = await fetch(`${API_ENDPOINTS.GET_MAP_OF_TARKOV}/${id}`).then(
    (res) => res.json()
  );

  const res = product.data.map_info;

  return {
    title: `타르코프 지도 ${res.name_kr} - EFT Library`,
    description: `Escape from Tarkov (타르코프) 한글 지도. ${res.name_kr} 한글화 지도, 보스, 탈출구, Transits에 대한 정보를 제공합니다.`,
    openGraph: {
      title: `타르코프 지도 ${res.name_kr} - EFT Library`,
      description: `Escape from Tarkov (타르코프) 한글 지도. ${res.name_kr} 한글화 지도, 보스, 탈출구, Transits에 대한 정보를 제공합니다.`,
      images: [formatImage(res.mot_image)],
      url: `https://eftlibrary.com/map-of-tarkov/${id}`,
      siteName: "EFT Library",
    },
    twitter: {
      title: `타르코프 지도 ${res.name_kr} - EFT Library`,
      description: `Escape from Tarkov (타르코프) 한글 지도. ${res.name_kr} 한글화 지도, 보스, 탈출구, Transits에 대한 정보를 제공합니다.`,
      images: [formatImage(res.mot_image)],
    },
  };
}

export default function MapOfTarkovPage() {
  return <MapOfTarkov />;
}
