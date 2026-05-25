"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Ban,
  Bookmark,
  CornerDownRight,
  Edit3,
  Flag,
  Link as LinkIcon,
  MessageCircle,
  Pencil,
  Reply,
  Send,
  Shield,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  UserCheck,
  UserPlus,
  UserX,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useSession } from "next-auth/react";

import {
  blockCommunityUser,
  bookmarkCommunityPost,
  createCommunityComment,
  deleteCommunityCommentByAdmin,
  deleteCommunityComment,
  deleteCommunityPostByAdmin,
  deleteCommunityPost,
  followCommunityUser,
  getCommunityComments,
  getCommunityDetail,
  getCommunityDetailMetaData,
  increaseCommunityViewCount,
  reactCommunityComment,
  reactCommunityPost,
  penaltyCommunityUser,
  reportCommunityComment,
  reportCommunityPost,
  reportCommunityUser,
  unblockCommunityUser,
  updateCommunityComment,
} from "@/features/community/api";
import { CommunityPagination } from "@/features/community/components/community-pagination";
import {
  formatCommunityDate,
  getCategoryLabel,
  getCommunityPostUrl,
  getPostIdFromUrlParam,
} from "@/features/community/utils";
import { useAppStore } from "@/components/providers/app-store-provider";
import type {
  CommunityCommentsResponse,
  CommunityComment,
  CommunityDetailResponse,
  CommunityMetaData,
} from "@/types/api/community";

interface CommunityDetailPageProps {
  id: string;
}

const REPORT_REASON_OPTIONS = [
  { value: "spam", label: "스팸/홍보" },
  { value: "abuse", label: "욕설/혐오/괴롭힘" },
  { value: "illegal", label: "불법/부적절한 내용" },
  { value: "other", label: "기타" },
] as const;

const PENALTY_OPTIONS = [
  { value: "1day", label: "1일" },
  { value: "3days", label: "3일" },
  { value: "7days", label: "7일" },
  { value: "14days", label: "14일" },
  { value: "30days", label: "30일" },
  { value: "permanent", label: "영구" },
] as const;

type RestrictionStatus = "none" | "temporary" | "permanent";

function getUserRestrictionStatus(startTime?: string | null, endTime?: string | null): RestrictionStatus {
  if (startTime && endTime === null) {
    return "permanent";
  }

  if (!endTime) {
    return "none";
  }

  return new Date(endTime).getTime() > Date.now() ? "temporary" : "none";
}

function isBlockedUser(
  blocks: Array<{ blocked_email: string }> | undefined,
  targetEmail?: string | null,
) {
  return Boolean(targetEmail && blocks?.some((block) => block.blocked_email === targetEmail));
}

function getCommunityUserDisplayName(userEmail?: string | null, nickname?: string | null) {
  if (nickname?.trim()) {
    return nickname;
  }

  if (userEmail?.trim()) {
    return userEmail.split("@")[0] || userEmail;
  }

  return "익명";
}

