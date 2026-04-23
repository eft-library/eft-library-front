import { connection } from "next/server";

import { BossRoute } from "@/features/boss/route";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;

  return <BossRoute bossId={id} />;
}
