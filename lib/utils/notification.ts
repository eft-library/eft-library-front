import type { MyPageNotificationEntry } from "@/types/api/mypage";

export function getNotificationPayload(
  payload: MyPageNotificationEntry["payload"],
) {
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

export function getNotificationPayloadText(
  payload: Record<string, unknown>,
  key: string,
) {
  const value = payload[key];

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "bigint") {
    return String(value);
  }

  return "";
}

export function getNotificationHref(entry: MyPageNotificationEntry) {
  const payload = getNotificationPayload(entry.payload);
  const url = getNotificationPayloadText(payload, "url");

  if (!url) {
    return "/mypage/notifications";
  }

  return `/community/detail/${url}`;
}

export function getNotificationBody(entry: MyPageNotificationEntry) {
  const payload = getNotificationPayload(entry.payload);
  const title = getNotificationPayloadText(payload, "title");
  const author = getNotificationPayloadText(payload, "author_nickname");
  const message = getNotificationPayloadText(payload, "message");

  switch (entry.noti_type) {
    case "penalty_user":
      return "계정 제재 알림";
    case "create_post":
      return author && title
        ? `${author}님이 "${title}" 게시글을 작성했습니다.`
        : "새 게시글 알림";
    case "create_parent_comment":
      return author && title
        ? `${author}님이 "${title}" 게시글에 댓글을 남겼습니다.`
        : "새 댓글 알림";
    case "create_child_comment":
      return author
        ? `${author}님이 댓글에 답글을 남겼습니다.`
        : "새 대댓글 알림";
    case "follow_user":
      return author
        ? `${author}님이 회원님을 팔로우하기 시작했습니다.`
        : "새 팔로워 알림";
    default:
      return message || entry.noti_type || "새 알림";
  }
}

export function normalizeNotificationMessage(
  value: unknown,
): MyPageNotificationEntry | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const source = value as Record<string, unknown>;
  const payload =
    source.payload && typeof source.payload === "object"
      ? (source.payload as Record<string, unknown>)
      : source;
  const notiType =
    typeof source.noti_type === "string"
      ? source.noti_type
      : getNotificationPayloadText(payload, "noti_type");

  if (!notiType) {
    return null;
  }

  const id =
    typeof source.id === "string"
      ? source.id
      : `${notiType}-${getNotificationPayloadText(payload, "url") || Date.now()}`;
  const userEmail =
    typeof source.user_email === "string"
      ? source.user_email
      : getNotificationPayloadText(payload, "user_email");
  const createTime =
    typeof source.create_time === "string"
      ? source.create_time
      : new Date().toISOString();

  return {
    id,
    user_email: userEmail,
    noti_type: notiType,
    payload,
    is_read: typeof source.is_read === "boolean" ? source.is_read : false,
    create_time: createTime,
  };
}
