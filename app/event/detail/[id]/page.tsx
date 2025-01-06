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
    title: `${res.information.name_kr}`,
    description: `${res.information_group.name_kr}`,
    openGraph: {
      title: "EFT Library 이벤트",
      description: "EFT Library 이벤트",
      url: `https://eftlibrary.com/event/detail/${id}`,
      siteName: "Escape From Tarkov Library",
    },
  };
}

export default function EventDetailPage() {
  return <EventDetail />;
}
