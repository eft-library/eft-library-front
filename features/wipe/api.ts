import { staticJsonGet } from "@/lib/api/static-json-client";
import type { WipeSeasonResponse } from "@/types/api/news";

export function getWipeSeasons() {
  return staticJsonGet<WipeSeasonResponse[]>("news", "/static/news/v3/wipe.json", {
    revalidate: 60 * 60 * 24,
  });
}
