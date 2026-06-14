"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Bookmark,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Edit2,
  FileText,
  Loader2,
  Lock,
  Mail,
  MessageCircle,
  ShieldOff,
  Trash2,
  User,
  UserCheck,
  UserPlus,
  X,
  XCircle,
} from "lucide-react";

import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { cn } from "@/lib/utils/class-name";
import { stripHtml } from "@/features/community/utils";
import {
  apiEndpoints,
  getMyPageBlocksEndpoint,
  getMyPageBookmarksEndpoint,
  getMyPageCommentsEndpoint,
  getMyPageFollowEndpoint,
  getMyPageNotificationsEndpoint,
  getMyPagePostsEndpoint,
} from "@/lib/config/api-endpoints";
import { formatIsoDate, formatIsoDateTime } from "@/lib/utils/date-time";
import type {
  MyPageBlocksResponse,
  MyPageBookmarkEntry,
  MyPageBookmarksResponse,
  MyPageCommentEntry,
  MyPageCommentsResponse,
  MyPageDefaultResponse,
  MyPageFollowResponse,
  MyPageNotificationEntry,
  MyPageNotificationsResponse,
  MyPagePostEntry,
  MyPagePostsResponse,
  UserInfoResponse,
} from "@/types/api/mypage";

type MyPageSection =
  | "profile"
  | "posts"
  | "comments"
  | "bookmarks"
  | "blocked"
  | "following"
  | "notifications";

type PagedMyPageData =
  | MyPagePostsResponse
  | MyPageCommentsResponse
  | MyPageBookmarksResponse
  | MyPageBlocksResponse
  | MyPageFollowResponse
  | MyPageNotificationsResponse;

