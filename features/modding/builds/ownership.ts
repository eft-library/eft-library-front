import { buildsApi } from "./api";
import type { OwnBuildSummary } from "./types";

// The public list is anonymous and contains no ownership flags. Match stable
// IDs against the authenticated owner's paginated list, never nicknames.
export async function getOwnedBuildSummaries(token: string, signal: AbortSignal): Promise<OwnBuildSummary[]> {
  const owned: OwnBuildSummary[] = [];
  const seen = new Set<string>();
  for (let page = 1; ; page++) {
    const result = await buildsApi.mine(page, token, signal);
    if (result.page !== page || result.page_size <= 0 || !Number.isSafeInteger(result.total) || result.total < 0)
      throw new Error("BUILD_RESPONSE_INVALID");
    for (const build of result.builds) {
      if (seen.has(build.id)) throw new Error("BUILD_RESPONSE_INVALID");
      seen.add(build.id); owned.push(build);
    }
    if (owned.length === result.total) return owned;
    if (owned.length > result.total || result.builds.length !== result.page_size)
      throw new Error("BUILD_RESPONSE_INVALID");
  }
}
