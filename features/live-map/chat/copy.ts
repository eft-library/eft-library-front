import { partyText, type PartyLocale } from "../party/copy";
import { LiveMapChatApiError } from "./api";

export function chatErrorText(error: Error | null, locale: PartyLocale) {
  if (!error) return null;
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  const code =
    error instanceof LiveMapChatApiError ? error.code : "CHAT_UNAVAILABLE";
  const messages: Record<string, string> = {
    CHAT_RATE_LIMITED: t(
      "메시지를 너무 빠르게 보내고 있습니다.",
      "You are sending messages too quickly.",
      "メッセージの送信が速すぎます。",
    ),
    CHAT_REPEATED_MESSAGE: t(
      "같은 메시지는 잠시 후 다시 보낼 수 있습니다.",
      "Wait before sending the same message again.",
      "同じメッセージは少し待ってから送信してください。",
    ),
    CHAT_RESTRICTED: t(
      "현재 채팅을 보낼 수 없습니다.",
      "You cannot send chat messages right now.",
      "現在チャットを送信できません。",
    ),
    PARTY_OWNER_REQUIRED: t(
      "방장만 파티에 초대할 수 있습니다.",
      "Only the party owner can invite players.",
      "パーティーリーダーのみ招待できます。",
    ),
    PARTY_ROOM_REQUIRED: t(
      "초대할 파티가 필요합니다.",
      "Create or join a party first.",
      "先にパーティーに参加してください。",
    ),
    CHAT_ADMIN_REQUIRED: t(
      "관리자 권한이 필요합니다.",
      "Administrator access is required.",
      "管理者権限が必要です。",
    ),
    MEMBER_NOT_KICKED: t(
      "현재 참여 중인 사용자는 강퇴 해제 대상이 아닙니다.",
      "This member is currently joined and has no kick to remove.",
      "参加中のメンバーには解除する退出処分がありません。",
    ),
    PARTY_INVITATION_DUPLICATED: t(
      "상대방의 응답을 기다리고 있습니다.",
      "Waiting for the other player to respond.",
      "相手の返答を待っています。",
    ),
    PARTY_ROOM_FULL: t(
      "파티 정원이 찼습니다.",
      "The party is full.",
      "パーティーは満員です。",
    ),
    PARTY_ROOM_LOCKED: t(
      "현재 파티 입장이 잠겨 있습니다.",
      "The party is locked.",
      "パーティーはロックされています。",
    ),
    PARTY_ALREADY_JOINED: t(
      "이미 다른 파티에 참여 중입니다.",
      "This player is already in a party.",
      "すでに別のパーティーに参加しています。",
    ),
    PARTY_MEMBER_KICKED: t(
      "강퇴된 사용자입니다. 파티에서 강퇴를 해제한 뒤 다시 초대해 주세요.",
      "This player was kicked. Remove the party kick before inviting again.",
      "退出処分を解除してから再招待してください。",
    ),
    PARTY_INVITATION_EXPIRED: t(
      "초대가 만료되었습니다.",
      "The invitation has expired.",
      "招待の有効期限が切れました。",
    ),
    REGISTERED_USER_REQUIRED: t(
      "사이트 계정 등록을 완료해 주세요.",
      "Complete your site registration first.",
      "サイト登録を完了してください。",
    ),
    CHAT_ALREADY_REPORTED: t(
      "이미 신고한 메시지입니다.",
      "You already reported this message.",
      "このメッセージはすでに通報済みです。",
    ),
  };
  return (
    messages[code] ??
    t(
      "요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.",
      "Could not complete the request. Please try again.",
      "処理できませんでした。しばらくしてから再試行してください。",
    )
  );
}
