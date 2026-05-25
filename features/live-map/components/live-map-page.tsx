import { LiveMapClientPage } from "@/features/live-map/components/live-map-client-page";
import type { LiveMapPageData } from "@/types/api/live-map";
import type { QuestCompletionGraphNode } from "@/types/api/quest";

export function LiveMapPage({
  data,
  initialCompletionGraph,
  normalizedName,
}: {
  data: LiveMapPageData;
  initialCompletionGraph: QuestCompletionGraphNode[];
  normalizedName: string;
}) {
  return (
    <LiveMapClientPage
      key={normalizedName}
      data={data}
      initialCompletionGraph={initialCompletionGraph}
      normalizedName={normalizedName}
    />
  );
}
