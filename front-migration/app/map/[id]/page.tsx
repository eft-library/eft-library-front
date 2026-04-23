import { connection } from "next/server";

import { MapRoute } from "@/features/map/route";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;

  return <MapRoute mapId={id} />;
}
