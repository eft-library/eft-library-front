import { redirect } from "next/navigation";

import { getHideoutStations } from "@/features/hideout/api";

export default async function Page() {
  const stations = await getHideoutStations();
  const firstStation = stations.hideout_list[0]?.normalized_name ?? "bitcoin-farm";

  redirect(`/hideout/${firstStation}`);
}
