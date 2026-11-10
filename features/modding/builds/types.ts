// Generated from user_weapon_builds_openapi.json, 2026-11-10.
export type { ItemSummary, ModProperties } from "../types";
import type { ItemSummary } from "../types";
export type BuildComment = {
  id: string;
  content: string;
  version: number;
  created_at: string;
  updated_at: string;
  author_nickname: string | null;
  is_mine: boolean;
  can_delete: boolean;
};

export type BuildCommentPage = {
  revision: number;
  total: number;
  page: number;
  page_size: number;
  comments: BuildComment[];
};

export type BuildError = {
  detail:
    | "LOGIN_REQUIRED"
    | "INVALID_TOKEN"
    | "AUTH_SERVICE_UNAVAILABLE"
    | "BUILD_REGISTERED_USER_REQUIRED"
    | "BUILD_SELF_VOTE_FORBIDDEN"
    | "BUILD_NOT_FOUND"
    | "BUILD_COMMENT_NOT_FOUND"
    | "MODDING_WEAPON_NOT_FOUND"
    | "MODDING_ITEM_NOT_FOUND"
    | "BUILD_VERSION_CONFLICT"
    | "BUILD_REVISION_CONFLICT"
    | "BUILD_REQUEST_CONFLICT"
    | "BUILD_LIMIT_REACHED"
    | "BUILD_COMMENT_RATE_LIMITED"
    | "BUILD_STORAGE_UNAVAILABLE";
};

export type BuildNodeInput = {
  node_id: string;
  parent_node_id?: string | null;
  slot_id?: string | null;
  item_id: string;
  attributes?: Record<string, unknown> | null;
};

export type BuildResponse_BuildCommentPage_ = {
  status: 200;
  msg: "OK";
  data: BuildCommentPage;
};

export type BuildResponse_CreatedComment_ = {
  status: 200;
  msg: "OK";
  data: CreatedComment;
};

export type BuildResponse_DeletedResource_ = {
  status: 200;
  msg: "OK";
  data: DeletedResource;
};

export type BuildResponse_OwnBuildPage_ = {
  status: 200;
  msg: "OK";
  data: OwnBuildPage;
};

export type BuildResponse_PublicBuildPage_ = {
  status: 200;
  msg: "OK";
  data: PublicBuildPage;
};

export type BuildResponse_Union_Workspace__PublishedBuild__ = {
  status: 200;
  msg: "OK";
  data: Workspace | PublishedBuild;
};

export type BuildResponse_UpdatedComment_ = {
  status: 200;
  msg: "OK";
  data: UpdatedComment;
};

export type BuildResponse_VoteResult_ = {
  status: 200;
  msg: "OK";
  data: VoteResult;
};

export type BuildResponse_Workspace_ = {
  status: 200;
  msg: "OK";
  data: Workspace;
};

export type BuildVersion = {
  expected_version: number;
};

export type BuildWarning = {
  node_id: string;
  code: "SOURCE_ITEM_MISSING" | "SOURCE_SLOT_MISSING";
};

export type CopyBuild = {
  revision: number;
  request_id: string;
};

export type CopySource = {
  build_id: string | null;
  revision: number;
  title: string | null;
  author_nickname: string | null;
};

export type CreateBuild = {
  weapon_item_id: string;
  title: string;
  description?: string;
  nodes: BuildNodeInput[];
  request_id: string;
};

export type CreateBuildComment = {
  revision: number;
  request_id: string;
  content: string;
};

export type CreatedComment = {
  id: string;
  version: number;
  revision: number;
};

export type DeletedResource = {
  id: string;
  deleted: true;
};

export type HTTPValidationError = {
  detail?: ValidationError[];
};

export type OwnBuildPage = {
  total: number;
  page: number;
  page_size: number;
  builds: OwnBuildSummary[];
};

export type OwnBuildSummary = {
  id: string;
  title: string;
  weapon_item_id: string;
  version: number;
  is_public: boolean;
  published_revision: number | null;
  created_at: string;
  updated_at: string;
};

export type PublicBuildPage = {
  total: number;
  page: number;
  page_size: number;
  sort: "latest" | "best";
  period: "week" | "month" | "all";
  builds: PublicBuildSummary[];
};

export type PublicBuildSummary = {
  id: string;
  revision: number;
  title: string;
  weapon_item_id: string;
  author_nickname: string | null;
  published_at: string;
  score: number;
  vote_count: number;
  comment_count: number;
  weapon: ItemSummary;
};

export type PublicationRevision = {
  revision: number;
};

export type PublishedBuild = {
  id: string;
  revision: number;
  is_public: boolean;
  is_mine: boolean;
  view: "published";
  content: StoredContent;
  author_nickname: string | null;
  published_at: string;
  copied_from: CopySource | null;
  vote_count: number;
  comment_count: number;
  has_voted: boolean;
  validation_scope: "structure_only";
  warnings: BuildWarning[];
};

export type StoredContent = {
  weapon_item_id: string;
  title: string;
  description: string;
  nodes: StoredNode[];
};

export type StoredNode = {
  node_id: string;
  parent_node_id?: string | null;
  slot_id?: string | null;
  item_id: string;
  attributes?: Record<string, unknown> | null;
  item: ItemSummary;
};

export type UpdateBuild = {
  weapon_item_id: string;
  title: string;
  description?: string;
  nodes: BuildNodeInput[];
  expected_version: number;
};

export type UpdateBuildComment = {
  expected_version: number;
  content: string;
};

export type UpdatedComment = {
  id: string;
  version: number;
};

export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
};

export type VoteResult = {
  id: string;
  revision: number;
  has_voted: boolean;
  vote_count: number;
};

export type Workspace = {
  id: string;
  version: number;
  is_public: boolean;
  published_revision: number | null;
  view: "draft";
  content: StoredContent;
  copied_from: CopySource | null;
  created_at: string;
  updated_at: string;
  validation_scope: "structure_only";
  warnings: BuildWarning[];
};
