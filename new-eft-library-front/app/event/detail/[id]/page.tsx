import EventDetail from "@/components/custom/eventDetail/eventDetail";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
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
