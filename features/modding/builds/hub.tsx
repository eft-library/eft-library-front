"use client";
import Image from "next/image";
import { Box, Trash2 } from "lucide-react";
import { weaponPreviewImage } from "../default-preset";
import { getWeapons } from "../api";
import type { ItemSummary } from "../types";
import type { OwnBuildSummary } from "./types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { itemName } from "../build";
import { buildsApi, buildsKey } from "./api";
import { getOwnedBuildSummaries } from "./ownership";
import { useBuilds } from "./provider";
import { BuildLoginNotice } from "./editor-panel";
import {
  BuildError,
  BuildPagination,
  MODDING_PAGE_SIZE,
  buildButton,
  buildField,
  buildPanel,
} from "./ui";
import { BuildDetail } from "./public-detail";

export function BuildsHub() {
  const b = useBuilds();
  const mine = b.screen === "mine";
  const { listPage: page, setListPage: setPage, updateList } = b;
  const queryString = useSearchParams();
  const search = (queryString.get("word") ?? "").slice(0, 200).trim();
  const sort = queryString.get("sort") === "best" ? "best" : "latest";
  const requestedPeriod = queryString.get("period");
  const period = requestedPeriod === "week" || requestedPeriod === "all" ? requestedPeriod : "month";
  const weaponId = queryString.get("weapon_item_id") || undefined;
  const detailId = b.publicBuildId;
  const selectionScope = `${b.account}:${mine}:${page}:${search}:${weaponId ?? ""}`;
  const [selection, setSelection] = useState<{ scope: string; ids: Set<string> }>({ scope: "", ids: new Set() });
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(MODDING_PAGE_SIZE),
    sort,
    period,
    word: search,
  });
  if (weaponId) params.set("weapon_item_id", weaponId);
  const list = useQuery({
    queryKey: [...buildsKey, "public", params.toString()],
    queryFn: ({ signal }) => buildsApi.list(params, signal),
    enabled: !mine && b.enabled,
    staleTime: 0,
    retry: false,
  });
  const ownership = useQuery({
    queryKey: [...buildsKey, b.account, "ownership"],
    queryFn: ({ signal }) => getOwnedBuildSummaries(b.token, signal),
    enabled: !mine && b.canWrite,
    staleTime: 30_000,
    gcTime: 0,
    retry: false,
  });
  const own = useQuery({
    queryKey: [...buildsKey, b.account, "mine", search, weaponId, page, MODDING_PAGE_SIZE],
    queryFn: ({ signal }) => buildsApi.mine(page, b.token, signal, { word: search, weapon_item_id: weaponId }),
    enabled: mine && b.canWrite,
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });
  const visibleBuilds = own.data?.builds ?? [];
  const selectedBuilds = visibleBuilds.filter((build) => selection.scope === selectionScope && selection.ids.has(build.id));
  function selectBuild(id: string, checked: boolean) {
    setSelection((current) => {
      const ids = new Set(current.scope === selectionScope ? current.ids : []);
      if (checked) ids.add(id); else ids.delete(id);
      return { scope: selectionScope, ids };
    });
  }
  async function deleteSelected() {
    const result = await b.discardBuilds(selectedBuilds);
    if (!result) return;
    setSelection({ scope: selectionScope, ids: new Set(result.failed.map((item) => item.id)) });
    if (result.deleted.length === visibleBuilds.length && page > 1) setPage(page - 1, true);
  }
  const ownedById = new Map(ownership.data?.map((build) => [build.id, build]));
  async function deleteFromList(build: OwnBuildSummary) {
    if (await b.discardBuild(build)) {
      if ((mine ? own.data?.builds.length : list.data?.builds.length) === 1 && page > 1)
        setPage(page - 1, true);
    }
  }
  const weapons = useQuery({
    queryKey: ["modding", "weapons"],
    queryFn: ({ signal }) => getWeapons(signal),
    enabled: true,
    staleTime: 5 * 60_000,
    retry: false,
  });
  const query = mine ? own : list;
  const total = query.data?.total;
  useEffect(() => {
    if (total === undefined || detailId) return;
    const lastPage = Math.max(1, Math.ceil(total / MODDING_PAGE_SIZE));
    if (page > lastPage) setPage(lastPage, true);
  }, [detailId, page, setPage, total]);
  if (detailId && !mine)
    return (
      <BuildDetail
        key={`${b.account}:${detailId}`}
        id={detailId}
        manifest={weapons.isPending ? undefined : weapons.data?.manifest ?? null}
        back={() => b.setPublicBuild(null)}
      />
    );
  return (
    <section className={buildPanel}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">
          {mine
            ? b.t("내 빌드", "My builds", "マイビルド")
            : b.t("공개 빌드", "Community builds", "公開ビルド")}
        </h2>
        <button
          className={buildButton}
          disabled={query.isFetching || (mine && !b.canWrite)}
          onClick={() => void query.refetch()}
        >
          {b.t("새로고침", "Refresh", "更新")}
        </button>
      </div>
      {mine && <BuildLoginNotice action="mine" />}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const word = String(new FormData(e.currentTarget).get("word") ?? "").trim();
            updateList({ word, page: null });
            setSelection({ scope: "", ids: new Set() });
          }}
          className="mb-5 flex flex-wrap items-center gap-2 lg:flex-nowrap"
        >
          <input
            aria-label={b.t(
              "빌드 제목 검색",
              "Search build titles",
              "ビルド名で検索",
            )}
            className={`${buildField.replace("w-full", "")} h-10 min-w-0 flex-1 basis-48 text-sm`}
            maxLength={200}
            key={search}
            name="word"
            defaultValue={search}
            onChange={(e) => {
              if (!e.target.value && search) updateList({ word: null, page: null });
            }}
            placeholder={b.t(
              "빌드 제목 검색",
              "Search build titles",
              "ビルド名で検索",
            )}
          />
          <button className={`${buildButton} h-10 shrink-0 whitespace-nowrap text-sm`} type="submit">
            {b.t("검색", "Search", "検索")}
          </button>
          {!mine && <>
          <select
            aria-label={b.t("정렬", "Sort", "並び順")}
            className={`${buildField.replace("w-full", "")} h-10 w-auto shrink-0 text-sm`}
            value={sort}
            onChange={(e) => updateList({ sort: e.target.value, page: null })}
          >
            <option value="latest">{b.t("최신순", "Latest", "新着順")}</option>
            <option value="best">BEST</option>
          </select>
          <select
            aria-label={b.t(
              "추천 집계 기간",
              "Vote scoring period",
              "投票集計期間",
            )}
            className={`${buildField.replace("w-full", "")} h-10 w-auto shrink-0 text-sm`}
            value={period}
            onChange={(e) => updateList({ period: e.target.value, page: null })}
          >
            <option value="week">
              {b.t("최근 7일", "Last 7 days", "過去7日")}
            </option>
            <option value="month">
              {b.t("최근 30일", "Last 30 days", "過去30日")}
            </option>
            <option value="all">
              {b.t("전체 기간", "All time", "全期間")}
            </option>
          </select>
          </>}
          {(b.content || weaponId) && (
            <label className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm">
              <input
                type="checkbox"
                checked={!!weaponId}
                onChange={(e) => {
                  updateList({ weapon_item_id: e.target.checked ? b.content?.weapon_item_id ?? null : null, page: null });
                  setSelection({ scope: "", ids: new Set() });
                }}
              />
              {b.t("선택 총기만", "Selected weapon only", "選択武器のみ")}
            </label>
          )}
        </form>
      {b.message && <p role="status" className="mb-3 text-sm">{b.message}</p>}
      <BuildError error={b.error} locale={b.locale} />
      {!mine && b.canWrite && <BuildError error={ownership.error} locale={b.locale} retry={() => void ownership.refetch()} />}
      <BuildError
        error={query.error}
        locale={b.locale}
        retry={() => void query.refetch()}
      />
      {query.isFetching && !query.data && (
        <p
          role="status"
          className="py-10 text-center text-sm text-foreground dark:text-white"
        >
          {b.t("불러오는 중…", "Loading…", "読み込み中…")}
        </p>
      )}
      {mine ? (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-surface-elevated p-3">
            <label className="flex min-h-10 items-center gap-2 text-sm">
              <input type="checkbox" checked={visibleBuilds.length > 0 && selectedBuilds.length === visibleBuilds.length} ref={(node) => { if (node) node.indeterminate = selectedBuilds.length > 0 && selectedBuilds.length < visibleBuilds.length; }}
                disabled={!b.canWrite || b.pending || own.isFetching || !visibleBuilds.length}
                onChange={(event) => setSelection({ scope: selectionScope, ids: new Set(event.target.checked ? visibleBuilds.map((build) => build.id) : []) })}
                className="size-4 accent-orange-600 focus-visible:outline-2 focus-visible:outline-accent" />
              {b.t("현재 페이지 전체 선택", "Select this page", "このページを全選択")}
            </label>
            <button type="button" onClick={() => void deleteSelected()} disabled={!b.canWrite || b.pending || own.isFetching || !selectedBuilds.length}
              className={`${buildButton} text-red-700 hover:border-red-400 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/40`}>
              <Trash2 className="size-4" />{b.t("선택 삭제", "Delete selected", "選択項目を削除")} ({selectedBuilds.length})
            </button>
          </div>
          {own.data?.builds.map((build) => {
            const weapon = weapons.data?.list.weapons.find(
              (row) => row.item.id === build.weapon_item_id,
            );
            return (
              <OwnBuildCard
                key={build.id}
                build={build}
                weapon={weapon?.item}
                previewImage={weapon ? weaponPreviewImage(weapon) : undefined}
                sourceReady={weapons.isFetched}
                checked={selectedBuilds.some((selected) => selected.id === build.id)}
                onSelect={(checked) => selectBuild(build.id, checked)}
                selectionDisabled={own.isFetching}
              />
            );
          })}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.data?.builds.map((build) => {
            const weapon = weapons.data?.list.weapons.find(
              (row) => row.item.id === build.weapon.id,
            );
            const previewImage = weapon
              ? weaponPreviewImage(weapon) ?? build.weapon.image
              : build.weapon.image;
            return (
            <article key={build.id} className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-line">
            <button
              type="button"
              onClick={() => b.setPublicBuild(build.id)}
              className="min-w-0 flex-1 text-left hover:bg-surface-elevated/50 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <div className="flex h-36 items-center justify-center bg-surface-elevated/60 p-5">
                {previewImage ? (
                  <Image
                    unoptimized
                    src={previewImage}
                    alt=""
                    width={280}
                    height={120}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-sm text-foreground dark:text-white">
                    {itemName(build.weapon, b.locale)}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="break-words text-base font-semibold">
                  {build.title}
                </h3>
                <p className="mt-1 text-sm text-foreground dark:text-white">
                  {build.author_nickname ?? "—"}
                </p>
                <p className="mt-3 text-sm text-foreground dark:text-white">
                  {itemName(build.weapon, b.locale)}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 border-t border-line pt-3 text-sm">
                  <span>♥ {build.vote_count}</span>
                  <span>
                    {b.t("댓글", "Comments", "コメント")} {build.comment_count}
                  </span>
                  <span className="ml-auto font-mono text-accent">
                    BEST {build.score}
                  </span>
                </div>
              </div>
            </button>
            {b.canWrite && ownedById.has(build.id) && <div className="flex justify-end border-t border-line p-3"><DeleteBuildButton title={build.title} disabled={b.pending || ownership.isFetching} onClick={() => { const owned = ownedById.get(build.id); if (owned) void deleteFromList(owned); }} /></div>}
            </article>
            );
          })}
        </div>
      )}
      {query.data?.total === 0 && (
        <p className="py-12 text-center text-sm text-foreground dark:text-white">
          {b.t(
            search ? "검색 결과가 없습니다." : "표시할 빌드가 없습니다.",
            search ? "No matching builds." : "No builds to display.",
            search ? "検索結果がありません。" : "表示するビルドがありません。",
          )}
        </p>
      )}
      {query.data && (
        <BuildPagination
          page={page}
          total={query.data.total}
          onChange={setPage}
          disabled={query.isFetching || b.pending}
          locale={b.locale}
        />
      )}
    </section>
  );
}

