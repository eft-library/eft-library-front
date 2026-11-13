import { fetchWithAuthRecovery } from "@/lib/auth/auth-recovery";
import { getApiBaseUrl } from "@/lib/config/app-env";
import type {
  BuildCommentPage,
  CopyBuild,
  CreateBuild,
  CreateBuildComment,
  CreatedComment,
  DeletedResource,
  OwnBuildPage,
  PublicBuildPage,
  PublishedBuild,
  UpdateBuild,
  UpdatedComment,
  UpdateBuildComment,
  VoteResult,
  Workspace,
} from "./types";

export const BUILDS_ENABLED =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_MODDING_BUILDS_ENABLED === "true";
export const buildsKey = ["modding-builds"] as const;
export class BuildApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    readonly retryAfterSeconds: number | null = null,
  ) {
    super(code);
    this.name = "BuildApiError";
  }
}
export async function buildRequest<T>(
  path: string,
  token?: string,
  init: RequestInit = {},
): Promise<T> {
  const options: RequestInit = {
    ...init,
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...init.headers },
  };
  const response = await fetchWithAuthRecovery(
    `${getApiBaseUrl()}/api/modding/v3/builds${path}`,
    token ?? "",
    options,
  );
  const payload: { status?: number; msg?: string; data?: T; detail?: unknown } =
    await response.json().catch(() => ({}));
  if (!response.ok) {
    const retry = response.headers.get("Retry-After");
    throw new BuildApiError(
      response.status,
      typeof payload.detail === "string"
        ? payload.detail
        : response.status === 422
          ? "BUILD_INPUT_INVALID"
          : "BUILD_REQUEST_FAILED",
      retry !== null && Number.isFinite(Number(retry)) ? Number(retry) : null,
    );
  }
  if (payload.status !== 200 || payload.msg !== "OK" || payload.data == null)
    throw new BuildApiError(502, "BUILD_RESPONSE_INVALID");
  return payload.data;
}
const body = (method: string, data: unknown): RequestInit => ({
  method,
  body: JSON.stringify(data),
});
const idPath = (id: string) => `/${encodeURIComponent(id)}`;
export const buildsApi = {
  list: (params: URLSearchParams, signal: AbortSignal) =>
    buildRequest<PublicBuildPage>(`?${params}`, undefined, { signal }),
  mine: (page: number, token: string, signal: AbortSignal, filters: { word?: string; weapon_item_id?: string } = {}) => {
    const params = new URLSearchParams({ page: String(page), page_size: "20" });
    if (filters.word?.trim()) params.set("word", filters.word.trim());
    if (filters.weapon_item_id) params.set("weapon_item_id", filters.weapon_item_id);
    return buildRequest<OwnBuildPage>(`/mine?${params}`, token, { signal });
  },
  detail: (
    id: string,
    view: "draft" | "published",
    token?: string,
    signal?: AbortSignal,
  ) =>
    buildRequest<Workspace | PublishedBuild>(
      `${idPath(id)}?view=${view}`,
      token,
      { signal },
    ),
  create: (data: CreateBuild, token: string) =>
    buildRequest<Workspace>("", token, body("POST", data)),
  update: (id: string, data: UpdateBuild, token: string) =>
    buildRequest<Workspace>(idPath(id), token, body("PUT", data)),
  delete: (id: string, version: number, token: string) =>
    buildRequest<DeletedResource>(
      `${idPath(id)}?expected_version=${version}`,
      token,
      { method: "DELETE" },
    ),
  publish: (id: string, version: number, token: string) =>
    buildRequest<Workspace>(
      `${idPath(id)}/publication`,
      token,
      body("POST", { expected_version: version }),
    ),
  unpublish: (id: string, version: number, token: string) =>
    buildRequest<Workspace>(
      `${idPath(id)}/publication?expected_version=${version}`,
      token,
      { method: "DELETE" },
    ),
  copy: (id: string, data: CopyBuild, token: string) =>
    buildRequest<Workspace>(`${idPath(id)}/copy`, token, body("POST", data)),
  vote: (id: string, revision: number, remove: boolean, token: string) =>
    buildRequest<VoteResult>(
      `${idPath(id)}/vote${remove ? `?revision=${revision}` : ""}`,
      token,
      remove ? { method: "DELETE" } : body("PUT", { revision }),
    ),
  comments: (
    id: string,
    revision: number,
    page: number,
    token?: string,
    signal?: AbortSignal,
  ) =>
    buildRequest<BuildCommentPage>(
      `${idPath(id)}/comments?revision=${revision}&page=${page}&page_size=20`,
      token,
      { signal },
    ),
  comment: (id: string, data: CreateBuildComment, token: string) =>
    buildRequest<CreatedComment>(
      `${idPath(id)}/comments`,
      token,
      body("POST", data),
    ),
  editComment: (
    id: string,
    commentId: string,
    data: UpdateBuildComment,
    token: string,
  ) =>
    buildRequest<UpdatedComment>(
      `${idPath(id)}/comments/${encodeURIComponent(commentId)}`,
      token,
      body("PUT", data),
    ),
  deleteComment: (
    id: string,
    commentId: string,
    version: number,
    token: string,
  ) =>
    buildRequest<DeletedResource>(
      `${idPath(id)}/comments/${encodeURIComponent(commentId)}?expected_version=${version}`,
      token,
      { method: "DELETE" },
    ),
};
