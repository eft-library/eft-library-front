import { cacheRequestData } from "@/lib/config/api";
import EventDetailData from "./_component/event-detail-data";
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
      `${API_ENDPOINTS.GET_INFORMATION_BY_ID_TYPE}/EVENT/detail/${id}`,
    );
    const data = res.data;
    return {
      title: `${data.information.name.ko} - EFT Library`,
      description: `${data.information.name.ko}`,
      openGraph: {
        title: "타르코프 이벤트 상세 정보 - EFT Library",
        description:
          "Escape from Tarkov (타르코프)에서 진행하는 이벤트에 관한 상세 정보를 제공합니다.",
        url: `https://eftlibrary.com/event/detail/${id}`,
        siteName: "EFT Library",
      },
      twitter: {
        title: "타르코프 이벤트 상세 정보 - EFT Library",
        description:
          "Escape from Tarkov (타르코프)에서 진행하는 이벤트에 관한 상세 정보를 제공합니다.",
      },
    };
  } catch {
    return { title: "EFT Library" };
  }
}

export default async function EventDetail({ params }: MetaProps) {
  const { id } = await params;
  return <EventDetailData id={id} />;
}
