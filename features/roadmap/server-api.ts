import "server-only";

import { cacheLife } from "next/cache";

import { apiGet } from "@/lib/api/api-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { RoadmapResponse } from "@/types/api/roadmap";

export async function getRoadmap() {
  "use cache";
  cacheLife("days");

  return apiGet<RoadmapResponse>(apiEndpoints.roadmap, {
    revalidate: 60 * 60 * 24,
  });
}
