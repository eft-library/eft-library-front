import { connection } from "next/server";

import { StoryRoute } from "@/features/story/route";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;

  return <StoryRoute storyId={id} />;
}
