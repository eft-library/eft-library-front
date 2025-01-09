import EventDetail from "@/components/page/eventDetail/eventDetail";
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
  const product = await fetch(`${API_ENDPOINTS.GET_EVENT_BY_ID}/${id}`).then(
    (res) => res.json()
  );

  const res = product.data;
  return {
    title: `${res.information.name_kr} - EFT Library`,
    description: `${res.information_group.name_kr}`,
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
}

export default function EventDetailPage() {
  return <EventDetail />;
}
