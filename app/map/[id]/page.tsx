import MapData from "./_components/map-data";
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
  const product = await fetch(`${API_ENDPOINTS.GET_MAP}/${id}`).then((res) =>
    res.json(),
  );

  const res = product.data;

  return {
    title: `타르코프 ${res.map.name.ko} - EFT Library`,
    description: `Escape from Tarkov (타르코프) 3D 지도. ${res.map.name.ko} 2D Map과 3D Map을 지원하고 아이템 스폰 위치에 대한 정보를 자세하게 제공합니다.`,
    openGraph: {
      title: `타르코프 ${res.map.name.ko} - EFT Library`,
      description: `Escape from Tarkov (타르코프) 3D 지도. ${res.map.name.ko} 2D Map과 3D Map을 지원하고 아이템 스폰 위치에 대한 정보를 자세하게 제공합니다.`,
      images: [res.map.mot_image.ko],
      url: `https://eftlibrary.com/map/${id}`,
      siteName: "EFT Library",
    },
    twitter: {
      title: `타르코프 ${res.map.name.ko} - EFT Library`,
      description: `Escape from Tarkov (타르코프) 3D 지도. ${res.map.name.ko} 2D Map과 3D Map을 지원하고 아이템 스폰 위치에 대한 정보를 자세하게 제공합니다.`,
      images: [res.map.mot_image.ko],
    },
  };
}

export default function Map({ params }: MetaProps) {
  return <MapData params={params} />;
}