type SectionConfig = {
  title: string;
  shortTitle: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const sectionConfig: Record<MyPageSection, SectionConfig> = {
  profile: { title: "사용자 정보", shortTitle: "프로필", href: "/mypage/profile", icon: User },
  posts: { title: "작성 글", shortTitle: "글", href: "/mypage/posts", icon: FileText },
  comments: {
    title: "작성 댓글",
    shortTitle: "댓글",
    href: "/mypage/comments",
    icon: MessageCircle,
  },
  bookmarks: {
    title: "북마크한 글",
    shortTitle: "북마크",
    href: "/mypage/bookmarks",
    icon: Bookmark,
  },
  blocked: {
    title: "차단한 사용자",
    shortTitle: "차단",
    href: "/mypage/blocked",
    icon: ShieldOff,
  },
  following: {
    title: "팔로우한 사용자",
    shortTitle: "팔로우",
    href: "/mypage/following",
    icon: UserPlus,
  },
  notifications: {
    title: "알림",
    shortTitle: "알림",
    href: "/mypage/notifications",
    icon: Bell,
  },
};

const pagedEndpointBySection: Record<Exclude<MyPageSection, "profile">, (page: number) => string> = {
  posts: getMyPagePostsEndpoint,
  comments: getMyPageCommentsEndpoint,
  bookmarks: getMyPageBookmarksEndpoint,
  blocked: getMyPageBlocksEndpoint,
  following: getMyPageFollowEndpoint,
  notifications: getMyPageNotificationsEndpoint,
};

function getInitialPage() {
  if (typeof window === "undefined") {
    return 1;
  }

  const page = Number(new URLSearchParams(window.location.search).get("page"));
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

function getPostHref(post: Pick<MyPagePostEntry, "id" | "slug">) {
  return `/community/detail/${post.id}-${post.slug}`;
}

function getDisplayName(email: string, nickname?: string | null) {
  return nickname || email;
}

function getPayloadObject(payload: MyPageNotificationEntry["payload"]) {
  if (!payload) {
    return {};
  }

  if (typeof payload === "string") {
    try {
      const parsed = JSON.parse(payload) as unknown;
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : { message: payload };
    } catch {
      return { message: payload };
    }
  }

  return payload;
}

function getPayloadText(payload: Record<string, unknown>, key: string) {
  const value = payload[key];
  return typeof value === "string" ? value : "";
}

function formatCount(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

function updateUrlPage(section: MyPageSection, page: number) {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);
  if (page <= 1) {
    url.searchParams.delete("page");
  } else {
    url.searchParams.set("page", String(page));
  }
  window.history.replaceState(null, "", `${sectionConfig[section].href}${url.search}`);
}

function Pagination({
  page,
  maxPage,
  onChange,
}: {
  page: number;
  maxPage: number;
  onChange: (nextPage: number) => void;
}) {
  if (maxPage <= 1) {
    return null;
  }

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-orange-300 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-[#1f222a] dark:text-gray-300 dark:hover:border-orange-400"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="min-w-20 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
        {page} / {maxPage}
      </span>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= maxPage}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition hover:border-orange-300 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-[#1f222a] dark:text-gray-300 dark:hover:border-orange-400"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-5 py-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-[#1f222a]/70 dark:text-gray-400">
      {label}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex min-h-60 items-center justify-center rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#252830]">
      <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#1f222a]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
          {label}
        </div>
        <Icon className="h-4 w-4 text-orange-500 dark:text-orange-300" />
      </div>
      <div className="mt-3 text-2xl font-black text-gray-950 dark:text-white">
        {formatCount(value)}
      </div>
    </div>
  );
}

function NicknameDialog({
  accessToken,
  currentNickname,
  onClose,
  onSuccess,
}: {
  accessToken: string;
  currentNickname: string;
  onClose: () => void;
  onSuccess: (nickname: string) => void;
}) {
  const [nickname, setNickname] = useState(currentNickname);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const errors = useMemo(() => {
    const nextErrors: string[] = [];
    const allowedPattern = /^[가-힣a-zA-Z0-9_-]+$/;

    if (nickname.length < 2) {
      nextErrors.push("닉네임은 최소 2글자 이상이어야 합니다.");
    }
    if (nickname.length > 12) {
      nextErrors.push("닉네임은 최대 12글자까지 가능합니다.");
    }
    if (nickname && !allowedPattern.test(nickname)) {
      nextErrors.push("한글, 영문, 숫자, _, - 만 사용할 수 있습니다.");
    }
    if (nickname.includes(" ")) {
      nextErrors.push("띄어쓰기는 사용할 수 없습니다.");
    }

    return nextErrors;
  }, [nickname]);

  const canSubmit = errors.length === 0 && nickname !== currentNickname;

  async function submit() {
    if (!canSubmit || isSaving) {
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const duplicate = await authenticatedApiRequest<{ result: number }>(
        apiEndpoints.userCheckNicknameDuplicate,
        {
          accessToken,
          method: "POST",
          body: JSON.stringify({ nickname }),
        },
      );

      if (duplicate.result !== 0) {
        setMessage("이미 사용 중인 닉네임입니다.");
        return;
      }

      await authenticatedApiRequest<unknown>(apiEndpoints.userUpdateNickname, {
        accessToken,
        method: "POST",
        body: JSON.stringify({ nickname }),
      });

      onSuccess(nickname);
      onClose();
    } catch (caughtError) {
      setMessage(
        caughtError instanceof Error ? caughtError.message : "닉네임 변경에 실패했습니다.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-x-0 bottom-0 top-14 z-20 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-[#252830]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-black">닉네임 변경</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <label className="mt-5 block">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            새 닉네임
          </span>
          <input
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            maxLength={12}
            className="mt-2 h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-orange-400 dark:border-gray-700 dark:bg-[#1f222a] dark:text-white"
          />
        </label>
        <div className="mt-3 space-y-1">
          {errors.map((error) => (
            <p key={error} className="flex items-center gap-1.5 text-xs text-red-500">
              <XCircle className="h-3.5 w-3.5" />
              {error}
            </p>
          ))}
          {message ? (
            <p className="flex items-center gap-1.5 text-xs text-red-500">
              <AlertTriangle className="h-3.5 w-3.5" />
              {message}
            </p>
          ) : null}
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
          >
            취소
          </button>
          <button
            type="button"
            disabled={!canSubmit || isSaving}
            onClick={() => void submit()}
            className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            변경
          </button>
        </div>
      </div>
    </div>
  );
}

function getPenaltyLabel(profile: UserInfoResponse) {
  if (!profile.reason) {
    return "제재 없음";
  }

  if (!profile.end_time) {
    return `영구 제한 · ${profile.reason}`;
  }

  return `${profile.reason} · ${formatIsoDateTime(profile.end_time)}`;
}

function ProfilePanel({
  profile,
  summary,
  onOpenNickname,
  onOpenWithdraw,
}: {
  profile: UserInfoResponse;
  summary: MyPageDefaultResponse;
  onOpenNickname: () => void;
  onOpenWithdraw: () => void;
}) {
  return (
    <div className="grid gap-5">
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-[#1f222a]">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
              Profile
            </p>
            <h2 className="mt-2 text-2xl font-black">
              {profile.nickname ?? profile.email}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-gray-600 dark:border-gray-700 dark:bg-[#252830] dark:text-gray-300">
                <Mail className="h-3.5 w-3.5" />
                {profile.email}
              </span>
              {profile.is_admin ? (
                <span className="inline-flex items-center gap-1 rounded-md bg-orange-500 px-2.5 py-1 text-white">
                  <UserCheck className="h-3.5 w-3.5" />
                  Admin
                </span>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenNickname}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-[#252830] dark:text-gray-200 dark:hover:border-orange-400"
          >
            <Edit2 className="h-4 w-4" />
            닉네임 변경
          </button>
        </div>

        {profile.reason ? (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{getPenaltyLabel(profile)}</span>
            </div>
          </div>
        ) : null}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <InfoRow icon={CalendarDays} label="가입일" value={formatIsoDate(profile.create_time)} />
          <InfoRow
            icon={CheckCircle2}
            label="출석일 수"
            value={`${formatCount(profile.attendance_count)}일`}
          />
          <InfoRow
            icon={Edit2}
            label="마지막 닉네임 변경"
            value={
              profile.last_update_nickname
                ? formatIsoDateTime(profile.last_update_nickname)
                : "-"
            }
          />
          <InfoRow
            icon={Lock}
            label="차단한 사용자"
            value={`${formatCount(profile.user_blocks.length)}명`}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="작성 글" value={summary.post_count} icon={FileText} />
        <StatCard label="댓글" value={summary.comment_count} icon={MessageCircle} />
        <StatCard label="팔로우" value={summary.follow_count} icon={UserPlus} />
        <StatCard label="읽지 않은 알림" value={summary.notification_count} icon={Bell} />
      </div>

      <div className="rounded-lg border border-red-200 bg-red-50 p-5 dark:border-red-400/30 dark:bg-red-400/10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-black text-red-700 dark:text-red-200">회원 탈퇴</h3>
            <p className="mt-1 text-sm text-red-600/80 dark:text-red-200/80">
              계정과 개인화 데이터가 삭제됩니다. 탈퇴 후에는 다시 로그인하여 재가입할 수 있습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenWithdraw}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-red-600 px-4 text-sm font-bold text-white transition hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4" />
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-3 dark:border-gray-700 dark:bg-[#252830]">
      <Icon className="h-4 w-4 shrink-0 text-orange-500 dark:text-orange-300" />
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-400">{label}</p>
        <p className="mt-0.5 truncate text-sm font-semibold text-gray-800 dark:text-gray-100">
          {value}
        </p>
      </div>
    </div>
  );
}

function PostCard({
  post,
  meta,
}: {
  post: MyPagePostEntry | MyPageBookmarkEntry;
  meta?: React.ReactNode;
}) {
  const preview = buildPreviewText(post.contents);

  return (
    <Link
      href={getPostHref(post)}
      target="_blank"
      rel="noreferrer"
      className="block rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:border-orange-300 hover:bg-orange-50/40 dark:border-gray-700 dark:bg-[#1f222a] dark:hover:border-orange-400/60 dark:hover:bg-orange-400/10"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange-500">
            {post.category}
          </p>
          <h3 className="mt-2 line-clamp-2 text-base font-black text-gray-950 dark:text-white">
            {post.title}
          </h3>
          {preview ? (
            <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
              {preview}
            </p>
          ) : null}
        </div>
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt=""
            className="h-20 w-full rounded-md object-cover sm:w-28"
          />
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
        <span>{formatIsoDateTime(post.create_time)}</span>
        <span>조회 {formatCount(post.view_count ?? 0)}</span>
        <span>댓글 {formatCount(post.comment_count)}</span>
        <span>점수 {formatCount(post.reaction_score)}</span>
        {meta}
      </div>
    </Link>
  );
}

function CommentCard({ entry }: { entry: MyPageCommentEntry }) {
  const preview = buildPreviewText(entry.comment.contents);

  return (
    <Link
      href={getPostHref(entry)}
      target="_blank"
      rel="noreferrer"
      className="block rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:border-orange-300 hover:bg-orange-50/40 dark:border-gray-700 dark:bg-[#1f222a] dark:hover:border-orange-400/60 dark:hover:bg-orange-400/10"
    >
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange-500">
        {entry.category}
      </p>
      <h3 className="mt-2 line-clamp-1 text-base font-black text-gray-950 dark:text-white">
        {entry.title}
      </h3>
      {preview ? (
        <p className="mt-3 rounded-md bg-white px-3 py-2 text-sm text-gray-600 dark:bg-[#252830] dark:text-gray-300">
          {preview}
        </p>
      ) : null}
      <p className="mt-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
        {formatIsoDateTime(entry.comment.create_time)}
      </p>
    </Link>
  );
}

function buildPreviewText(value: string, maxLength = 120) {
  const plainText = stripHtml(value);

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trimEnd()}...`;
}

function NotificationCard({ entry }: { entry: MyPageNotificationEntry }) {
  const payload = getPayloadObject(entry.payload);
  const title = getPayloadText(payload, "title");
  const author = getPayloadText(payload, "author_nickname");
  const url = getPayloadText(payload, "url");
  const message = getPayloadText(payload, "message");

  const bodyByType: Record<string, string> = {
    penalty_user: "계정 제재 알림",
    create_post: author && title ? `${author}님이 "${title}" 게시글을 작성했습니다.` : "새 게시글 알림",
    create_parent_comment:
      author && title ? `${author}님이 "${title}" 게시글에 댓글을 남겼습니다.` : "새 댓글 알림",
    create_child_comment: author ? `${author}님이 댓글에 답글을 남겼습니다.` : "새 대댓글 알림",
    follow_user: author ? `${author}님이 회원님을 팔로우하기 시작했습니다.` : "새 팔로워 알림",
  };

  const content = (
    <article
      className={cn(
        "rounded-lg border p-4",
        entry.is_read
          ? "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-[#1f222a]"
          : "border-orange-200 bg-orange-50 dark:border-orange-400/30 dark:bg-orange-400/10",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-orange-500 dark:bg-[#252830] dark:text-orange-300">
          <Bell className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-black text-gray-950 dark:text-white">
              {bodyByType[entry.noti_type] ?? message ?? entry.noti_type}
            </h3>
            {!entry.is_read ? (
              <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-black text-white">
                NEW
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
            {formatIsoDateTime(entry.create_time)}
          </p>
        </div>
      </div>
    </article>
  );

  if (!url) {
    return content;
  }

  return (
    <Link href={`/community/detail/${url}`} target="_blank" rel="noreferrer">
      {content}
    </Link>
  );
}

function WithdrawDialog({
  accessToken,
  email,
  onClose,
}: {
  accessToken: string;
  email: string;
  onClose: () => void;
}) {
  const [inputEmail, setInputEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isConfirmed = inputEmail.trim() === email;

  async function withdraw() {
    if (!isConfirmed || isDeleting) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await authenticatedApiRequest<boolean>(apiEndpoints.userDelete, {
        accessToken,
        method: "GET",
      });
      setIsComplete(true);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "회원 탈퇴에 실패했습니다.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  async function closeAfterComplete() {
    await signOut({ callbackUrl: "/" });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-x-0 bottom-0 top-14 z-20 flex items-center justify-center bg-black/55 p-4"
      onClick={isComplete ? undefined : onClose}
    >
      <div
        className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-700 dark:bg-[#252830]"
        onClick={(event) => event.stopPropagation()}
      >
        {isComplete ? (
          <>
            <div className="flex items-start gap-3">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-400/15 dark:text-orange-200">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-black">탈퇴가 완료되었습니다.</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  그동안 EFT Library를 이용해 주셔서 감사합니다.
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => void closeAfterComplete()}
                className="rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                종료
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-black text-red-700 dark:text-red-200">
                회원 탈퇴 확인
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-200">
              탈퇴 시 계정 및 저장된 사용자 데이터가 삭제됩니다. 계속하려면 이메일을 입력해 주세요.
            </div>
            <label className="mt-5 block">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                이메일 확인
              </span>
              <input
                value={inputEmail}
                onChange={(event) => setInputEmail(event.target.value)}
                placeholder={email}
                className="mt-2 h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-red-400 dark:border-gray-700 dark:bg-[#1f222a] dark:text-white"
              />
            </label>
            {error ? (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-red-500">
                <AlertTriangle className="h-3.5 w-3.5" />
                {error}
              </p>
            ) : null}
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
              >
                취소
              </button>
              <button
                type="button"
                disabled={!isConfirmed || isDeleting}
                onClick={() => void withdraw()}
                className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                탈퇴
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function MyPageClient({ section }: { section: MyPageSection }) {
  const { data: session, status, update: updateSession } = useSession();
  const [page, setPage] = useState(getInitialPage);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserInfoResponse | null>(null);
  const [summary, setSummary] = useState<MyPageDefaultResponse | null>(null);
  const [pagedData, setPagedData] = useState<PagedMyPageData | null>(null);
  const [isNicknameOpen, setIsNicknameOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  useEffect(() => {
    setPage(getInitialPage());
  }, [section]);

  useEffect(() => {
    updateUrlPage(section, page);
  }, [page, section]);

  const loadData = useCallback(async () => {
    if (status !== "authenticated" || !session?.accessToken) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const nextSummary = await authenticatedApiRequest<MyPageDefaultResponse>(
        apiEndpoints.myPageDefault,
        { accessToken: session.accessToken },
      );

      if (section === "profile") {
        const nextProfile = await authenticatedApiRequest<UserInfoResponse>(
          apiEndpoints.myPageInfo,
          { accessToken: session.accessToken },
        );

        setProfile(nextProfile);
        setPagedData(null);
      } else {
        const nextData = await authenticatedApiRequest<PagedMyPageData>(
          pagedEndpointBySection[section](page),
          { accessToken: session.accessToken },
        );

        setProfile(null);
        setPagedData(nextData);
      }

      setSummary(nextSummary);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "마이페이지 데이터를 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [page, section, session?.accessToken, status]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const maxPage = useMemo(() => {
    if (!pagedData) {
      return 1;
    }

    return Math.max(1, pagedData.max_page_count);
  }, [pagedData]);

  const nickname = profile?.nickname ?? session?.userInfo?.nickname ?? session?.user?.name ?? "User";

  function changePage(nextPage: number) {
    setPage(Math.min(Math.max(1, nextPage), maxPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleNicknameSuccess(nextNickname: string) {
    if (profile) {
      setProfile({ ...profile, nickname: nextNickname });
    }
    await updateSession({
      ...session,
      userInfo: session?.userInfo ? { ...session.userInfo, nickname: nextNickname } : null,
    });
    await loadData();
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <aside className="space-y-4">
          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700/70 dark:bg-[#252830]">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-500">
              My Page
            </p>
            <h1 className="mt-2 text-2xl font-black">{nickname}</h1>
            <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
              {session?.userInfo?.email ?? session?.user?.email ?? "로그인이 필요합니다"}
            </p>
          </section>

          <nav className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-700/70 dark:bg-[#252830]">
            {Object.entries(sectionConfig).map(([key, config]) => {
              const Icon = config.icon;
              const isActive = key === section;

              return (
                <Link
                  key={key}
                  href={config.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition",
                    isActive
                      ? "bg-orange-50 text-orange-700 dark:bg-orange-400/15 dark:text-orange-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-orange-500 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-orange-300",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{config.title}</span>
                  {key === "notifications" && summary && summary.notification_count > 0 ? (
                    <span className="ml-auto rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-black text-white">
                      {summary.notification_count}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0">
          <div className="mb-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700/70 dark:bg-[#252830]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
              {sectionConfig[section].shortTitle}
            </p>
            <h2 className="mt-1 text-2xl font-black">{sectionConfig[section].title}</h2>
          </div>

          {status === "loading" || isLoading ? <LoadingState /> : null}

          {status !== "loading" && (status !== "authenticated" || !session?.accessToken) ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-[#252830]">
              <Lock className="mx-auto h-8 w-8 text-orange-500" />
              <h2 className="mt-4 text-xl font-black">로그인이 필요합니다</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                마이페이지는 사용자 토큰이 필요한 개인 영역입니다.
              </p>
              <button
                type="button"
                onClick={() => void signIn("google")}
                className="mt-5 rounded-md bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Google로 로그인
              </button>
            </div>
          ) : null}

          {status === "authenticated" && !isLoading && error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-200">
              {error}
            </div>
          ) : null}

          {status === "authenticated" && !isLoading && !error ? (
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700/70 dark:bg-[#252830]">
              {section === "profile" && profile && summary ? (
                <ProfilePanel
                  profile={profile}
                  summary={summary}
                  onOpenNickname={() => setIsNicknameOpen(true)}
                  onOpenWithdraw={() => setIsWithdrawOpen(true)}
                />
              ) : null}

              {section === "posts" && pagedData && "posts" in pagedData ? (
                <ListPanel
                  count={pagedData.total_count}
                  emptyLabel="작성한 글이 없습니다."
                  page={page}
                  maxPage={maxPage}
                  onPageChange={changePage}
                >
                  {pagedData.posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </ListPanel>
              ) : null}

              {section === "comments" && pagedData && "comments" in pagedData ? (
                <ListPanel
                  count={pagedData.total_count}
                  emptyLabel="작성한 댓글이 없습니다."
                  page={page}
                  maxPage={maxPage}
                  onPageChange={changePage}
                >
                  {pagedData.comments.map((entry) => (
                    <CommentCard key={`${entry.id}-${entry.comment.id}`} entry={entry} />
                  ))}
                </ListPanel>
              ) : null}

              {section === "bookmarks" && pagedData && "bookmarks" in pagedData ? (
                <ListPanel
                  count={pagedData.total_count}
                  emptyLabel="북마크한 글이 없습니다."
                  page={page}
                  maxPage={maxPage}
                  onPageChange={changePage}
                >
                  {pagedData.bookmarks.map((entry) => (
                    <PostCard
                      key={entry.id}
                      post={entry}
                      meta={
                        <span className="inline-flex items-center gap-1 text-orange-500">
                          <Bookmark className="h-3.5 w-3.5" />
                          북마크
                        </span>
                      }
                    />
                  ))}
                </ListPanel>
              ) : null}

              {section === "blocked" && pagedData && "blocks" in pagedData ? (
                <ListPanel
                  count={pagedData.total_count}
                  emptyLabel="차단한 사용자가 없습니다."
                  page={page}
                  maxPage={maxPage}
                  onPageChange={changePage}
                >
                  {pagedData.blocks.map((entry) => (
                    <article
                      key={`${entry.blocked_email}-${entry.create_time}`}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#1f222a]"
                    >
                      <h3 className="text-base font-black">
                        {getDisplayName(entry.blocked_email, entry.nickname)}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {entry.reason ?? "사유 없음"} · {formatIsoDateTime(entry.create_time)}
                      </p>
                    </article>
                  ))}
                </ListPanel>
              ) : null}

              {section === "following" && pagedData && "follow" in pagedData ? (
                <ListPanel
                  count={pagedData.total_count}
                  emptyLabel="팔로우한 사용자가 없습니다."
                  page={page}
                  maxPage={maxPage}
                  onPageChange={changePage}
                >
                  {pagedData.follow.map((entry) => (
                    <article
                      key={`${entry.following_email}-${entry.create_time}`}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#1f222a]"
                    >
                      <h3 className="text-base font-black">
                        {getDisplayName(entry.following_email, entry.nickname)}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        작성 글 {formatCount(entry.post_count)} ·{" "}
                        {formatIsoDateTime(entry.create_time)}
                      </p>
                    </article>
                  ))}
                </ListPanel>
              ) : null}

              {section === "notifications" && pagedData && "notifications" in pagedData ? (
                <ListPanel
                  count={pagedData.total_count}
                  emptyLabel="알림이 없습니다."
                  page={page}
                  maxPage={maxPage}
                  onPageChange={changePage}
                >
                  {pagedData.notifications.map((entry) => (
                    <NotificationCard key={entry.id} entry={entry} />
                  ))}
                </ListPanel>
              ) : null}
            </div>
          ) : null}
        </section>
      </div>

      {isNicknameOpen && session?.accessToken ? (
        <NicknameDialog
          accessToken={session.accessToken}
          currentNickname={nickname}
          onClose={() => setIsNicknameOpen(false)}
          onSuccess={(nextNickname) => void handleNicknameSuccess(nextNickname)}
        />
      ) : null}

      {isWithdrawOpen && session?.accessToken && (profile?.email ?? session.userInfo?.email) ? (
        <WithdrawDialog
          accessToken={session.accessToken}
          email={profile?.email ?? session.userInfo?.email ?? ""}
          onClose={() => setIsWithdrawOpen(false)}
        />
      ) : null}
    </main>
  );
}

function ListPanel({
  count,
  emptyLabel,
  page,
  maxPage,
  onPageChange,
  children,
}: {
  count: number;
  emptyLabel: string;
  page: number;
  maxPage: number;
  onPageChange: (nextPage: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-gray-600 dark:text-gray-300">
          전체 {formatCount(count)}
        </p>
      </div>
      {count > 0 ? <div className="grid gap-3">{children}</div> : <EmptyState label={emptyLabel} />}
      <Pagination page={page} maxPage={maxPage} onChange={onPageChange} />
    </div>
  );
}