function OwnBuildCard({
  build,
  weapon,
  sourceReady,
  previewImage,
  checked,
  onSelect,
  selectionDisabled,
}: {
  build: OwnBuildSummary;
  weapon?: ItemSummary;
  sourceReady: boolean;
  previewImage?: string | null;
  checked: boolean;
  onSelect: (checked: boolean) => void;
  selectionDisabled: boolean;
}) {
  const b = useBuilds();
  const current =
    b.workspace?.id === build.id
      ? b.workspace.content.nodes.find(
          (node) =>
            !node.parent_node_id && node.item_id === build.weapon_item_id,
        )?.item
      : undefined;
  // Own summaries only contain weapon_item_id. When the source item disappears,
  // retain identification from the authenticated workspace's saved snapshot.
  const saved = useQuery({
    queryKey: [...buildsKey, b.account, "detail", build.id, "draft"],
    queryFn: ({ signal }) =>
      buildsApi.detail(build.id, "draft", b.token, signal),
    enabled: b.canWrite && sourceReady && !weapon && !current,
    staleTime: 60_000,
    gcTime: 0,
    retry: false,
  });
  const root =
    weapon ??
    current ??
    saved.data?.content.nodes.find(
      (node) => !node.parent_node_id && node.item_id === build.weapon_item_id,
    )?.item;
  return (
    <article className={`flex items-center gap-1 overflow-hidden rounded-xl border pl-3 ${checked ? "border-accent bg-orange-50/60 dark:bg-orange-950/20" : "border-line"}`}>
    <input type="checkbox" aria-label={`${build.title} · ${b.t("선택", "Select", "選択")}`} checked={checked} onChange={(event) => onSelect(event.target.checked)} disabled={!b.canWrite || b.pending || selectionDisabled} className="size-4 shrink-0 accent-orange-600 focus-visible:outline-2 focus-visible:outline-accent" />
    <button
      type="button"
      disabled={b.pending}
      onClick={() => void b.open(build.id)}
      className="flex min-w-0 flex-1 items-center gap-3 p-3 text-left hover:border-accent/50 hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-70 sm:gap-4 sm:p-4"
    >
      <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-surface-elevated/60 p-2 sm:w-24">
        {previewImage || root?.image ? (
          <Image
            unoptimized
            src={(previewImage ?? root?.image)!}
            alt=""
            width={160}
            height={80}
            className="h-full w-full object-contain"
          />
        ) : (
          <Box
            aria-hidden
            className="h-8 w-8 text-foreground dark:text-white"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="break-words text-sm font-semibold">{build.title}</h3>
        <p className="mt-1 break-words text-sm font-medium text-foreground dark:text-white">
          {root
            ? itemName(root, b.locale)
            : saved.isError
              ? b.t(
                  "총기 정보를 불러오지 못했습니다.",
                  "Weapon information unavailable.",
                  "武器情報を取得できませんでした。",
                )
              : b.t(
                  "총기 정보를 불러오는 중…",
                  "Loading weapon…",
                  "武器情報を読み込み中…",
                )}
        </p>
        <p className="mt-2 text-sm text-foreground dark:text-white">
          {build.is_public
            ? b.t("공개", "Published", "公開")
            : b.t("공개 대기", "Awaiting publication", "公開待ち")}{" "}
          · v{build.version} ·{" "}
          {new Intl.DateTimeFormat(b.locale, {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(build.updated_at))}
        </p>
      </div>
      <span className="shrink-0 text-sm text-accent">
        {b.t("편집", "Edit", "編集")}
      </span>
    </button>
    </article>
  );
}

function DeleteBuildButton({ title, disabled, onClick }: { title: string; disabled: boolean; onClick: () => void }) {
  const b = useBuilds();
  return <button type="button" disabled={disabled} onClick={onClick} aria-label={`${title} · ${b.t("빌드 삭제", "Delete build", "ビルド削除")}`} className={`${buildButton} text-sm text-red-700 hover:border-red-400 hover:bg-red-50 dark:text-red-300 dark:hover:border-red-500 dark:hover:bg-red-950/40`}><Trash2 className="size-4" />{b.t("삭제", "Delete", "削除")}</button>;
}
