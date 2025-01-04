import Boss from "@/components/custom/boss/boss";
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
  const product = await fetch(`${API_ENDPOINTS.GET_BOSS}/${id}`).then((res) =>
    res.json()
  );

  const res = product.data;

  return {
    title: `타르코프 ${res.name_kr}`,
    description: "타르코프 보스, tarkov boss",
    openGraph: {
      images: [formatImage(res.image)],
      title: "EFT Library 보스",
      description: "EFT Library 보스",
      url: "https://eftlibrary.com/boss",
      siteName: "Escape From Tarkov Library",
    },
  };
}

export default function BossPage() {
  return <Boss />;
}
