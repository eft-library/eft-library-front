import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { apiEndpoints, getCommunityListEndpoint, getCommunitySearchEndpoint } from "@/lib/config/api-endpoints";
import { getApiBaseUrl } from "@/lib/config/app-env";
import type {
  CommunityCommentsResponse,
  CommunityDetailResponse,
  CommunityListResponse,
  CommunityMetaData,
  CommunityMutationResult,
  CommunityPost,
  CommunitySearchResponse,
  CommunitySideResponse,
} from "@/types/api/community";

import type { ApiEnvelope } from "@/lib/api/api-client";

async function requestCommunity<T>(
  path: string,
  init: RequestInit & { accessToken?: string; revalidate?: number } = {},
): Promise<T> {
  const { accessToken, revalidate = 0, headers, ...requestInit } = init;
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...requestInit,
    headers: {
      ...(requestInit.body ? { "Content-Type": "application/json" } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(headers ?? {}),
    },
    cache: revalidate > 0 ? undefined : "no-store",
    next: revalidate > 0 ? { revalidate } : undefined,
  });

  if (!response.ok) {
    throw new Error(`Community API request failed: ${response.status}`);
  }

  const payload = (await response.json()) as ApiEnvelope<T>;
  if (payload.msg !== "OK" || payload.data === null) {
    throw new Error(`Community API returned invalid payload for ${path}`);
  }

  return payload.data;
}

export function getCommunityPosts(category: string, page: number, accessToken?: string) {
  return requestCommunity<CommunityListResponse>(
    getCommunityListEndpoint(category, page),
    { accessToken },
  );
}

export function getCommunitySearch(page: number, word: string, searchType: string, accessToken?: string) {
  return requestCommunity<CommunitySearchResponse>(
    getCommunitySearchEndpoint(page, word, searchType),
    { accessToken },
  );
}

export function getCommunitySidePosts(accessToken?: string) {
  return requestCommunity<CommunitySideResponse>(apiEndpoints.communitySidePost, {
    accessToken,
    revalidate: 60,
  });
}

export function getCommunityDetail(id: string, pageCategory: string, userEmail = "") {
  return requestCommunity<CommunityDetailResponse>(apiEndpoints.communityDetail, {
    method: "POST",
    body: JSON.stringify({ url: id, user_email: userEmail, page_category: pageCategory }),
  });
}

export function getCommunityDetailMetaData(id: string, userEmail = "") {
  return requestCommunity<CommunityMetaData>(apiEndpoints.communityDetailMetaData, {
    method: "POST",
    body: JSON.stringify({ url: id, user_email: userEmail, page_category: "" }),
  });
}

export function increaseCommunityViewCount(postId: string) {
  return requestCommunity<CommunityMutationResult>(apiEndpoints.communityIncreaseViewCount, {
    method: "POST",
    body: JSON.stringify({ post_id: postId }),
  });
}

