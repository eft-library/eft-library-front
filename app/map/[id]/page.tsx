import MapData from "./_components/map-data";
import { Metadata } from "next";
import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

type paramsType = Promise<{ id: string }>;
type MetaProps = { params: paramsType };

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await cacheRequestData(`${API_ENDPOINTS.GET_MAP}/${id}`);
    const data = res.data;
    return {
      title: `타르코프 ${data.map.name.ko} - EFT Library`,
      description: `Escape from Tarkov (타르코프) 3D 지도. ${data.map.name.ko} 2D Map과 3D Map을 지원하고 아이템 스폰 위치에 대한 정보를 자세하게 제공합니다.`,
      openGraph: {
        title: `타르코프 ${data.map.name.ko} - EFT Library`,
        description: `Escape from Tarkov (타르코프) 3D 지도. ${data.map.name.ko} 2D Map과 3D Map을 지원하고 아이템 스폰 위치에 대한 정보를 자세하게 제공합니다.`,
        images: [data.map.mot_image.ko],
        url: `https://eftlibrary.com/map/${id}`,
        siteName: "EFT Library",
      },
      twitter: {
        title: `타르코프 ${data.map.name.ko} - EFT Library`,
        description: `Escape from Tarkov (타르코프) 3D 지도. ${data.map.name.ko} 2D Map과 3D Map을 지원하고 아이템 스폰 위치에 대한 정보를 자세하게 제공합니다.`,
        images: [data.map.mot_image.ko],
      },
    };
  } catch {
    return { title: "EFT Library" }; // fallback
  }
}

export default async function Map({ params }: MetaProps) {
  const { id } = await params;
  return <MapData id={id} />;
}
