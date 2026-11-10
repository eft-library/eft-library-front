"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { itemName } from "../build";
import { useBuilds } from "./provider";
import { BuildError, buildButton, buildField, buildPanel } from "./ui";

export function BuildNavigation() {
  const b = useBuilds();
  if (!b.enabled) return null;
  const tabs = [
    ["weapons", b.t("총기 선택", "Weapons", "武器を選択")],
    ["public", b.t("공개 빌드", "Community builds", "公開ビルド")],
    ["mine", b.t("내 빌드", "My builds", "マイビルド")],
    ...(b.content
      ? [["editor", b.t("편집 중인 빌드", "Current build", "編集中のビルド")]]
      : []),
  ] as const;
  return (
    <div
      className="mb-5 flex flex-wrap gap-2"
      role="group"
      aria-label={b.t(
        "모딩 메뉴",
        "Modding navigation",
        "カスタマイズメニュー",
      )}
    >
      {tabs.map(([id, label]) => (
        <button
          key={id}
          aria-pressed={b.screen === id}
          disabled={b.pending}
          className={`${buildButton} ${b.screen === id ? "border-accent/50 bg-accent/10 text-orange-700 dark:text-orange-300" : ""}`}
          onClick={() => b.setScreen(id as typeof b.screen)}
        >
          {label}
          {id === "editor" && b.dirty ? " •" : ""}
        </button>
      ))}
    </div>
  );
}
export function BuildLoginNotice() {
  const b = useBuilds();
  if (b.canWrite) return null;
  return (
    <div className="my-3 flex flex-wrap items-center gap-3 text-base text-foreground dark:text-white">
      <span>
        {b.t(
          "저장·추천·댓글·복사는 등록된 계정으로 로그인 후 이용할 수 있습니다.",
          "Sign in with a registered account to save, vote, comment or copy.",
          "保存・投票・コメント・コピーには登録済みアカウントでのログインが必要です。",
        )}
      </span>
      {!b.token ? (
        <button className={buildButton} onClick={() => void signIn("google")}>
          {b.t("로그인", "Sign in", "ログイン")}
        </button>
      ) : (
        <Link href="/onboarding" className={buildButton}>
          {b.t("계정 확인", "Check account", "アカウント確認")}
        </Link>
      )}
    </div>
  );
}
export function BuildEditorPanel() {
  const b = useBuilds();
  const content = b.content;
  if (!b.enabled || !content) return null;
  return (
    <section
      className={`${buildPanel} mb-5`}
      aria-label={b.t("저장 및 공유", "Save and share", "保存して共有")}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">
            {b.workspace
              ? b.t("내 모딩", "My build", "マイビルド")
              : b.t("새 모딩", "New build", "新しいビルド")}
          </h2>
          <p className="mt-1 text-sm text-foreground dark:text-white">
            {b.workspace
              ? `${b.workspace.is_public ? b.t("공개 중", "Published", "公開中") : b.t("공개 대기", "Awaiting publication", "公開待ち")} · v${b.workspace.version} · ${b.t("공개 버전", "Published revision", "公開バージョン")} ${b.workspace.published_revision ?? "—"}`
              : b.t(
                  "아직 서버에 저장되지 않았습니다.",
                  "Not saved to the server yet.",
                  "まだサーバーに保存されていません。",
                )}
            {b.dirty
              ? ` · ${b.t("저장하지 않은 변경", "Unsaved changes", "未保存の変更")}`
              : ""}
          </p>
        </div>
      </div>
      <fieldset
        disabled={b.pending}
        className="grid items-end gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
      >
        <label className="text-sm text-foreground dark:text-white">
          {b.t("제목 (1~120자)", "Title (1–120)", "タイトル（1～120字）")}
          <input
            className={`${buildField} mt-2 block h-11`}
            value={content.title}
            maxLength={120}
            onChange={(e) => b.edit({ ...content, title: e.target.value })}
          />
        </label>
        <button
          disabled={
            !b.canWrite ||
            b.pending ||
            !content.title.trim() ||
            (!!b.workspace &&
              !b.dirty &&
              b.workspace.is_public &&
              b.workspace.published_revision === b.workspace.version)
          }
          onClick={() => void b.save()}
          className={`${buildButton} h-11 whitespace-nowrap border-accent/50 text-orange-700 dark:text-orange-300`}
        >
          {b.pending
            ? b.t("처리 중…", "Processing…", "処理中…")
            : b.t("저장 및 공유", "Save and share", "保存して共有")}
        </button>
      </fieldset>
      {b.workspace && (
        <div className="mt-3 flex flex-wrap justify-end gap-2">
          <>
            <button
              disabled={!b.canWrite || b.pending}
              onClick={() => void b.reload()}
              className={buildButton}
            >
              {b.t(
                "저장본 다시 읽기",
                "Reload saved draft",
                "保存内容を再読込",
              )}
            </button>
            <button
              disabled={!b.canWrite || b.pending}
              onClick={() => void b.discardBuild()}
              className={`${buildButton} text-red-700 dark:text-red-300`}
            >
              {b.t("빌드 삭제", "Delete build", "ビルド削除")}
            </button>
          </>
        </div>
      )}
      <BuildLoginNotice />
      {b.publicationFailed && (
        <p
          role="alert"
          className="mt-3 text-base text-amber-900 dark:text-amber-200"
        >
          {b.t(
            "저장은 완료됐지만 공개하지 못했습니다. ‘저장 및 공유’를 눌러 다시 시도하세요.",
            "Saved, but publication failed. Select Save and share to retry.",
            "保存は完了しましたが公開できませんでした。「保存して共有」で再試行してください。",
          )}
        </p>
      )}
      <BuildError error={b.error} locale={b.locale} />
      {b.message && (
        <p
          role="status"
          className="mt-3 text-base text-emerald-700 dark:text-emerald-300"
        >
          {b.message}
        </p>
      )}
      {b.conflict && (
        <div className="mt-4 rounded-xl border border-amber-600/30 p-4 text-base">
          <p className="font-semibold">
            {b.t(
              "최신 저장본과 비교",
              "Compare latest saved draft",
              "最新の保存内容と比較",
            )}
          </p>
          <p className="mt-2 break-words">
            {b.t("서버", "Server", "サーバー")}: v{b.conflict.version} ·{" "}
            {b.conflict.content.title} · {b.conflict.content.nodes.length} nodes
          </p>
          <p className="mt-1 break-words">
            {b.t("내 편집", "Your edits", "自分の編集")}: {content.title} ·{" "}
            {content.nodes.length} nodes
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer">
              {b.t("구성·설명 비교", "Compare contents", "構成・説明を比較")}
            </summary>
            <div className="grid gap-3 sm:grid-cols-2">
              <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-background p-2 text-sm">
                {JSON.stringify(
                  {
                    title: b.conflict.content.title,
                    description: b.conflict.content.description,
                    nodes: b.conflict.content.nodes.map(
                      ({ item, ...node }) => node,
                    ),
                  },
                  null,
                  2,
                )}
              </pre>
              <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-background p-2 text-sm">
                {JSON.stringify(
                  {
                    title: content.title,
                    description: content.description,
                    nodes: content.nodes.map(({ item, ...node }) => node),
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
          </details>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              className={buildButton}
              onClick={() =>
                void (async () => {
                  if (
                    await b.confirm(
                      b.t(
                        "내 편집을 버리고 최신 저장본을 열까요?",
                        "Discard edits and load the latest draft?",
                        "編集を破棄して最新の下書きを開きますか？",
                      ),
                    )
                  )
                    b.loadLatest();
                })()
              }
            >
              {b.t("최신 저장본 열기", "Load latest", "最新を開く")}
            </button>
            <button className={buildButton} onClick={b.keepEdits}>
              {b.t(
                "내 편집 유지 후 다시 저장 준비",
                "Keep edits for next save",
                "編集を保持して再保存を準備",
              )}
            </button>
          </div>
        </div>
      )}
      {b.workspace?.copied_from && (
        <p className="mt-3 text-sm text-foreground dark:text-white">
          {b.t("복사 출처", "Copied from", "コピー元")}:{" "}
          {b.workspace.copied_from.title ?? "—"} ·{" "}
          {b.workspace.copied_from.author_nickname ?? "—"} · r
          {b.workspace.copied_from.revision}
        </p>
      )}
      {!!b.workspace?.warnings.length && (
        <ul className="mt-3 space-y-1 text-sm text-amber-900 dark:text-amber-200">
          {b.workspace.warnings.map((warning, i) => (
            <li key={`${warning.node_id}-${i}`}>
              {warning.node_id}:{" "}
              {warning.code === "SOURCE_ITEM_MISSING"
                ? b.t(
                    "원천 아이템 없음",
                    "Source item missing",
                    "元アイテムなし",
                  )
                : b.t(
                    "원천 슬롯 없음",
                    "Source slot missing",
                    "元スロットなし",
                  )}
            </li>
          ))}
        </ul>
      )}
      <details className="mt-4 border-t border-line pt-3">
        <summary className="cursor-pointer text-base font-medium">
          {b.t(
            "저장할 전체 구성",
            "Complete draft contents",
            "保存する構成全体",
          )}{" "}
          ({content.nodes.length}/200)
        </summary>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {content.nodes.map((node) => (
            <div
              key={node.node_id}
              className="flex items-center gap-3 rounded-lg border border-line p-3 text-sm"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium">{itemName(node.item, b.locale)}</p>
              </div>
              {node.parent_node_id && (
                <button
                  className={buildButton}
                  disabled={b.pending}
                  onClick={() => b.remove(node.node_id)}
                >
                  {b.t("해제", "Remove", "解除")}
                </button>
              )}
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
