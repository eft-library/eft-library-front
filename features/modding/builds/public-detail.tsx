"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { itemName } from "../build";
import { BuildApiError, buildsApi, buildsKey } from "./api";
import type { BuildComment, PublishedBuild } from "./types";
import { useBuilds } from "./provider";
import { BuildLoginNotice } from "./editor-panel";
import {
  BuildError,
  BuildPagination,
  buildButton,
  buildField,
  buildPanel,
} from "./ui";

export function BuildDetail({ id, back }: { id: string; back: () => void }) {
  const b = useBuilds();
  const [reviewedRevision, setReviewedRevision] = useState<number | null>(null);
  const detail = useQuery({
    queryKey: [...buildsKey, b.account, "detail", id, "published"],
    queryFn: ({ signal }) => buildsApi.detail(id, "published", b.token, signal),
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });
  const published = detail.data?.view === "published" ? detail.data : null;
  const refreshDetail = useCallback(() => {
    void detail.refetch();
  }, [detail.refetch]);
  const revision = published?.revision;
  useEffect(() => {
    if (reviewedRevision === null && revision !== undefined)
      setReviewedRevision(revision);
  }, [revision, reviewedRevision]);
  const revisionChanged =
    reviewedRevision !== null &&
    revision !== undefined &&
    reviewedRevision !== revision;
  return (
    <section className={buildPanel}>
      <div className="mb-4 flex flex-wrap justify-between gap-2">
        <button onClick={back} className={buildButton}>
          ← {b.t("목록", "Back to list", "一覧")}
        </button>
        <button
          disabled={detail.isFetching || b.pending}
          onClick={() => void detail.refetch()}
          className={buildButton}
        >
          {b.t("최신 상세 조회", "Reload details", "最新の詳細")}
        </button>
      </div>
      <BuildError
        error={detail.error}
        locale={b.locale}
        retry={() => void detail.refetch()}
      />
      <BuildError error={b.error} locale={b.locale} />
      {detail.isPending && (
        <p
          role="status"
          className="py-12 text-center text-sm text-foreground dark:text-white"
        >
          {b.t("불러오는 중…", "Loading…", "読み込み中…")}
        </p>
      )}
      {published && (
        <>
          {revisionChanged && (
            <div
              role="status"
              className="mb-4 rounded-xl border border-amber-600/30 bg-amber-500/5 p-4 text-sm text-amber-900 dark:text-amber-200"
            >
              <p>
                {b.t(
                  "공개 버전이 변경되었습니다. 입력한 댓글은 유지됩니다. 새 구성을 확인한 뒤 계속해 주세요.",
                  "The public revision changed. Your comment text is kept. Review the new build before continuing.",
                  "公開バージョンが変わりました。コメント入力は保持されます。新しい構成を確認してください。",
                )}
              </p>
              <button
                className={`${buildButton} mt-3`}
                onClick={() => {
                  setReviewedRevision(published.revision);
                  b.setError(null);
                }}
              >
                {b.t(
                  "새 공개 버전 확인",
                  "I reviewed the new revision",
                  "新しい公開版を確認",
                )}
              </button>
            </div>
          )}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="break-words text-2xl font-bold">
                {published.content.title}
              </h2>
              <p className="mt-2 text-xs text-foreground dark:text-white">
                {published.author_nickname ?? "—"} · r{published.revision} ·{" "}
                {new Intl.DateTimeFormat(b.locale, {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(published.published_at))}
              </p>
            </div>
            <span className="rounded-md border border-amber-600/25 bg-amber-500/5 px-2 py-1 text-xs text-amber-900 dark:text-amber-200">
              {b.t("미검증 구성", "Unvalidated build", "未検証の構成")}
            </span>
          </div>
          <p className="my-5 whitespace-pre-wrap break-words text-sm leading-7 text-foreground dark:text-white">
            {published.content.description}
          </p>
          <div className="mb-5 flex flex-wrap gap-2">
            <button
              aria-pressed={published.has_voted}
              disabled={
                !b.canWrite ||
                published.is_mine ||
                !published.is_public ||
                revisionChanged ||
                !!detail.error ||
                b.pending ||
                detail.isFetching
              }
              onClick={() =>
                void b.perform(() =>
                  buildsApi.vote(
                    id,
                    published.revision,
                    published.has_voted,
                    b.token,
                  ),
                )
              }
              className={`${buildButton} ${published.has_voted ? "border-accent/60 text-orange-700 dark:text-orange-300" : ""}`}
            >
              ♥ {b.t("추천", "Vote", "投票")} {published.vote_count}
            </button>
            <button
              disabled={
                !b.canWrite ||
                !published.is_public ||
                revisionChanged ||
                !!detail.error ||
                b.pending ||
                detail.isFetching
              }
              onClick={() => void b.copy(id, published.revision)}
              className={buildButton}
            >
              {b.t(
                "복사해서 커스텀",
                "Copy and customize",
                "コピーしてカスタマイズ",
              )}
            </button>
            {published.is_mine && (
              <button
                disabled={!b.canWrite || b.pending}
                onClick={() => void b.open(id)}
                className={buildButton}
              >
                {b.t("내 작업본 편집", "Edit my draft", "自分の下書きを編集")}
              </button>
            )}
          </div>
          <BuildLoginNotice />
          <p className="mb-4 text-xs leading-6 text-foreground dark:text-white">
            {b.t(
              "공개 당시 저장된 구성입니다. 슬롯 호환성·충돌·최종 성능은 검증되지 않았습니다. 미리보기는 현재 작업본을 변경하지 않습니다.",
              "This is the saved public snapshot. Compatibility, conflicts and final stats are not validated. Previewing does not change your draft.",
              "公開時点の構成です。互換性・干渉・最終性能は未検証です。プレビューでは下書きを変更しません。",
            )}
          </p>
          {!published.is_public && (
            <p className="my-3 text-sm text-amber-900 dark:text-amber-200">
              {b.t(
                "공개가 철회된 마지막 공개본입니다.",
                "This is the last snapshot of an unpublished build.",
                "公開が取り消された最後の公開版です。",
              )}
            </p>
          )}
          {published.copied_from && (
            <p className="mb-4 text-xs text-foreground dark:text-white">
              {b.t("복사 출처", "Copied from", "コピー元")}:{" "}
              {published.copied_from.title ?? "—"} ·{" "}
              {published.copied_from.author_nickname ?? "—"} · r
              {published.copied_from.revision}
            </p>
          )}
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {published.content.nodes.map((node) => (
              <div
                key={node.node_id}
                className="flex items-center gap-3 rounded-xl border border-line p-3"
              >
                {node.item.image && (
                  <Image
                    unoptimized
                    src={node.item.image}
                    alt=""
                    width={80}
                    height={60}
                    className="h-14 w-20 shrink-0 object-contain"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-xs font-medium leading-5">
                    {itemName(node.item, b.locale)}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-foreground dark:text-white">
                    {node.item.weight ?? "—"} kg
                  </p>
                  {node.attributes && (
                    <details className="mt-1 text-xs text-foreground dark:text-white">
                      <summary className="cursor-pointer">
                        {b.t("속성", "Attributes", "属性")}
                      </summary>
                      <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-all">
                        {JSON.stringify(node.attributes, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>
          {!!published.warnings.length && (
            <ul className="my-3 text-xs text-amber-900 dark:text-amber-200">
              {published.warnings.map((warning, i) => (
                <li key={i}>
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
          {published.is_public && (
            <BuildComments
              build={published}
              reviewRequired={revisionChanged || !!detail.error}
              refreshDetail={refreshDetail}
            />
          )}
        </>
      )}
      {detail.data?.view === "draft" && (
        <div className="py-8 text-sm">
          <p>
            {b.t(
              "아직 공개하지 않은 내 작업본입니다.",
              "This is your unpublished draft.",
              "まだ公開していない自分の下書きです。",
            )}
          </p>
          <button
            className={`${buildButton} mt-3`}
            onClick={() => void b.open(id)}
          >
            {b.t("작업본 편집", "Edit draft", "下書きを編集")}
          </button>
        </div>
      )}
    </section>
  );
}
function BuildComments({
  build,
  refreshDetail,
  reviewRequired,
}: {
  build: PublishedBuild;
  refreshDetail: () => void;
  reviewRequired: boolean;
}) {
  const b = useBuilds();
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [editing, setEditing] = useState<BuildComment | null>(null);
  const [editText, setEditText] = useState("");
  const [retryAt, setRetryAt] = useState(0);
  const [now, setNow] = useState(0);
  const comments = useQuery({
    queryKey: [
      ...buildsKey,
      b.account,
      "comments",
      build.id,
      build.revision,
      page,
    ],
    queryFn: ({ signal }) =>
      buildsApi.comments(build.id, build.revision, page, b.token, signal),
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });
  useEffect(() => {
    if (
      comments.error instanceof BuildApiError &&
      comments.error.code === "BUILD_REVISION_CONFLICT"
    )
      refreshDetail();
  }, [comments.error, refreshDetail]); // Refresh the parent; the new revision gets a distinct comments key.
  useEffect(() => {
    if (!retryAt) return;
    const timer = setInterval(() => {
      const time = Date.now();
      setNow(time);
      if (time >= retryAt) setRetryAt(0);
    }, 1000);
    return () => clearInterval(timer);
  }, [retryAt]);
  useEffect(() => {
    setPage(1);
  }, [build.revision]);
  const wait = Math.max(0, Math.ceil((retryAt - now) / 1000));
  async function submit() {
    const content = text.trim();
    if (
      !b.canWrite ||
      reviewRequired ||
      b.pending ||
      wait > 0 ||
      comments.isError ||
      !content ||
      [...content].length > 2000
    )
      return;
    const result = await b.perform(async () => {
      try {
        return await buildsApi.comment(
          build.id,
          {
            revision: build.revision,
            content,
            request_id: b.intent(
              `comment:${build.id}:${build.revision}:${content}`,
            ),
          },
          b.token,
        );
      } catch (error) {
        if (
          error instanceof BuildApiError &&
          error.status === 429 &&
          error.retryAfterSeconds !== null
        ) {
          setRetryAt(Date.now() + error.retryAfterSeconds * 1000);
          setNow(Date.now());
        }
        throw error;
      }
    });
    if (result) {
      b.completeIntent(`comment:${build.id}:${build.revision}:${content}`);
      setText("");
      setPage(Math.max(1, Math.ceil(((comments.data?.total ?? 0) + 1) / 20)));
    }
  }
  async function saveEdit() {
    if (
      !b.canWrite ||
      reviewRequired ||
      !editing ||
      latest?.version !== editing.version ||
      !editText.trim() ||
      [...editText.trim()].length > 2000
    )
      return;
    const result = await b.perform(() =>
      buildsApi.editComment(
        build.id,
        editing.id,
        { expected_version: editing.version, content: editText.trim() },
        b.token,
      ),
    );
    if (result) {
      setEditing(null);
      setEditText("");
    }
  }
  async function remove(comment: BuildComment) {
    if (
      await b.confirm(
        b.t(
          "댓글을 삭제할까요?",
          "Delete this comment?",
          "コメントを削除しますか？",
        ),
      )
    )
      await b.perform(() =>
        buildsApi.deleteComment(build.id, comment.id, comment.version, b.token),
      );
  }
  const latest = editing
    ? comments.data?.comments.find((comment) => comment.id === editing.id)
    : undefined;
  return (
    <section className="mt-6 border-t border-line pt-5">
      <h3 className="mb-4 text-sm font-semibold">
        {b.t("댓글", "Comments", "コメント")}{" "}
        {comments.data?.total ?? build.comment_count}
      </h3>
      <BuildError
        error={comments.error}
        locale={b.locale}
        retry={() => {
          refreshDetail();
          void comments.refetch();
        }}
      />
      {comments.isPending && (
        <p
          role="status"
          className="py-4 text-sm text-foreground dark:text-white"
        >
          {b.t(
            "댓글을 불러오는 중…",
            "Loading comments…",
            "コメントを読み込み中…",
          )}
        </p>
      )}
      <div className="space-y-3">
        {comments.data?.comments.map((comment) => (
          <article
            key={comment.id}
            className="rounded-xl border border-line p-4"
          >
            <div className="flex flex-wrap justify-between gap-2 text-xs text-foreground dark:text-white">
              <span className="font-medium text-foreground dark:text-white">
                {comment.author_nickname ?? "—"}
              </span>
              <time dateTime={comment.created_at}>
                {new Intl.DateTimeFormat(b.locale, {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(comment.created_at))}
              </time>
            </div>
            <p className="my-3 whitespace-pre-wrap break-words text-sm leading-6">
              {comment.content}
            </p>
            <div className="flex gap-2">
              {comment.is_mine && (
                <button
                  disabled={!b.canWrite || b.pending}
                  className={buildButton}
                  onClick={() => {
                    setEditing(comment);
                    setEditText(comment.content);
                  }}
                >
                  {b.t("수정", "Edit", "編集")}
                </button>
              )}
              {comment.can_delete && (
                <button
                  disabled={!b.canWrite || b.pending}
                  className={buildButton}
                  onClick={() => void remove(comment)}
                >
                  {b.t("삭제", "Delete", "削除")}
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
      {comments.data?.total === 0 && (
        <p className="py-5 text-sm text-foreground dark:text-white">
          {b.t(
            "첫 댓글을 남겨보세요.",
            "Be the first to comment.",
            "最初のコメントを投稿しましょう。",
          )}
        </p>
      )}
      {comments.data && (
        <BuildPagination
          page={page}
          total={comments.data.total}
          onChange={setPage}
          disabled={b.pending || comments.isFetching}
          locale={b.locale}
        />
      )}
      {editing && (
        <div className="mt-4 rounded-xl border border-accent/30 p-4">
          <label className="text-xs">
            {b.t("댓글 수정", "Edit comment", "コメント編集")}
            <textarea
              className={`${buildField} mt-2 min-h-24`}
              disabled={b.pending}
              maxLength={2000}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              className={buildButton}
              disabled={
                !b.canWrite ||
                b.pending ||
                reviewRequired ||
                !editText.trim() ||
                latest?.version !== editing.version
              }
              onClick={() => void saveEdit()}
            >
              {b.t("수정 저장", "Save edit", "変更を保存")}
            </button>
            <button
              className={buildButton}
              disabled={b.pending}
              onClick={() => setEditing(null)}
            >
              {b.t("취소", "Cancel", "キャンセル")}
            </button>
            {latest && latest.version !== editing.version && (
              <button
                className={buildButton}
                onClick={() =>
                  void (async () => {
                    if (
                      await b.confirm(
                        `${b.t("최신 댓글", "Latest comment", "最新コメント")}: ${latest.content}\n${b.t("내 편집을 유지하고 최신 버전을 기준으로 다시 저장할까요?", "Keep your text and prepare to save against the latest version?", "編集を保持し、最新バージョンを基準に保存を準備しますか？")}`,
                      )
                    )
                      setEditing(latest);
                  })()
                }
              >
                {b.t(
                  "최신 버전과 비교",
                  "Compare latest version",
                  "最新バージョンと比較",
                )}
              </button>
            )}
          </div>
        </div>
      )}
      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <label className="text-xs text-foreground dark:text-white">
          {b.t(
            "댓글 작성 (최대 2,000자)",
            "Write a comment (up to 2,000)",
            "コメントを書く（2,000字まで）",
          )}
          <textarea
            className={`${buildField} mt-2 min-h-24`}
            disabled={!b.canWrite || b.pending}
            maxLength={2000}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-xs text-foreground dark:text-white">
            {text.length}/2000
          </span>
          <button
            type="submit"
            disabled={
              !b.canWrite ||
              b.pending ||
              reviewRequired ||
              wait > 0 ||
              !text.trim() ||
              comments.isError
            }
            className={buildButton}
          >
            {wait > 0
              ? `${wait}s`
              : b.t("댓글 등록", "Post comment", "コメント投稿")}
          </button>
        </div>
      </form>
    </section>
  );
}
