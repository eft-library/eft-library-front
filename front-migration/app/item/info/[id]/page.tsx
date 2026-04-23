import { connection } from "next/server";

import { ItemInfoRoute } from "@/features/item-info/route";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;

  return <ItemInfoRoute itemId={id} />;
}
