import { connection } from "next/server";

import { HideoutRoute } from "@/features/hideout/route";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;

  return <HideoutRoute stationId={id} />;
}
