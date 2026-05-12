import { redirect } from "next/navigation";

import { getHideoutStations } from "@/features/hideout/api";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 은신처",
  description:
    "Escape from Tarkov 은신처 기능, 건설 필요 아이템, 건설 시간, 제작 정보를 제공합니다.",
  path: "/hideout",
});

export default async function Page() {
  const stations = await getHideoutStations();
  const firstStation = stations.hideout_list[0]?.normalized_name ?? "bitcoin-farm";

  redirect(`/hideout/${firstStation}`);
}