export function createCommunityPost(
  body: { title: string; category: string; contents: string; nickname: string },
  accessToken: string,
) {
  return authenticatedApiRequest<{ url: string }>(apiEndpoints.communityCreatePost, {
    accessToken,
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function uploadCommunityImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${getApiBaseUrl()}${apiEndpoints.communityUploadImage}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Community image upload failed: ${response.status}`);
  }

  const payload = (await response.json()) as ApiEnvelope<{ image_url: string }>;
  if (payload.msg !== "OK" || !payload.data?.image_url) {
    throw new Error("Community image upload returned invalid payload");
  }

  return payload.data.image_url;
}

export function getCommunityUpdatePost(postId: string, accessToken: string) {
  return authenticatedApiRequest<CommunityPost>(apiEndpoints.communityGetUpdatePostDetail, {
    accessToken,
    method: "POST",
    body: JSON.stringify({ post_id: postId }),
  });
}

export function updateCommunityPost(
  body: { id: string; slug: string; title: string; category: string; contents: string },
  accessToken: string,
) {
  return authenticatedApiRequest<{ url: string }>(apiEndpoints.communityUpdatePost, {
    accessToken,
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function deleteCommunityPost(postId: string, accessToken: string) {
  return authenticatedApiRequest<CommunityMutationResult>(apiEndpoints.communityDeletePostByUser, {
    accessToken,
    method: "POST",
    body: JSON.stringify({ post_id: postId }),
  });
}

export function deleteCommunityPostByAdmin(postId: string, accessToken: string) {
  return authenticatedApiRequest<CommunityMutationResult>(apiEndpoints.communityDeletePostByAdmin, {
    accessToken,
    method: "POST",
    body: JSON.stringify({ post_id: postId }),
  });
}

export function reportCommunityPost(
  body: { post_id: string; reported_email: string; reason_type: string; reason: string },
  accessToken: string,
) {
  return authenticatedApiRequest<CommunityMutationResult>(apiEndpoints.communityReportPost, {
    accessToken,
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function followCommunityUser(
  body: { following_user_email: string; nickname: string },
  accessToken: string,
) {
  return authenticatedApiRequest<CommunityMutationResult>(apiEndpoints.communityFollowUser, {
    accessToken,
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function reactCommunityPost(postId: string, reaction: "like" | "dislike", accessToken: string) {
  return authenticatedApiRequest<CommunityMutationResult>(
    reaction === "like" ? apiEndpoints.communityLikePost : apiEndpoints.communityDislikePost,
    {
      accessToken,
      method: "POST",
      body: JSON.stringify({ post_id: postId }),
    },
  );
}

export function bookmarkCommunityPost(postId: string, accessToken: string) {
  return authenticatedApiRequest<CommunityMutationResult>(apiEndpoints.communityBookmarkPost, {
    accessToken,
    method: "POST",
    body: JSON.stringify({ post_id: postId }),
  });
}

export function getCommunityComments(
  postId: string,
  page: number,
  userEmail = "",
  issueCommentId = "",
) {
  return requestCommunity<CommunityCommentsResponse>(apiEndpoints.commentGet, {
    method: "POST",
    body: JSON.stringify({
      post_id: postId,
      page_num: page,
      user_email: userEmail,
      issue_comment_id: issueCommentId,
    }),
  });
}

export function createCommunityComment(
  body: {
    post_id: string;
    contents: string;
    nickname: string;
    slug: string;
    title: string;
    post_author_email: string;
    parent_comment_id?: string;
  },
  accessToken: string,
) {
  const path = body.parent_comment_id
    ? apiEndpoints.commentInsertChild
    : apiEndpoints.commentInsertParent;

  return authenticatedApiRequest<CommunityMutationResult>(path, {
    accessToken,
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function reactCommunityComment(commentId: string, reaction: "like" | "dislike", accessToken: string) {
  return authenticatedApiRequest<CommunityMutationResult>(
    reaction === "like" ? apiEndpoints.commentLike : apiEndpoints.commentDislike,
    {
      accessToken,
      method: "POST",
      body: JSON.stringify({ comment_id: commentId }),
    },
  );
}

export function updateCommunityComment(commentId: string, contents: string, accessToken: string) {
  return authenticatedApiRequest<CommunityMutationResult>(apiEndpoints.commentUpdate, {
    accessToken,
    method: "POST",
    body: JSON.stringify({ comment_id: commentId, contents }),
  });
}

export function deleteCommunityComment(commentId: string, accessToken: string) {
  return authenticatedApiRequest<CommunityMutationResult>(apiEndpoints.commentDeleteByUser, {
    accessToken,
    method: "POST",
    body: JSON.stringify({ comment_id: commentId }),
  });
}

export function deleteCommunityCommentByAdmin(commentId: string, accessToken: string) {
  return authenticatedApiRequest<CommunityMutationResult>(apiEndpoints.commentDeleteByAdmin, {
    accessToken,
    method: "POST",
    body: JSON.stringify({ comment_id: commentId }),
  });
}

export function reportCommunityComment(
  body: { comment_id: string; reported_email: string; reason_type: string; reason: string },
  accessToken: string,
) {
  return authenticatedApiRequest<CommunityMutationResult>(apiEndpoints.commentReport, {
    accessToken,
    method: "POST",
    body: JSON.stringify(body),
  });
}
