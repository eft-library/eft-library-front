import { ReactFlowProvider } from "@xyflow/react";
import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import RoadmapClientData from "./roadmap-client-data";
import type { RoadmapServerDataTypes } from "./roadmap.types";

export default async function RoadmapData() {
  const response = await cacheRequestData<RoadmapServerDataTypes>(
    API_ENDPOINTS.GET_ROADMAP,
  );
  const initialRoadmapInfo = response.data;

  return (
    <ReactFlowProvider>
      <RoadmapClientData initialRoadmapInfo={initialRoadmapInfo} />
    </ReactFlowProvider>
  );
}
