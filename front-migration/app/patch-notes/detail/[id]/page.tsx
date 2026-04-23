import { connection } from "next/server";

import { InformationDetailRoute } from "@/features/information-board/route";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;

  return <InformationDetailRoute slug="patch-notes" informationId={id} />;
}