export function CommunityDetailPage({ id }: CommunityDetailPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status, update: updateSession } = useSession();
  const locale = useAppStore((state) => state.uiLocale);
  const [detail, setDetail] = useState<CommunityDetailResponse | null>(null);
  const [meta, setMeta] = useState<CommunityMetaData | null>(null);
  const [comments, setComments] = useState<CommunityCommentsResponse | null>(null);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [replyTarget, setReplyTarget] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePopup, setImagePopup] = useState<{ src: string; alt: string } | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [notice, setNotice] = useState("");
  const [reportTarget, setReportTarget] = useState<
    | { type: "post"; id: string; reportedEmail: string }
    | { type: "comment"; id: string; reportedEmail: string }
    | { type: "user"; id: string; reportedEmail: string }
    | null
  >(null);
  const [blockTarget, setBlockTarget] = useState<{ email: string; nickname: string } | null>(null);
  const [penaltyTarget, setPenaltyTarget] = useState<{ email: string; nickname: string } | null>(null);

  const postId = useMemo(() => getPostIdFromUrlParam(id), [id]);
  const issueCommentId = searchParams.get("comment_id") ?? "";
  const commentPage = Math.max(
    issueCommentId ? 0 : 1,
    Number(searchParams.get("comment_page") ?? searchParams.get("page") ?? (issueCommentId ? "0" : "1")) || (issueCommentId ? 0 : 1),
  );
  const userEmail = session?.userInfo?.email ?? session?.user?.email ?? "";
  const restrictionStatus = getUserRestrictionStatus(session?.userInfo?.start_time, session?.userInfo?.end_time);
  const isCommentRestricted = restrictionStatus !== "none";

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    getCommunityDetail(id, "", userEmail)
      .then((nextDetail) => {
        if (!ignore) {
          setDetail(nextDetail);
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [id, userEmail]);

  useEffect(() => {
    let ignore = false;

    getCommunityDetailMetaData(id, userEmail)
      .then((nextMeta) => {
        if (!ignore) {
          setMeta(nextMeta);
        }
      })
      .catch(() => undefined);

    setCommentsError(null);
    getCommunityComments(postId, commentPage, userEmail, issueCommentId)
      .then((nextComments) => {
        if (!ignore) {
          setComments(nextComments);
        }
      })
      .catch(() => {
        if (!ignore) {
          setComments(null);
          setCommentsError("댓글을 불러오지 못했습니다.");
        }
      });

    return () => {
      ignore = true;
    };
  }, [commentPage, id, issueCommentId, postId, userEmail]);

  useEffect(() => {
    const storageKey = `community-view:${id}`;
    if (typeof window === "undefined" || window.sessionStorage.getItem(storageKey)) {
      return;
    }
    window.sessionStorage.setItem(storageKey, "1");
    increaseCommunityViewCount(id).catch(() => undefined);
  }, [id]);

  async function refreshMetaAndComments() {
    const nextMeta = await getCommunityDetailMetaData(id, userEmail).catch(() => null);
    const nextComments = await getCommunityComments(postId, commentPage, userEmail, issueCommentId);
    if (nextMeta) {
      setMeta(nextMeta);
    }
    setComments(nextComments);
    setCommentsError(null);
  }

  useEffect(() => {
    if (!issueCommentId || !comments) {
      return;
    }

    const element = document.getElementById(`community-comment-${issueCommentId}`);
    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    element.classList.add("ring-2", "ring-orange-400", "ring-offset-2", "dark:ring-offset-[#1f232b]");
    window.setTimeout(() => {
      element.classList.remove("ring-2", "ring-orange-400", "ring-offset-2", "dark:ring-offset-[#1f232b]");
    }, 2200);
  }, [comments, issueCommentId]);

  async function refreshDetail() {
    const nextDetail = await getCommunityDetail(id, "", userEmail);
    setDetail(nextDetail);
  }

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  async function requireLogin() {
    if (!session?.accessToken) {
      showNotice("로그인이 필요한 기능입니다.");
      return false;
    }
    return true;
  }

  async function submitReaction(reaction: "like" | "dislike") {
    if (!(await requireLogin())) {
      return;
    }
    await reactCommunityPost(postId, reaction, session!.accessToken);
    await refreshMetaAndComments();
  }

  async function submitBookmark() {
    if (!(await requireLogin())) {
      return;
    }
    await bookmarkCommunityPost(postId, session!.accessToken);
    await refreshMetaAndComments();
  }

  async function submitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!(await requireLogin()) || !detail) {
      return;
    }
    if (isCommentRestricted) {
      showNotice("현재 댓글 작성이 제한된 상태입니다.");
      return;
    }
    const contents = commentText.trim();
    if (!contents) {
      return;
    }
    await createCommunityComment(
      {
        post_id: postId,
        contents,
        nickname: session?.userInfo?.nickname ?? session?.user?.name ?? "User",
        slug: detail.post_detail.slug,
        title: detail.post_detail.title,
        post_author_email: detail.post_detail.user_email,
        ...(replyTarget ? { parent_comment_id: replyTarget } : {}),
      },
      session!.accessToken,
    );
    setCommentText("");
    setReplyTarget(null);
    await refreshMetaAndComments();
  }

  async function deletePost() {
    if (!session?.accessToken || !window.confirm("게시글을 삭제할까요?")) {
      return;
    }
    await deleteCommunityPost(postId, session.accessToken);
    router.push(`/community/${detail?.post_detail.category ?? "free"}`);
  }

  async function deletePostAsAdmin() {
    if (!session?.accessToken || !window.confirm("관리자 권한으로 게시글을 삭제할까요?")) {
      return;
    }
    await deleteCommunityPostByAdmin(postId, session.accessToken);
    router.push(`/community/${detail?.post_detail.category ?? "free"}`);
  }

  async function toggleFollow() {
    if (!(await requireLogin()) || !detail?.author_detail) {
      return;
    }
    await followCommunityUser(
      {
        following_user_email: detail.author_detail.user_email,
        nickname: detail.author_detail.nickname ?? detail.post_detail.nickname ?? "User",
      },
      session!.accessToken,
    );
    await refreshDetail();
  }

  async function submitCommentUpdate(commentId: string) {
    if (!(await requireLogin())) {
      return;
    }
    const contents = editingCommentText.trim();
    if (!contents) {
      return;
    }
    await updateCommunityComment(commentId, contents, session!.accessToken);
    setEditingCommentId(null);
    setEditingCommentText("");
    await refreshMetaAndComments();
  }

  async function submitReply(parentCommentId: string, contents: string) {
    if (!(await requireLogin()) || !detail) {
      return;
    }
    if (isCommentRestricted) {
      showNotice("현재 댓글 작성이 제한된 상태입니다.");
      return;
    }
    const trimmed = contents.trim();
    if (!trimmed) {
      return;
    }
    await createCommunityComment(
      {
        post_id: postId,
        contents: trimmed,
        nickname: session?.userInfo?.nickname ?? session?.user?.name ?? "User",
        slug: detail.post_detail.slug,
        title: detail.post_detail.title,
        post_author_email: detail.post_detail.user_email,
        parent_comment_id: parentCommentId,
      },
      session!.accessToken,
    );
    await refreshMetaAndComments();
  }

  async function openReportTarget(
    target:
      | { type: "post"; id: string; reportedEmail: string }
      | { type: "comment"; id: string; reportedEmail: string }
      | { type: "user"; id: string; reportedEmail: string },
  ) {
    if (!(await requireLogin())) {
      return;
    }
    setReportTarget(target);
  }

  async function updateUserBlocksFromResult(result: unknown[] | number | undefined) {
    if (!Array.isArray(result)) {
      return;
    }

    await updateSession({
      ...session,
      userInfo: {
        ...session?.userInfo,
        user_blocks: result,
      },
    });
  }

  async function submitBlockUser(reason: string) {
    if (!(await requireLogin()) || !blockTarget) {
      return;
    }

    const result = await blockCommunityUser(
      { blocked_email: blockTarget.email, reason },
      session!.accessToken,
    );
    await updateUserBlocksFromResult(result.result);
    setBlockTarget(null);
    showNotice("사용자를 차단했습니다.");
  }

  async function submitUnblockUser(targetEmail: string) {
    if (!(await requireLogin())) {
      return;
    }

    const result = await unblockCommunityUser(targetEmail, session!.accessToken);
    await updateUserBlocksFromResult(result.result);
    showNotice("차단을 해제했습니다.");
  }

  async function submitPenaltyUser(penalty: string, reason: string) {
    if (!(await requireLogin()) || !penaltyTarget) {
      return;
    }

    await penaltyCommunityUser(
      { user_email: penaltyTarget.email, penalty, reason },
      session!.accessToken,
    );
    setPenaltyTarget(null);
    showNotice("사용자 제재를 적용했습니다.");
  }

  function openContentImage(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target;
    if (!(target instanceof HTMLImageElement) || !target.src) {
      return;
    }
    setImagePopup({ src: target.src, alt: target.alt || post.title });
  }

  if (isLoading) {
    return (
      <main className="bg-gray-50 py-10 dark:bg-[#1f232b]">
        <div className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-white p-12 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-[#252932] dark:text-gray-400">
          게시글을 불러오는 중입니다.
        </div>
      </main>
    );
  }

  if (!detail) {
    return (
      <main className="bg-gray-50 py-10 dark:bg-[#1f232b]">
        <div className="mx-auto max-w-4xl rounded-lg border border-red-200 bg-red-50 p-12 text-center text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
          게시글을 찾을 수 없습니다.
        </div>
      </main>
    );
  }

  const post = detail.post_detail;
  const isAuthor = status === "authenticated" && userEmail && userEmail === post.user_email;
  const isAdmin = status === "authenticated" && Boolean(session?.userInfo?.is_admin);
  const isFollowing = detail.author_detail?.is_follow === true || detail.author_detail?.is_follow === 1;
  const isPostAuthorBlocked = isBlockedUser(session?.userInfo?.user_blocks, post.user_email);
  const postAuthorName = getCommunityUserDisplayName(post.user_email, post.nickname);
  const authorPanelName = getCommunityUserDisplayName(
    detail.author_detail?.user_email ?? post.user_email,
    detail.author_detail?.nickname ?? post.nickname,
  );

  return (
    <main className="bg-gray-50 py-8 text-gray-950 dark:bg-[#1f232b] dark:text-gray-50">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <div className="min-w-0 space-y-4">
          <Link
            href={`/community/${post.category}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-300"
          >
            <ArrowLeft className="h-4 w-4" />
            목록으로
          </Link>

          <article className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700/70 dark:bg-[#252932]">
          <header className="border-b border-gray-100 p-5 dark:border-gray-700/60">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Link href={`/community/${post.category}`} className="rounded bg-orange-100 px-2 py-1 font-bold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                {getCategoryLabel(post.category, locale)}
              </Link>
              <span className="text-gray-500 dark:text-gray-400">{postAuthorName}</span>
              <span className="text-gray-400">{formatCommunityDate(post.create_time)}</span>
            </div>
            <h1 className="mt-3 text-2xl font-black leading-snug">{post.title}</h1>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>조회 {post.view_count ?? 0}</span>
              <span>댓글 {post.comment_count ?? comments?.total ?? 0}</span>
              <span>추천 {meta?.like_count ?? post.reaction_score ?? 0}</span>
            </div>
          </header>

          {isPostAuthorBlocked && !isAuthor ? (
            <div className="m-5 rounded-lg border border-gray-200 bg-gray-50 p-5 text-sm font-semibold text-gray-500 dark:border-gray-700 dark:bg-[#1f232b] dark:text-gray-400">
              <div className="flex items-center gap-2">
                <UserX className="h-4 w-4" />
                차단한 사용자의 게시글입니다.
              </div>
            </div>
          ) : (
            <div
              onClick={openContentImage}
              className="rich-html-content p-5 [&_img]:cursor-zoom-in"
              dangerouslySetInnerHTML={{ __html: post.contents }}
            />
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 border-t border-gray-100 p-5 dark:border-gray-700/60">
            <button
              type="button"
              onClick={() => submitReaction("like")}
              className={`inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-bold transition ${
                meta?.is_like === 1
                  ? "border-orange-500 bg-orange-500 text-white"
                  : "border-gray-200 text-gray-700 hover:border-orange-300 hover:text-orange-600 dark:border-gray-700 dark:text-gray-200"
              }`}
            >
              <ThumbsUp className="h-4 w-4" />
              추천
            </button>
            <button
              type="button"
              onClick={() => submitReaction("dislike")}
              className={`inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-bold transition ${
                meta?.is_like === 0
                  ? "border-gray-700 bg-gray-700 text-white"
                  : "border-gray-200 text-gray-700 hover:border-gray-400 dark:border-gray-700 dark:text-gray-200"
              }`}
            >
              <ThumbsDown className="h-4 w-4" />
              비추천
            </button>
            <button
              type="button"
              onClick={submitBookmark}
              className={`inline-flex h-10 items-center gap-2 rounded-md border px-4 text-sm font-bold transition ${
                meta?.is_bookmarked
                  ? "border-sky-500 bg-sky-500 text-white"
                  : "border-gray-200 text-gray-700 hover:border-sky-300 hover:text-sky-600 dark:border-gray-700 dark:text-gray-200"
              }`}
            >
              <Bookmark className="h-4 w-4" />
              북마크
            </button>
            {isAuthor ? (
              <>
                <Link
                  href={`/community/update/${post.id}-${post.slug}`}
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-gray-200 px-4 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-600 dark:border-gray-700 dark:text-gray-200"
                >
                  <Edit3 className="h-4 w-4" />
                  수정
                </Link>
                <button
                  type="button"
                  onClick={deletePost}
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-red-200 px-4 text-sm font-bold text-red-600 transition hover:bg-red-50 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                  삭제
                </button>
              </>
            ) : null}
            {!isAuthor ? (
              <button
                type="button"
                onClick={() => openReportTarget({ type: "post", id: postId, reportedEmail: post.user_email })}
                className="inline-flex h-10 items-center gap-2 rounded-md border border-gray-200 px-4 text-sm font-bold text-gray-700 transition hover:border-red-300 hover:text-red-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-red-500 dark:hover:text-red-300"
              >
                <Flag className="h-4 w-4" />
                신고
              </button>
            ) : null}
            {isAdmin && !isAuthor ? (
              <button
                type="button"
                onClick={deletePostAsAdmin}
                className="inline-flex h-10 items-center gap-2 rounded-md border border-red-200 px-4 text-sm font-bold text-red-600 transition hover:bg-red-50 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
                관리자 삭제
              </button>
            ) : null}
          </div>

          <section className="border-t border-gray-100 p-5 dark:border-gray-700/60">
            <h2 className="flex items-center gap-2 text-lg font-black">
              <MessageCircle className="h-5 w-5 text-orange-500" />
              댓글 {comments?.total ?? 0}
            </h2>
            <form onSubmit={submitComment} className="mt-4 space-y-2">
              {isCommentRestricted ? (
                <CommentRestrictionNotice
                  status={restrictionStatus}
                  endTime={session?.userInfo?.end_time}
                  reason={session?.userInfo?.reason}
                />
              ) : null}
              {replyTarget && !isCommentRestricted ? (
                <div className="flex items-center justify-between rounded-md bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-200">
                  답글 작성 중
                  <button type="button" onClick={() => setReplyTarget(null)}>
                    취소
                  </button>
                </div>
              ) : null}
              <textarea
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                rows={3}
                disabled={isCommentRestricted}
                placeholder={
                  isCommentRestricted
                    ? "댓글 작성이 제한된 상태입니다."
                    : session?.accessToken
                      ? "댓글을 입력해 주세요."
                      : "로그인 후 댓글을 작성할 수 있습니다."
                }
                className="w-full rounded-md border border-gray-200 bg-gray-50 p-3 text-sm outline-none focus:border-orange-300 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-[#1f232b]"
              />
              <div className="flex justify-end">
                <button type="submit" disabled={isCommentRestricted} className="h-9 rounded-md bg-orange-500 px-4 text-sm font-bold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50">
                  등록
                </button>
              </div>
            </form>

            <div className="mt-5 space-y-4">
              {commentsError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
                  {commentsError}
                </div>
              ) : null}
              {(comments?.issue_comments ?? []).length > 0 ? (
                <div className="space-y-2 rounded-lg border border-yellow-200 bg-yellow-50/70 p-3 dark:border-yellow-500/30 dark:bg-yellow-500/10">
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-yellow-700 dark:text-yellow-300">
                    Issue Comments
                  </div>
                  {(comments?.issue_comments ?? []).map((comment) => (
                    <IssueCommentCard key={`issue-${comment.id}`} comment={comment} postId={id} />
                  ))}
                </div>
              ) : null}

              {(comments?.comments ?? []).map((comment) => (
                <CommunityCommentCard
                  key={comment.id}
                  comment={comment}
                  isAdmin={isAdmin}
                  isEditing={editingCommentId === comment.id}
                  editText={editingCommentText}
                  currentUserEmail={userEmail}
                  onEditTextChange={setEditingCommentText}
                  onCancelEdit={() => {
                    setEditingCommentId(null);
                    setEditingCommentText("");
                  }}
                  onStartEdit={() => {
                    setEditingCommentId(comment.id);
                    setEditingCommentText(comment.contents);
                  }}
                  onSubmitEdit={() => submitCommentUpdate(comment.id)}
                  onReply={submitReply}
                  onReact={async (reaction) => {
                    if (await requireLogin()) {
                      await reactCommunityComment(comment.id, reaction, session!.accessToken);
                      await refreshMetaAndComments();
                    }
                  }}
                  onDeleteUser={async () => {
                    if (session?.accessToken && window.confirm("댓글을 삭제할까요?")) {
                      await deleteCommunityComment(comment.id, session.accessToken);
                      await refreshMetaAndComments();
                    }
                  }}
                  onDeleteAdmin={async () => {
                    if (session?.accessToken && window.confirm("관리자 권한으로 댓글을 삭제할까요?")) {
                      await deleteCommunityCommentByAdmin(comment.id, session.accessToken);
                      await refreshMetaAndComments();
                    }
                  }}
                  onReport={() => openReportTarget({ type: "comment", id: comment.id, reportedEmail: comment.user_email })}
                  requireLogin={requireLogin}
                  isCommentRestricted={isCommentRestricted}
                  onRestrictedComment={() => showNotice("현재 댓글 작성이 제한된 상태입니다.")}
                  isBlocked={isBlockedUser(session?.userInfo?.user_blocks, comment.user_email)}
                />
              ))}
              {!commentsError && comments && comments.total > 0 && comments.comments.length === 0 && comments.issue_comments.length === 0 ? (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm font-semibold text-yellow-800 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-200">
                  댓글 수는 존재하지만 표시 가능한 댓글 데이터가 없습니다. 댓글 작성자 정보가 누락되었거나 삭제된 데이터일 수 있습니다.
                </div>
              ) : null}
              {!commentsError && comments && comments.total === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-[#252932] dark:text-gray-400">
                  아직 댓글이 없습니다.
                </div>
              ) : null}
            </div>
            <CommunityPagination
              page={comments?.current_page_num || 1}
              maxPage={comments?.max_page_count ?? 1}
              onPageChange={(nextPage) => router.push(`/community/detail/${id}?comment_page=${nextPage}`)}
            />
          </section>
          </article>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700/70 dark:bg-[#252932]">
            <h2 className="text-sm font-black">작성자</h2>
            <p className="mt-3 text-lg font-black">{authorPanelName}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded-md bg-gray-50 p-3 dark:bg-[#1f232b]">
                <span className="block text-gray-500 dark:text-gray-400">게시글</span>
                <strong className="mt-1 block">{detail.author_detail?.posts_count ?? 0}</strong>
              </div>
              <div className="rounded-md bg-gray-50 p-3 dark:bg-[#1f232b]">
                <span className="block text-gray-500 dark:text-gray-400">추천</span>
                <strong className="mt-1 block">{detail.author_detail?.like_count ?? 0}</strong>
              </div>
            </div>
            {userEmail !== detail.author_detail?.user_email ? (
              <div className="mt-3 grid gap-2">
                <button
                  type="button"
                  onClick={toggleFollow}
                  className={`inline-flex h-9 w-full items-center justify-center gap-2 rounded-md text-sm font-bold transition ${
                    isFollowing
                      ? "border border-gray-200 text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:text-gray-200"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }`}
                >
                  {isFollowing ? <UserCheck className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                  {isFollowing ? "팔로잉" : "팔로우"}
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => openReportTarget({ type: "user", id: post.user_email, reportedEmail: post.user_email })}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-gray-200 text-xs font-bold text-gray-700 transition hover:border-red-300 hover:text-red-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-red-500 dark:hover:text-red-300"
                  >
                    <Flag className="h-3.5 w-3.5" />
                    사용자 신고
                  </button>
                  {isPostAuthorBlocked ? (
                    <button
                      type="button"
                      onClick={() => submitUnblockUser(post.user_email)}
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-sky-200 text-xs font-bold text-sky-700 transition hover:bg-sky-50 dark:border-sky-500/30 dark:text-sky-300 dark:hover:bg-sky-500/10"
                    >
                      <UserCheck className="h-3.5 w-3.5" />
                      차단 해제
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setBlockTarget({ email: post.user_email, nickname: postAuthorName })}
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-gray-200 text-xs font-bold text-gray-700 transition hover:border-red-300 hover:text-red-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-red-500 dark:hover:text-red-300"
                    >
                      <UserX className="h-3.5 w-3.5" />
                      차단
                    </button>
                  )}
                </div>
                {isAdmin ? (
                  <button
                    type="button"
                    onClick={() => setPenaltyTarget({ email: post.user_email, nickname: postAuthorName })}
                    className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-red-200 text-sm font-bold text-red-600 transition hover:bg-red-50 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10"
                  >
                    <Shield className="h-4 w-4" />
                    사용자 제재
                  </button>
                ) : null}
              </div>
            ) : null}
          </section>
          <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700/70 dark:bg-[#252932]">
            <h2 className="text-sm font-black">같은 게시판 글</h2>
            <div className="mt-3 space-y-2">
              {detail.posts.posts.slice(0, 6).map((item) => (
                <Link key={item.id} href={getCommunityPostUrl(item)} target="_blank" rel="noreferrer" className="block rounded-md px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-700 dark:text-gray-300 dark:hover:bg-[#303540] dark:hover:text-orange-300">
                  <span className="line-clamp-1">{item.title}</span>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
      <CommunityImagePopup image={imagePopup} onClose={() => setImagePopup(null)} />
      <CommunityReportDialog
        target={reportTarget}
        accessToken={session?.accessToken}
        onLoginRequired={() => showNotice("로그인이 필요한 기능입니다.")}
        onClose={() => setReportTarget(null)}
        onSubmit={async (reasonType, reason) => {
          if (!(await requireLogin()) || !reportTarget) {
            return;
          }
          if (reportTarget.type === "post") {
            await reportCommunityPost(
              {
                post_id: reportTarget.id,
                reported_email: reportTarget.reportedEmail,
                reason_type: reasonType,
                reason,
              },
              session!.accessToken,
            );
          } else if (reportTarget.type === "comment") {
            await reportCommunityComment(
              {
                comment_id: reportTarget.id,
                reported_email: reportTarget.reportedEmail,
                reason_type: reasonType,
                reason,
              },
              session!.accessToken,
            );
          } else {
            await reportCommunityUser(
              {
                reported_email: reportTarget.reportedEmail,
                reason_type: reasonType,
                reason,
              },
              session!.accessToken,
            );
          }
          setReportTarget(null);
        }}
      />
      <CommunityBlockDialog
        target={blockTarget}
        onClose={() => setBlockTarget(null)}
        onSubmit={submitBlockUser}
      />
      <CommunityPenaltyDialog
        target={penaltyTarget}
        onClose={() => setPenaltyTarget(null)}
        onSubmit={submitPenaltyUser}
      />
      {notice ? (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-lg bg-gray-950 px-4 py-2 text-sm font-semibold text-white shadow-lg dark:bg-white dark:text-gray-950">
          {notice}
        </div>
      ) : null}
    </main>
  );
}

function IssueCommentCard({
  comment,
  postId,
}: {
  comment: CommunityComment;
  postId: string;
}) {
  const isDeleted = comment.delete_by_admin || comment.delete_by_user;
  const commentAuthorName = getCommunityUserDisplayName(comment.user_email, comment.nickname);

  return (
    <Link
      href={`/community/detail/${postId}?comment_id=${comment.id}`}
      className="block rounded-md border border-yellow-200 bg-white p-3 text-sm transition hover:border-yellow-300 hover:bg-yellow-100/60 dark:border-yellow-500/30 dark:bg-[#252932] dark:hover:bg-yellow-500/10"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-gray-900 dark:text-white">{commentAuthorName}</span>
            <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-[11px] font-black text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-200">
              ISSUE
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{formatCommunityDate(comment.create_time)}</span>
          </div>
          {comment.depth > 1 && comment.parent_nickname ? (
            <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-300">
              <CornerDownRight className="h-3.5 w-3.5" />
              @{comment.parent_nickname}
            </div>
          ) : null}
          <p className="mt-2 line-clamp-2 whitespace-pre-wrap text-gray-700 dark:text-gray-200">
            {isDeleted
              ? comment.delete_by_admin
                ? "관리자가 삭제한 댓글입니다."
                : "사용자가 삭제한 댓글입니다."
              : comment.contents}
          </p>
        </div>
        <LinkIcon className="mt-1 h-4 w-4 shrink-0 text-yellow-700 dark:text-yellow-300" />
      </div>
    </Link>
  );
}

function CommentRestrictionNotice({
  status,
  endTime,
  reason,
}: {
  status: RestrictionStatus;
  endTime?: string | null;
  reason?: string | null;
}) {
  if (status === "none") {
    return null;
  }

  const isPermanent = status === "permanent";

  return (
    <div
      className={`rounded-lg border p-4 text-sm ${
        isPermanent
          ? "border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200"
          : "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-200"
      }`}
    >
      <div className="flex items-start gap-2">
        <Ban className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <p className="font-black">
            {isPermanent ? "댓글 작성이 영구적으로 제한되었습니다." : "댓글 작성이 일시적으로 제한되었습니다."}
          </p>
          {!isPermanent && endTime ? (
            <p className="mt-1">
              제재 해제 시간: <span className="font-mono">{new Date(endTime).toLocaleString()}</span>
            </p>
          ) : null}
          {reason ? <p className="mt-1 text-xs opacity-90">{reason}</p> : null}
        </div>
      </div>
    </div>
  );
}

function CommunityCommentCard({
  comment,
  isAdmin,
  isEditing,
  editText,
  currentUserEmail,
  onEditTextChange,
  onCancelEdit,
  onStartEdit,
  onSubmitEdit,
  onReply,
  onReact,
  onDeleteUser,
  onDeleteAdmin,
  onReport,
  requireLogin,
  isCommentRestricted,
  onRestrictedComment,
  isBlocked,
}: {
  comment: CommunityComment;
  isAdmin: boolean;
  isEditing: boolean;
  editText: string;
  currentUserEmail: string;
  onEditTextChange: (value: string) => void;
  onCancelEdit: () => void;
  onStartEdit: () => void;
  onSubmitEdit: () => void;
  onReply: (parentCommentId: string, contents: string) => Promise<void>;
  onReact: (reaction: "like" | "dislike") => Promise<void>;
  onDeleteUser: () => Promise<void>;
  onDeleteAdmin: () => Promise<void>;
  onReport: () => void;
  requireLogin: () => Promise<boolean>;
  isCommentRestricted: boolean;
  onRestrictedComment: () => void;
  isBlocked: boolean;
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const isOwner = Boolean(currentUserEmail && currentUserEmail === comment.user_email);
  const isDeleted = comment.delete_by_admin || comment.delete_by_user;
  const isHiddenByBlock = isBlocked && !isOwner && !isDeleted;
  const commentAuthorName = getCommunityUserDisplayName(comment.user_email, comment.nickname);
  const isUpdated = !isDeleted && comment.create_time !== comment.update_time;
  const depth = Math.max(1, Math.min(comment.depth || 1, 5));
  const indent = depth > 1 ? (depth - 1) * 24 : 0;

  async function submitReply() {
    if (!(await requireLogin())) {
      return;
    }
    if (isCommentRestricted) {
      onRestrictedComment();
      return;
    }
    const contents = replyText.trim();
    if (!contents) {
      return;
    }
    await onReply(comment.id, contents);
    setReplyText("");
    setIsReplying(false);
  }

  return (
    <div id={`community-comment-${comment.id}`} className="relative scroll-mt-28 transition" style={{ marginLeft: `${indent}px` }}>
      {depth > 1 ? (
        <>
          <div
            className="absolute top-0 w-px bg-gradient-to-b from-sky-200 via-sky-300 to-transparent dark:from-sky-900 dark:via-sky-700"
            style={{ left: "-14px", height: "52px" }}
          />
          <div className="absolute top-6 h-px w-3 bg-sky-300 dark:bg-sky-700" style={{ left: "-14px" }} />
        </>
      ) : null}

      <article className="relative rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md dark:border-gray-700/70 dark:bg-[#1f232b] dark:hover:border-orange-500/40">
        {depth > 1 ? (
          <span className="absolute -left-2 top-5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-sky-300 bg-white dark:border-sky-700 dark:bg-[#1f232b]">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
          </span>
        ) : null}

        <header className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-gray-900 dark:text-white">{commentAuthorName}</span>
              {depth > 1 ? (
                <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-bold text-sky-600 dark:bg-sky-500/15 dark:text-sky-300">
                  답글
                </span>
              ) : null}
              {comment.parent_nickname ? (
                <span className="text-xs font-semibold text-sky-600 dark:text-sky-300">@{comment.parent_nickname}</span>
              ) : null}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{formatCommunityDate(comment.create_time)}</span>
              {isUpdated ? <span>수정됨 {formatCommunityDate(comment.update_time)}</span> : null}
            </div>
          </div>
        </header>

        <div className="mt-3">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editText}
                onChange={(event) => onEditTextChange(event.target.value)}
                rows={3}
                className="w-full rounded-md border border-gray-200 bg-gray-50 p-3 text-sm leading-6 outline-none focus:border-orange-300 dark:border-gray-700 dark:bg-[#252932]"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onCancelEdit}
                  className="h-8 rounded-md border border-gray-200 px-3 text-xs font-bold text-gray-700 dark:border-gray-700 dark:text-gray-200"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={onSubmitEdit}
                  className="h-8 rounded-md bg-orange-500 px-3 text-xs font-bold text-white hover:bg-orange-600"
                >
                  저장
                </button>
              </div>
            </div>
          ) : isDeleted ? (
            <p className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-sm italic text-gray-500 dark:bg-[#252932] dark:text-gray-400">
              <AlertTriangle className="h-4 w-4" />
              {comment.delete_by_admin ? "관리자가 삭제한 댓글입니다." : "사용자가 삭제한 댓글입니다."}
            </p>
          ) : isHiddenByBlock ? (
            <p className="inline-flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-sm italic text-gray-500 dark:bg-[#252932] dark:text-gray-400">
              <UserX className="h-4 w-4" />
              차단한 사용자의 댓글입니다.
            </p>
          ) : (
            <p className="whitespace-pre-wrap text-sm font-medium leading-7 text-gray-800 dark:text-gray-200">
              {comment.contents}
            </p>
          )}
        </div>

        {!isDeleted && !isHiddenByBlock ? (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3 text-xs dark:border-gray-700/70">
            <button
              type="button"
              onClick={() => onReact("like")}
              className={`inline-flex h-8 items-center gap-1 rounded-full px-3 font-bold transition ${
                comment.is_like === 1
                  ? "bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-300"
                  : "text-gray-500 hover:bg-green-50 hover:text-green-700 dark:text-gray-400 dark:hover:bg-green-500/15 dark:hover:text-green-300"
              }`}
            >
              <ThumbsUp className="h-4 w-4" />
              {comment.like_count}
            </button>
            <button
              type="button"
              onClick={() => onReact("dislike")}
              className={`inline-flex h-8 items-center gap-1 rounded-full px-3 font-bold transition ${
                comment.is_like === 0
                  ? "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-300"
                  : "text-gray-500 hover:bg-red-50 hover:text-red-700 dark:text-gray-400 dark:hover:bg-red-500/15 dark:hover:text-red-300"
              }`}
            >
              <ThumbsDown className="h-4 w-4" />
              {comment.dislike_count}
            </button>
            <button
              type="button"
              onClick={async () => {
                if (!(await requireLogin())) {
                  return;
                }
                if (isCommentRestricted) {
                  onRestrictedComment();
                  return;
                }
                {
                  setIsReplying((value) => !value);
                }
              }}
              className="inline-flex h-8 items-center gap-1 rounded-full px-3 font-bold text-gray-500 transition hover:bg-sky-50 hover:text-sky-700 dark:text-gray-400 dark:hover:bg-sky-500/15 dark:hover:text-sky-300"
            >
              <Reply className="h-4 w-4" />
              답글
            </button>
            {isOwner ? (
              <button
                type="button"
                onClick={onStartEdit}
                className="inline-flex h-8 items-center gap-1 rounded-full px-3 font-bold text-gray-500 transition hover:bg-orange-50 hover:text-orange-700 dark:text-gray-400 dark:hover:bg-orange-500/15 dark:hover:text-orange-300"
              >
                <Pencil className="h-4 w-4" />
                수정
              </button>
            ) : null}
            {isOwner ? (
              <button
                type="button"
                onClick={onDeleteUser}
                className="inline-flex h-8 items-center gap-1 rounded-full px-3 font-bold text-red-500 transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-500/15"
              >
                <Trash2 className="h-4 w-4" />
                삭제
              </button>
            ) : null}
            {!isOwner ? (
              <button
                type="button"
                onClick={onReport}
                className="inline-flex h-8 items-center gap-1 rounded-full px-3 font-bold text-gray-500 transition hover:bg-red-50 hover:text-red-700 dark:text-gray-400 dark:hover:bg-red-500/15 dark:hover:text-red-300"
              >
                <Flag className="h-4 w-4" />
                신고
              </button>
            ) : null}
            {isAdmin && !isOwner ? (
              <button
                type="button"
                onClick={onDeleteAdmin}
                className="inline-flex h-8 items-center gap-1 rounded-full px-3 font-bold text-red-500 transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-500/15"
              >
                <Trash2 className="h-4 w-4" />
                관리자 삭제
              </button>
            ) : null}
          </div>
        ) : null}

        {isReplying ? (
          <div className="mt-4 rounded-lg border border-sky-100 bg-sky-50/60 p-3 dark:border-sky-500/20 dark:bg-sky-500/10">
            <textarea
              value={replyText}
              onChange={(event) => setReplyText(event.target.value)}
              rows={3}
              className="w-full rounded-md border border-sky-200 bg-white p-3 text-sm leading-6 outline-none focus:border-sky-400 dark:border-sky-500/30 dark:bg-[#252932]"
              placeholder={`${commentAuthorName} 님에게 답글을 작성하세요.`}
            />
            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsReplying(false);
                  setReplyText("");
                }}
                className="h-8 rounded-md border border-gray-200 px-3 text-xs font-bold text-gray-700 dark:border-gray-700 dark:text-gray-200"
              >
                취소
              </button>
              <button
                type="button"
                onClick={submitReply}
                className="inline-flex h-8 items-center gap-1 rounded-md bg-sky-600 px-3 text-xs font-bold text-white hover:bg-sky-700"
              >
                <Send className="h-3.5 w-3.5" />
                답글 작성
              </button>
            </div>
          </div>
        ) : null}
      </article>
    </div>
  );
}

function CommunityImagePopup({
  image,
  onClose,
}: {
  image: { src: string; alt: string } | null;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(0.75);

  useEffect(() => {
    if (!image) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  useEffect(() => {
    setZoom(0.75);
  }, [image?.src]);

  if (!image) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="flex max-h-[88vh] w-[84vw] flex-col overflow-hidden rounded-lg border border-white/10 bg-white shadow-2xl dark:bg-[#1f232b]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-2 border-b border-gray-200 px-3 py-2 dark:border-gray-700">
          <div className="min-w-0 truncate text-sm font-bold text-gray-800 dark:text-gray-100">{image.alt}</div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setZoom((value) => Math.max(0.5, Number((value - 0.25).toFixed(2))))} className="h-8 w-8 rounded-md border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-200" aria-label="축소">
              <ZoomOut className="mx-auto h-4 w-4" />
            </button>
            <span className="w-12 text-center text-xs font-bold text-gray-500 dark:text-gray-300">{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={() => setZoom((value) => Math.min(3, Number((value + 0.25).toFixed(2))))} className="h-8 w-8 rounded-md border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-200" aria-label="확대">
              <ZoomIn className="mx-auto h-4 w-4" />
            </button>
            <button type="button" onClick={onClose} className="h-8 w-8 rounded-md border border-gray-200 text-gray-700 dark:border-gray-700 dark:text-gray-200" aria-label="닫기">
              <X className="mx-auto h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-gray-100 p-4 dark:bg-[#15181f]">
          <img src={image.src} alt={image.alt} className="mx-auto h-auto max-w-none rounded-md" style={{ width: `${zoom * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

function CommunityReportDialog({
  target,
  accessToken,
  onLoginRequired,
  onClose,
  onSubmit,
}: {
  target: { type: "post" | "comment" | "user"; id: string; reportedEmail: string } | null;
  accessToken?: string;
  onLoginRequired: () => void;
  onClose: () => void;
  onSubmit: (reasonType: string, reason: string) => Promise<void>;
}) {
  const [reasonType, setReasonType] = useState("spam");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (target) {
      setReasonType("spam");
      setReason("");
    }
  }, [target]);

  if (!target) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!accessToken) {
            onLoginRequired();
            return;
          }
          setIsSubmitting(true);
          try {
            await onSubmit(reasonType, reason.trim());
          } finally {
            setIsSubmitting(false);
          }
        }}
        className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-[#252932]"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-gray-950 dark:text-gray-50">
            {target.type === "user" ? "사용자 신고" : "신고하기"}
          </h2>
          <button type="button" onClick={onClose} className="h-8 w-8 rounded-md border border-gray-200 dark:border-gray-700">
            <X className="mx-auto h-4 w-4" />
          </button>
        </div>
        <select
          value={reasonType}
          onChange={(event) => setReasonType(event.target.value)}
          className="mt-4 h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none dark:border-gray-700 dark:bg-[#1f232b]"
        >
          {REPORT_REASON_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          rows={4}
          className="mt-3 w-full rounded-md border border-gray-200 bg-gray-50 p-3 text-sm outline-none focus:border-red-300 dark:border-gray-700 dark:bg-[#1f232b]"
          placeholder="신고 사유를 입력해 주세요."
        />
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="h-10 rounded-md border border-gray-200 px-4 text-sm font-bold dark:border-gray-700">
            취소
          </button>
          <button type="submit" disabled={isSubmitting} className="h-10 rounded-md bg-red-500 px-4 text-sm font-bold text-white disabled:opacity-50">
            신고
          </button>
        </div>
      </form>
    </div>
  );
}

