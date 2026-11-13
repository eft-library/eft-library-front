import { BuildApiError } from "./api";
import type { OwnBuildSummary } from "./types";

export type DeleteTarget = Pick<OwnBuildSummary, "id" | "title" | "version">;
export async function deleteBuildBatch(targets: DeleteTarget[], remove: (target: DeleteTarget) => Promise<unknown>) {
  const deleted: string[] = [];
  const failed: { id: string; error: unknown; attempted: boolean }[] = [];
  let stopped: { error: unknown } | undefined;
  for (const target of targets) {
    if (stopped) { failed.push({ id: target.id, error: stopped.error, attempted: false }); continue; }
    try {
      await remove(target);
      deleted.push(target.id);
    } catch (error) {
      failed.push({ id: target.id, error, attempted: true });
      // A per-build conflict/missing record need not block other selected rows.
      // Authentication, service and network failures stop further requests.
      if (!(error instanceof BuildApiError) || ![404, 409].includes(error.status)) stopped = { error };
    }
  }
  return { deleted, failed };
}
