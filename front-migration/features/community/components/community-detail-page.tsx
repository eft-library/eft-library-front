"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Bookmark,
  Edit3,
  Flag,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  UserCheck,
  UserPlus,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { signIn, useSession } from "next-auth/react";

import {
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
  reportCommunityComment,
  reportCommunityPost,
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
  CommunityDetailResponse,
  CommunityMetaData,
} from "@/types/api/community";

interface CommunityDetailPageProps {
  id: string;
}

export function CommunityDetailPage({ id }: CommunityDetailPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const locale = useAppStore((state) => state.uiLocale);
  const [detail, setDetail] = useState<CommunityDetailResponse | null>(null);
  const [meta, setMeta] = useState<CommunityMetaData | null>(null);
  const [comments, setComments] = useState<CommunityCommentsResponse | null>(null);
  const [commentText, setCommentText] = useState("");
  const [replyTarget, setReplyTarget] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePopup, setImagePopup] = useState<{ src: string; alt: string } | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [reportTarget, setReportTarget] = useState<
    | { type: "post"; id: string; reportedEmail: string }
    | { type: "comment"; id: string; reportedEmail: string }
    | null
  >(null);

  const postId = useMemo(() => getPostIdFromUrlParam(id), [id]);
  const commentPage = Math.max(1, Number(searchParams.get("comment_page") ?? "1") || 1);
  const userEmail = session?.userInfo?.email ?? session?.user?.email ?? "";

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
    Promise.all([
      getCommunityDetailMetaData(id, userEmail),
      getCommunityComments(postId, commentPage, userEmail),
    ])
      .then(([nextMeta, nextComments]) => {
        if (!ignore) {
          setMeta(nextMeta);
          setComments(nextComments);
        }
      })
      .catch(() => undefined);

    return () => {
      ignore = true;
    };
  }, [commentPage, id, postId, userEmail]);

  useEffect(() => {
    const storageKey = `community-view:${id}`;
    if (typeof window === "undefined" || window.sessionStorage.getItem(storageKey)) {
      return;
    }
    window.sessionStorage.setItem(storageKey, "1");
    increaseCommunityViewCount(id).catch(() => undefined);
  }, [id]);

  async function refreshMetaAndComments() {
    const [nextMeta, nextComments] = await Promise.all([
      getCommunityDetailMetaData(id, userEmail),
      getCommunityComments(postId, commentPage, userEmail),
    ]);
    setMeta(nextMeta);
    setComments(nextComments);
  }

  async function refreshDetail() {
    const nextDetail = await getCommunityDetail(id, "", userEmail);
    setDetail(nextDetail);
  }

  async function requireLogin() {
    if (!session?.accessToken) {
      await signIn("google");
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

  return (
    <main className="bg-gray-50 py-8 text-gray-950 dark:bg-[#1f232b] dark:text-gray-50">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <article className="min-w-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700/70 dark:bg-[#252932]">
          <header className="border-b border-gray-100 p-5 dark:border-gray-700/60">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Link href={`/community/${post.category}`} className="rounded bg-orange-100 px-2 py-1 font-bold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                {getCategoryLabel(post.category, locale)}
              </Link>
              <span className="text-gray-500 dark:text-gray-400">{post.nickname || "익명"}</span>
              <span className="text-gray-400">{formatCommunityDate(post.create_time)}</span>
            </div>
            <h1 className="mt-3 text-2xl font-black leading-snug">{post.title}</h1>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>조회 {post.view_count ?? 0}</span>
              <span>댓글 {post.comment_count ?? comments?.total ?? 0}</span>
              <span>추천 {meta?.like_count ?? post.reaction_score ?? 0}</span>
            </div>
          </header>

          <div
            onClick={openContentImage}
            className="prose prose-gray max-w-none p-5 text-gray-800 dark:prose-invert prose-img:cursor-zoom-in prose-img:rounded-lg dark:text-gray-100"
            dangerouslySetInnerHTML={{ __html: post.contents }}
          />

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
                onClick={() => setReportTarget({ type: "post", id: postId, reportedEmail: post.user_email })}
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
              {replyTarget ? (
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
                placeholder={session?.accessToken ? "댓글을 입력해 주세요." : "로그인 후 댓글을 작성할 수 있습니다."}
                className="w-full rounded-md border border-gray-200 bg-gray-50 p-3 text-sm outline-none focus:border-orange-300 dark:border-gray-700 dark:bg-[#1f232b]"
              />
              <div className="flex justify-end">
                <button type="submit" className="h-9 rounded-md bg-orange-500 px-4 text-sm font-bold text-white hover:bg-orange-600">
                  등록
                </button>
              </div>
            </form>

            <div className="mt-5 space-y-3">
              {(comments?.comments ?? []).map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700/70 dark:bg-[#1f232b]"
                  style={{ marginLeft: `${Math.min(comment.depth, 3) * 18}px` }}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-bold text-gray-800 dark:text-gray-100">{comment.nickname || "익명"}</span>
                    <span>{formatCommunityDate(comment.create_time)}</span>
                    {comment.parent_nickname ? <span>@{comment.parent_nickname}</span> : null}
                  </div>
                  {editingCommentId === comment.id ? (
                    <div className="mt-3 space-y-2">
                      <textarea
                        value={editingCommentText}
                        onChange={(event) => setEditingCommentText(event.target.value)}
                        rows={3}
                        className="w-full rounded-md border border-gray-200 bg-white p-3 text-sm outline-none focus:border-orange-300 dark:border-gray-700 dark:bg-[#252932]"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCommentId(null);
                            setEditingCommentText("");
                          }}
                          className="h-8 rounded-md border border-gray-200 px-3 text-xs font-bold dark:border-gray-700"
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          onClick={() => submitCommentUpdate(comment.id)}
                          className="h-8 rounded-md bg-orange-500 px-3 text-xs font-bold text-white"
                        >
                          저장
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-700 dark:text-gray-200">
                      {comment.delete_by_user || comment.delete_by_admin ? "삭제된 댓글입니다." : comment.contents}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <button
                      type="button"
                      onClick={async () => {
                        if (await requireLogin()) {
                          await reactCommunityComment(comment.id, "like", session!.accessToken);
                          await refreshMetaAndComments();
                        }
                      }}
                      className="font-semibold text-gray-500 hover:text-orange-600 dark:text-gray-400"
                    >
                      추천 {comment.like_count}
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (await requireLogin()) {
                          await reactCommunityComment(comment.id, "dislike", session!.accessToken);
                          await refreshMetaAndComments();
                        }
                      }}
                      className="font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                      비추천 {comment.dislike_count}
                    </button>
                    <button type="button" onClick={() => setReplyTarget(comment.id)} className="font-semibold text-gray-500 hover:text-orange-600 dark:text-gray-400">
                      답글
                    </button>
                    {session?.accessToken && userEmail === comment.user_email ? (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCommentId(comment.id);
                          setEditingCommentText(comment.contents);
                        }}
                        className="font-semibold text-gray-500 hover:text-orange-600 dark:text-gray-400"
                      >
                        수정
                      </button>
                    ) : null}
                    {session?.accessToken && userEmail === comment.user_email ? (
                      <button
                        type="button"
                        onClick={async () => {
                          if (window.confirm("댓글을 삭제할까요?")) {
                            await deleteCommunityComment(comment.id, session.accessToken);
                            await refreshMetaAndComments();
                          }
                        }}
                        className="font-semibold text-red-500 hover:text-red-600"
                      >
                        삭제
                      </button>
                    ) : null}
                    {session?.accessToken && userEmail !== comment.user_email ? (
                      <button
                        type="button"
                        onClick={() => setReportTarget({ type: "comment", id: comment.id, reportedEmail: comment.user_email })}
                        className="font-semibold text-gray-500 hover:text-red-600 dark:text-gray-400"
                      >
                        신고
                      </button>
                    ) : null}
                    {isAdmin && userEmail !== comment.user_email ? (
                      <button
                        type="button"
                        onClick={async () => {
                          if (session?.accessToken && window.confirm("관리자 권한으로 댓글을 삭제할까요?")) {
                            await deleteCommunityCommentByAdmin(comment.id, session.accessToken);
                            await refreshMetaAndComments();
                          }
                        }}
                        className="font-semibold text-red-500 hover:text-red-600"
                      >
                        관리자 삭제
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
            <CommunityPagination
              page={commentPage}
              maxPage={comments?.max_page_count ?? 1}
              onPageChange={(nextPage) => router.push(`/community/detail/${id}?comment_page=${nextPage}`)}
            />
          </section>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700/70 dark:bg-[#252932]">
            <h2 className="text-sm font-black">작성자</h2>
            <p className="mt-3 text-lg font-black">{detail.author_detail?.nickname || post.nickname || "익명"}</p>
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
              <button
                type="button"
                onClick={toggleFollow}
                className={`mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md text-sm font-bold transition ${
                  isFollowing
                    ? "border border-gray-200 text-gray-700 hover:border-gray-300 dark:border-gray-700 dark:text-gray-200"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {isFollowing ? <UserCheck className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                {isFollowing ? "팔로잉" : "팔로우"}
              </button>
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
          } else {
            await reportCommunityComment(
              {
                comment_id: reportTarget.id,
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
    </main>
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
    setZoom(0.75);
  }, [image?.src]);

  if (!image) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true">
      <div className="flex max-h-[88vh] w-[84vw] flex-col overflow-hidden rounded-lg border border-white/10 bg-white shadow-2xl dark:bg-[#1f232b]">
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
  onClose,
  onSubmit,
}: {
  target: { type: "post" | "comment"; id: string; reportedEmail: string } | null;
  accessToken?: string;
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
            await signIn("google");
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
          <h2 className="text-lg font-black text-gray-950 dark:text-gray-50">신고하기</h2>
          <button type="button" onClick={onClose} className="h-8 w-8 rounded-md border border-gray-200 dark:border-gray-700">
            <X className="mx-auto h-4 w-4" />
          </button>
        </div>
        <select
          value={reasonType}
          onChange={(event) => setReasonType(event.target.value)}
          className="mt-4 h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none dark:border-gray-700 dark:bg-[#1f232b]"
        >
          <option value="spam">스팸/광고</option>
          <option value="abuse">욕설/비방</option>
          <option value="illegal">불법/유해 정보</option>
          <option value="etc">기타</option>
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