function CommunityBlockDialog({
  target,
  onClose,
  onSubmit,
}: {
  target: { email: string; nickname: string } | null;
  onClose: () => void;
  onSubmit: (reason: string) => Promise<void>;
}) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (target) {
      setReason("");
    }
  }, [target]);

  if (!target) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setIsSubmitting(true);
          try {
            await onSubmit(reason.trim());
          } finally {
            setIsSubmitting(false);
          }
        }}
        className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-[#252932]"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-gray-950 dark:text-gray-50">사용자 차단</h2>
          <button type="button" onClick={onClose} className="h-8 w-8 rounded-md border border-gray-200 dark:border-gray-700">
            <X className="mx-auto h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          {target.nickname} 사용자의 게시글과 댓글을 숨기도록 차단합니다.
        </p>
        <textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          rows={4}
          className="mt-4 w-full rounded-md border border-gray-200 bg-gray-50 p-3 text-sm outline-none focus:border-red-300 dark:border-gray-700 dark:bg-[#1f232b]"
          placeholder="차단 사유를 입력해 주세요. (선택)"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="h-10 rounded-md border border-gray-200 px-4 text-sm font-bold dark:border-gray-700">
            취소
          </button>
          <button type="submit" disabled={isSubmitting} className="h-10 rounded-md bg-red-500 px-4 text-sm font-bold text-white disabled:opacity-50">
            차단
          </button>
        </div>
      </form>
    </div>
  );
}

