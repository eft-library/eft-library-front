"use client";
import Image from "next/image";
import { Box } from "lucide-react";
import { weaponPreviewImage } from "../default-preset";
import { getWeapons } from "../api";
import type { ItemSummary } from "../types";
import type { OwnBuildSummary } from "./types";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { itemName } from "../build";
import { buildsApi, buildsKey } from "./api";
import { useBuilds } from "./provider";
import { BuildLoginNotice } from "./editor-panel";
import {
  BuildError,
  BuildPagination,
  buildButton,
  buildField,
  buildPanel,
} from "./ui";
import { BuildDetail } from "./public-detail";

export function BuildsHub() {
  const b = useBuilds();
  const [page, setPage] = useState(1);
  const [word, setWord] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [period, setPeriod] = useState("month");
  const [filterWeapon, setFilterWeapon] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const mine = b.screen === "mine";
  const weaponId = filterWeapon ? b.content?.weapon_item_id : undefined;
  const params = new URLSearchParams({
    page: String(page),
    page_size: "20",
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
  const own = useQuery({
    queryKey: [...buildsKey, b.account, "mine", page],
    queryFn: ({ signal }) => buildsApi.mine(page, b.token, signal),
    enabled: mine && b.canWrite,
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });
  const weapons = useQuery({
    queryKey: ["modding", "weapons"],
    queryFn: ({ signal }) => getWeapons(signal),
    enabled: mine,
    staleTime: 5 * 60_000,
    retry: false,
  });
  const query = mine ? own : list;
  if (detailId && !mine)
    return (
      <BuildDetail
        key={`${b.account}:${detailId}`}
        id={detailId}
        back={() => setDetailId(null)}
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
      {mine ? (
        <BuildLoginNotice />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(word.trim());
            setPage(1);
          }}
          className="mb-5 flex flex-wrap items-center gap-2"
        >
          <input
            aria-label={b.t(
              "빌드 제목 검색",
              "Search build titles",
              "ビルド名で検索",
            )}
            className={`${buildField} sm:max-w-72`}
            maxLength={200}
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder={b.t(
              "빌드 제목 검색",
              "Search build titles",
              "ビルド名で検索",
            )}
          />
          <button className={buildButton} type="submit">
            {b.t("검색", "Search", "検索")}
          </button>
          <select
            aria-label={b.t("정렬", "Sort", "並び順")}
            className={`${buildField} w-auto`}
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
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
            className={`${buildField} w-auto`}
            value={period}
            onChange={(e) => {
              setPeriod(e.target.value);
              setPage(1);
            }}
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
          {b.content && (
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filterWeapon}
                onChange={(e) => {
                  setFilterWeapon(e.target.checked);
                  setPage(1);
                }}
              />
              {b.t("선택 총기만", "Selected weapon only", "選択武器のみ")}
            </label>
          )}
          <p className="w-full text-xs text-foreground dark:text-white">
            {b.t(
              "기간은 추천 집계 범위입니다. 해당 기간에 작성된 빌드만 표시하는 필터가 아닙니다.",
              "The period controls vote scoring, not build creation dates.",
              "期間は投票の集計範囲で、作成日の絞り込みではありません。",
            )}
          </p>
        </form>
      )}
      <BuildError error={b.error} locale={b.locale} />
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
              />
            );
          })}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.data?.builds.map((build) => (
            <button
              key={build.id}
              onClick={() => setDetailId(build.id)}
              className="overflow-hidden rounded-xl border border-line text-left hover:border-accent/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-accent"
            >
              <div className="flex h-36 items-center justify-center bg-surface-elevated/60 p-5">
                {build.weapon.image ? (
                  <Image
                    unoptimized
                    src={build.weapon.image}
                    alt=""
                    width={280}
                    height={120}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-foreground dark:text-white">
                    {itemName(build.weapon, b.locale)}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="break-words text-base font-semibold">
                  {build.title}
                </h3>
                <p className="mt-1 text-xs text-foreground dark:text-white">
                  {build.author_nickname ?? "—"} · r{build.revision}
                </p>
                <p className="mt-3 text-xs text-foreground dark:text-white">
                  {itemName(build.weapon, b.locale)}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 border-t border-line pt-3 text-xs">
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
          ))}
        </div>
      )}
      {query.data?.total === 0 && (
        <p className="py-12 text-center text-sm text-foreground dark:text-white">
          {b.t(
            "표시할 빌드가 없습니다.",
            "No builds to display.",
            "表示するビルドがありません。",
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
}: {
  build: OwnBuildSummary;
  weapon?: ItemSummary;
  sourceReady: boolean;
  previewImage?: string | null;
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
    <button
      disabled={b.pending}
      onClick={() => void b.open(build.id)}
      className="flex w-full items-center gap-3 rounded-xl border border-line p-3 text-left hover:border-accent/50 hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-70 sm:gap-4 sm:p-4"
    >
      <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-lg bg-surface-elevated/60 p-2 sm:w-36">
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
        <p className="mt-2 text-xs text-foreground dark:text-white">
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
      <span className="shrink-0 text-xs text-accent">
        {b.t("편집", "Edit", "編集")}
      </span>
    </button>
  );
}
