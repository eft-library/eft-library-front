import { getPublicProgressItems } from "@/features/progress/server-api";

export async function GET() {
  const data = await getPublicProgressItems();

  return Response.json({ status: 200, msg: "OK", data });
}