function CommunityPenaltyDialog({
  target,
  onClose,
  onSubmit,
}: {
  target: { email: string; nickname: string } | null;
  onClose: () => void;
  onSubmit: (penalty: string, reason: string) => Promise<void>;
}) {
  const [penalty, setPenalty] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (target) {
      setPenalty("");
      setReason("");
    }
  }, [target]);

  if (!target) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!penalty || !reason.trim()) {
            return;
          }
          setIsSubmitting(true);
          try {
            await onSubmit(penalty, reason.trim());
          } finally {
            setIsSubmitting(false);
          }
        }}
        className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-[#252932]"
      >
        <div className="flex items-center justify-between">
          <h2 className="inline-flex items-center gap-2 text-lg font-black text-gray-950 dark:text-gray-50">
            <Shield className="h-5 w-5 text-red-500" />
            사용자 제재
          </h2>
          <button type="button" onClick={onClose} className="h-8 w-8 rounded-md border border-gray-200 dark:border-gray-700">
            <X className="mx-auto h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          {target.nickname} 사용자에게 댓글/작성 제한 제재를 적용합니다.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PENALTY_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setPenalty(option.value)}
              className={`h-10 rounded-md border text-sm font-bold transition ${
                penalty === option.value
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-600 dark:border-gray-700 dark:text-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          rows={4}
          maxLength={500}
          className="mt-4 w-full rounded-md border border-gray-200 bg-gray-50 p-3 text-sm outline-none focus:border-red-300 dark:border-gray-700 dark:bg-[#1f232b]"
          placeholder="제재 사유를 입력해 주세요."
        />
        <div className="mt-1 text-right text-xs text-gray-400">{reason.length}/500</div>
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="h-10 rounded-md border border-gray-200 px-4 text-sm font-bold dark:border-gray-700">
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !penalty || !reason.trim()}
            className="h-10 rounded-md bg-red-500 px-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            제재 실행
          </button>
        </div>
      </form>
    </div>
  );
}
