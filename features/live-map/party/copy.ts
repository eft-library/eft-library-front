import { PartyApiError } from "./api";

export type PartyLocale = "ko" | "en" | "ja";
export const partyText = (
  locale: PartyLocale,
  ko: string,
  en: string,
  ja: string,
) => ({ ko, en, ja })[locale];

export function partyErrorText(error: Error, locale: PartyLocale) {
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  if (!(error instanceof PartyApiError))
    return t(
      "연결하지 못했습니다. 잠시 후 다시 시도해 주세요.",
      "Could not connect. Please try again.",
      "接続できません。再試行してください。",
    );
  const messages: Record<string, string> = {
    PARTY_REALTIME_UNAVAILABLE: t(
      "실시간 연결을 확인해 주세요. 연결된 뒤 다시 시도할 수 있습니다.",
      "Check the live connection and try again once connected.",
      "リアルタイム接続を確認し、接続後に再試行してください。",
    ),
    PARTY_MEMBERSHIP_CHANGED: t(
      "참여 상태가 변경되었습니다. 방에 다시 입장해 주세요.",
      "Your membership changed. Please join the room again.",
      "参加状態が変わりました。再入室してください。",
    ),
    TOO_MANY_PARTY_CONNECTIONS: t(
      "다른 탭의 파티 연결을 닫고 다시 시도해 주세요.",
      "Close party connections in other tabs and retry.",
      "他のタブのパーティー接続を閉じて再試行してください。",
    ),
    INVALID_MESSAGE: t(
      "공유할 좌표와 입력값을 확인해 주세요.",
      "Check the coordinates and message inputs.",
      "共有する座標と入力値を確認してください。",
    ),
    INVALID_ROOM_PASSWORD: t(
      "비밀번호가 맞지 않습니다.",
      "Incorrect password.",
      "パスワードが違います。",
    ),
    ROOM_LOCKED: t(
      "입장이 잠긴 방입니다.",
      "This room is locked.",
      "入室がロックされています。",
    ),
    ROOM_FULL: t("방의 정원이 찼습니다.", "This room is full.", "満員です。"),
    REGISTERED_USER_REQUIRED: t(
      "사이트 계정 등록을 완료해 주세요.",
      "Complete your site registration first.",
      "サイトへの登録を完了してください。",
    ),
    PARTY_MEMBER_KICKED: t(
      "이 방에서 강퇴되어 재입장할 수 없습니다.",
      "You were removed and cannot rejoin this room.",
      "この部屋から退出させられたため、再入室できません。",
    ),
    PARTY_MEMBERSHIP_REQUIRED: t(
      "방 참여가 종료되었습니다.",
      "You are no longer a member of this room.",
      "この部屋への参加は終了しました。",
    ),
    ROOM_CLOSED: t(
      "파티가 종료되었습니다.",
      "The room has closed.",
      "パーティーは終了しました。",
    ),
    ROOM_NOT_FOUND: t(
      "방을 찾을 수 없습니다.",
      "Room not found.",
      "部屋が見つかりません。",
    ),
    MEMBER_COLOR_IN_USE: t(
      "다른 참여자가 사용 중인 색상입니다.",
      "Another member is using this color.",
      "他の参加者が使用中の色です。",
    ),
    MARKER_VERSION_CONFLICT: t(
      "다른 참여자가 마커를 변경했습니다. 최신 마커를 다시 선택해 주세요.",
      "This marker changed. Select the updated marker to edit again.",
      "マーカーが変更されました。最新のマーカーを選び直してください。",
    ),
    CAPACITY_BELOW_MEMBER_COUNT: t(
      "현재 참여 인원보다 정원을 줄일 수 없습니다.",
      "Capacity cannot be below the joined member count.",
      "定員を現在の参加人数より少なくできません。",
    ),
    ROOM_MARKER_LIMIT: t(
      "공유 마커는 방당 최대 200개입니다.",
      "A room can have up to 200 shared markers.",
      "共有マーカーは最大200個です。",
    ),
    TOO_MANY_ATTEMPTS: t(
      "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.",
      "Too many attempts. Please wait before retrying.",
      "リクエストが多すぎます。しばらくお待ちください。",
    ),
  };
  if (messages[error.code]) return messages[error.code];
  if (error.status === 401)
    return t(
      "다시 로그인해 주세요.",
      "Please sign in again.",
      "再ログインしてください。",
    );
  if (error.status === 403)
    return t(
      "이 작업을 수행할 권한이 없습니다.",
      "You do not have permission for this action.",
      "この操作の権限がありません。",
    );
  if (error.status === 422)
    return t(
      "입력값과 선택한 맵·층을 확인해 주세요.",
      "Check your inputs and selected map/floor.",
      "入力値と選択したマップ・階を確認してください。",
    );
  if (error.status === 404)
    return t(
      "대상이 변경되거나 삭제되었습니다. 새로고침해 주세요.",
      "The item changed or was removed. Please refresh.",
      "対象が変更または削除されました。更新してください。",
    );
  return t(
    "요청을 완료하지 못했습니다. 새로고침 후 다시 시도해 주세요.",
    "Could not complete the request. Refresh and try again.",
    "処理できませんでした。更新して再試行してください。",
  );
}
