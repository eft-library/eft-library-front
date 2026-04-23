import { apiGet } from "@/lib/api/api-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { RoadmapResponse } from "@/types/api/roadmap";

export function getRoadmap() {
  return apiGet<RoadmapResponse>(apiEndpoints.roadmap, {
    revalidate: 60 * 30,
  });
}
