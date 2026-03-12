import { cacheRequestData } from "@/lib/config/api";
import MapOfTarkovData from "./_components/map-of-tarkov-data";
import { Metadata } from "next";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

type paramsType = Promise<{ id: string }>;
type MetaProps = { params: paramsType };

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await cacheRequestData(
      `${API_ENDPOINTS.GET_MAP_OF_TARKOV}/${id}`,
    );
    const data = res.data;

    return {
      title: `타르코프 지도 ${data.map_info.name.ko} - EFT Library`,
      description: `Escape from Tarkov (타르코프) 한글 지도. ${data.map_info.name.ko} 한글화 지도, 보스, 탈출구, Transits에 대한 정보를 제공합니다.`,
      openGraph: {
        title: `타르코프 지도 ${data.map_info.name.ko} - EFT Library`,
        description: `Escape from Tarkov (타르코프) 한글 지도. ${data.map_info.name.ko} 한글화 지도, 보스, 탈출구, Transits에 대한 정보를 제공합니다.`,
        images: [data.map_info.mot_image.ko],
        url: `https://eftlibrary.com/map-of-tarkov/${id}`,
        siteName: "EFT Library",
      },
      twitter: {
        title: `타르코프 지도 ${data.map_info.name.ko} - EFT Library`,
        description: `Escape from Tarkov (타르코프) 한글 지도. ${data.map_info.name.ko} 한글화 지도, 보스, 탈출구, Transits에 대한 정보를 제공합니다.`,
        images: [data.map_info.mot_image.ko],
      },
    };
  } catch {
    return { title: "EFT Library" }; // fallback
  }
}

export default async function MapOfTarkov({ params }: MetaProps) {
  const { id } = await params;
  return <MapOfTarkovData id={id} />;
}
