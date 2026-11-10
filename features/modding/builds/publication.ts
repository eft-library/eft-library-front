import { buildsApi } from "./api";
import type { Workspace } from "./types";

// Keep the saved ID/version even if publication fails. A retry can publish that
// workspace rather than creating another build or replaying a stale update.
export async function savePublicBuild(
  persist: () => Promise<Workspace>,
  token: string,
  onSaved: (workspace: Workspace) => void,
): Promise<Workspace> {
  const saved = await persist();
  onSaved(saved);
  if (saved.is_public && saved.published_revision === saved.version)
    return saved;
  return buildsApi.publish(saved.id, saved.version, token);
}
