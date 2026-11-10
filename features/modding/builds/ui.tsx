"use client";
import { useEffect, useId, useRef } from "react";
import type { Locale } from "@/i18n/config";
import { BuildApiError } from "./api";

export const buildButton =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-base font-semibold hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70";
export const buildField =
  "w-full rounded-lg border border-line bg-background px-3 py-2 text-base outline-none placeholder:text-foreground dark:text-white focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-70";
export const buildPanel =
  "rounded-2xl border border-line bg-surface p-4 sm:p-5";
export const buildText = (locale: Locale, ko: string, en: string, ja: string) =>
  ({ ko, en, ja })[locale];
export function buildErrorText(error: unknown, locale: Locale): string {
  const t = (ko: string, en: string, ja: string) =>
    buildText(locale, ko, en, ja);
  const code = error instanceof Error ? error.message : "";
  if (error instanceof BuildApiError && error.status === 401)
    return t(
      "로그인을 갱신한 뒤 직접 다시 시도해 주세요. 요청은 자동 재전송되지 않습니다.",
      "Refresh your login, then retry manually. The request was not replayed.",
      "ログインを更新して手動で再試行してください。自動再送は行いません。",
    );
  switch (code) {
    case "PRESET_IMPORT_UNAVAILABLE":
    case "PRESET_RECONSTRUCTION_INVALID":
      return t(
        "이 프리셋의 완전한 추정 구성을 불러올 수 없습니다.",
        "A complete inferred build could not be imported.",
        "このプリセットの完全な推定構成を読み込めません。",
      );
    case "BUILD_REGISTERED_USER_REQUIRED":
      return t(
        "계정 등록 후 이용할 수 있습니다.",
        "Complete account registration first.",
        "アカウント登録が必要です。",
      );
    case "BUILD_SELF_VOTE_FORBIDDEN":
      return t(
        "내 빌드에는 추천할 수 없습니다.",
        "You cannot vote for your own build.",
        "自分のビルドには投票できません。",
      );
    case "BUILD_VERSION_CONFLICT":
      return t(
        "다른 곳에서 수정되었습니다. 최신 저장본과 비교해 주세요. 현재 편집은 유지됩니다.",
        "This was edited elsewhere. Compare with the latest saved version. Your edits are kept.",
        "別の場所で更新されました。最新の保存内容と比較してください。編集中の内容は保持されます。",
      );
    case "BUILD_REVISION_CONFLICT":
      return t(
        "공개 버전이 변경되었습니다. 최신 상세를 확인한 뒤 다시 시도해 주세요.",
        "The public revision changed. Review the latest details before retrying.",
        "公開バージョンが変わりました。最新の詳細を確認して再試行してください。",
      );
    case "BUILD_REQUEST_CONFLICT":
      return t(
        "이전 요청과 내용이 다릅니다. 목록에서 처리 결과를 확인해 주세요.",
        "The retry differs from the original request. Check the list for its result.",
        "前の要求と内容が異なります。一覧で結果を確認してください。",
      );
    case "BUILD_LIMIT_REACHED":
      return t(
        "빌드는 최대 100개입니다. 기존 빌드를 삭제한 뒤 생성해 주세요.",
        "You have reached the 100-build limit. Remove a build first.",
        "ビルドは最大100件です。既存のビルドを削除してください。",
      );
    case "BUILD_COMMENT_RATE_LIMITED":
      return t(
        "댓글 작성 제한입니다. 잠시 후 다시 시도해 주세요.",
        "Comment rate limit reached. Please wait before retrying.",
        "コメントの送信上限です。しばらくしてから再試行してください。",
      );
    case "BUILD_INPUT_INVALID":
      return t(
        "제목 1~120자, 설명 5,000자 이하, 노드 1~200개·요청 256KiB 이하인지 확인해 주세요.",
        "Check title (1–120), description (up to 5,000), nodes (1–200) and request size (256KiB).",
        "タイトル1～120字、説明5,000字以内、ノード1～200件、要求256KiB以内を確認してください。",
      );
    case "BUILD_NOT_FOUND":
    case "BUILD_COMMENT_NOT_FOUND":
      return t(
        "삭제되었거나 접근할 수 없는 항목입니다.",
        "This item was removed or is not accessible.",
        "削除されたか、アクセスできない項目です。",
      );
    case "MODDING_ITEM_NOT_FOUND":
    case "MODDING_WEAPON_NOT_FOUND":
      return t(
        "추가한 아이템의 원천 데이터를 찾을 수 없습니다.",
        "Source data for an added item was not found.",
        "追加したアイテムの元データが見つかりません。",
      );
    case "AUTH_SERVICE_UNAVAILABLE":
      return t(
        "인증 서비스에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.",
        "Authentication is temporarily unavailable. Try again later.",
        "認証サービスが一時的に利用できません。",
      );
    default:
      return t(
        "서버에 연결하지 못했거나 요청을 완료하지 못했습니다. 입력은 유지됩니다. 생성·복사·댓글은 같은 내용으로 재시도할 수 있습니다.",
        "The request could not be completed. Your input is kept. Retry creates, copies and comments with the same content.",
        "要求を完了できませんでした。入力は保持されます。作成・コピー・コメントは同じ内容で再試行できます。",
      );
  }
}
export function BuildError({
  error,
  locale,
  retry,
}: {
  error: unknown;
  locale: Locale;
  retry?: () => void;
}) {
  if (!error) return null;
  return (
    <div
      role="alert"
      className="my-3 rounded-xl border border-red-600/25 bg-red-500/5 p-3 text-sm leading-6 text-red-800 dark:text-red-300"
    >
      {buildErrorText(error, locale)}
      {retry && (
        <button className={`${buildButton} ml-3`} onClick={retry}>
          {buildText(locale, "다시 조회", "Reload", "再読込")}
        </button>
      )}
    </div>
  );
}
export function ConfirmBuildAction({
  message,
  locale,
  resolve,
}: {
  message: string;
  locale: Locale;
  resolve: (value: boolean) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = ref.current;
    dialog?.showModal();
    cancel.current?.focus();
    return () => {
      dialog?.close();
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby={id}
      onCancel={(event) => {
        event.preventDefault();
        resolve(false);
      }}
      className="m-auto w-[min(92vw,28rem)] rounded-2xl border border-line bg-surface p-6 text-foreground shadow-2xl backdrop:bg-black/55"
    >
      <h2 id={id} className="text-base font-semibold">
        {message}
      </h2>
      <div className="mt-6 flex justify-end gap-2">
        <button
          ref={cancel}
          className={buildButton}
          onClick={() => resolve(false)}
        >
          {buildText(locale, "취소", "Cancel", "キャンセル")}
        </button>
        <button
          className={`${buildButton} border-accent/50 text-orange-700 dark:text-orange-300`}
          onClick={() => resolve(true)}
        >
          {buildText(locale, "계속", "Continue", "続ける")}
        </button>
      </div>
    </dialog>
  );
}
export function BuildPagination({
  page,
  total,
  onChange,
  disabled,
  locale,
}: {
  page: number;
  total: number;
  onChange: (page: number) => void;
  disabled?: boolean;
  locale: Locale;
}) {
  return (
    <div className="mt-4 flex items-center justify-center gap-4 text-sm">
      <button
        className={buildButton}
        disabled={disabled || page <= 1}
        onClick={() => onChange(page - 1)}
      >
        {buildText(locale, "이전", "Previous", "前へ")}
      </button>
      <span className="font-mono">
        {page} / {Math.max(1, Math.ceil(total / 20))}
      </span>
      <button
        className={buildButton}
        disabled={disabled || page * 20 >= total}
        onClick={() => onChange(page + 1)}
      >
        {buildText(locale, "다음", "Next", "次へ")}
      </button>
    </div>
  );
}
