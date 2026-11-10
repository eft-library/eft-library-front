"use client";
import { useMemo, useState } from "react";
import { itemName } from "../build";
import { useBuilds } from "../builds/provider";
import {
  reconstructedNodes,
  supportedReconstruction,
} from "../builds/preset-import";
import { buildButton } from "../builds/ui";
import type {
  ItemDetail,
  PresetDetail,
  ReconstructedTree,
  ReconstructionIssue,
} from "../types";

export function PresetReconstructionPanel({
  detail,
  items,
  loading,
  onImported,
}: {
  detail: PresetDetail;
  items: Record<string, ItemDetail>;
  loading: boolean;
  onImported: () => void;
}) {
  const b = useBuilds();
  const r = detail.reconstruction;
  const supported = supportedReconstruction(detail);
  const [selected, setSelected] = useState<number | null>(() =>
    supported &&
    r?.status === "unique" &&
    r.is_unique &&
    r.search_complete &&
    r.candidate_trees.length === 1
      ? 0
      : null,
  );
  const valid = useMemo(
    () =>
      supported
        ? (r?.candidate_trees.map((tree) => {
            try {
              reconstructedNodes(detail, tree);
              return true;
            } catch {
              return false;
            }
          }) ?? [])
        : [],
    [detail, supported, r],
  );
  if (!r) return null;
  const statuses = {
    unique: b.t("추정 구성", "Inferred build", "推定構成"),
    ambiguous: b.t(
      "여러 배치 후보 · 선택 필요",
      "Multiple layouts · choose one",
      "複数の配置候補・選択が必要",
    ),
    search_limited: b.t(
      "탐색 미완료 · 추가 후보가 있을 수 있음",
      "Search unfinished · more layouts may exist",
      "探索未完了・他の候補がある可能性",
    ),
    incomplete: b.t(
      "일부 구성품 배치 불가",
      "Some components cannot be placed",
      "一部の構成品を配置できません",
    ),
    unavailable: b.t("불러오기 불가", "Import unavailable", "読込不可"),
  };
  const canImport =
    supported &&
    r.can_import &&
    ["unique", "ambiguous", "search_limited"].includes(r.status) &&
    !r.unplaced_components.length &&
    selected !== null &&
    valid[selected] &&
    b.content?.weapon_item_id === detail.preset.base_item_id;
  return (
    <section
      className="my-5 rounded-xl border border-accent/25 bg-accent/5 p-4"
      aria-label={b.t(
        "추정 구성 불러오기",
        "Import inferred build",
        "推定構成の読込",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-foreground dark:text-white">
          {supported
            ? statuses[r.status]
            : b.t(
                "지원하지 않는 재조립 정보",
                "Unsupported reconstruction data",
                "未対応の再構成データ",
              )}
        </h4>
        <button
          type="button"
          disabled={!canImport || b.pending || loading}
          className={`${buildButton} border-accent/50 text-orange-700 dark:text-orange-300`}
          onClick={() =>
            void (async () => {
              if (selected !== null && (await b.importPreset(detail, selected)))
                onImported();
            })()
          }
        >
          {b.t(
            "추정 구성 불러오기",
            "Import inferred build",
            "推定構成を読み込む",
          )}
        </button>
      </div>
      {supported && (
        <>
          {!!r.candidate_trees.length && (
            <fieldset
              disabled={b.pending || loading}
              className="mt-4 space-y-3"
            >
              <legend className="sr-only">
                {b.t("배치 후보 선택", "Choose a layout", "配置候補を選択")}
              </legend>
              {r.candidate_trees.map((tree, index) => (
                <div
                  key={index}
                  className={`rounded-lg border p-3 ${selected === index ? "border-accent/60 bg-surface" : "border-line bg-surface/60"}`}
                >
                  <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                    <input
                      type="radio"
                      name={`reconstruction-${detail.preset.item.id}`}
                      value={index}
                      checked={selected === index}
                      disabled={!valid[index] || b.pending || loading}
                      onChange={() => setSelected(index)}
                    />
                    {b.t("배치 후보", "Layout", "配置候補")} {index + 1}
                    <span className="text-xs font-normal">
                      · {tree.nodes.length} {b.t("개 파츠", "parts", "パーツ")}
                    </span>
                  </label>
                  {!valid[index] ? (
                    <p className="mt-2 text-xs text-red-700 dark:text-red-300">
                      {b.t(
                        "완전한 구성으로 확인할 수 없어 불러올 수 없습니다.",
                        "This candidate could not be verified as complete.",
                        "完全な構成として確認できないため読み込めません。",
                      )}
                    </p>
                  ) : (
                    <details className="mt-2" open={selected === index}>
                      <summary className="cursor-pointer text-xs text-foreground dark:text-white">
                        {b.t(
                          "장착 위치 미리보기",
                          "Preview attachments",
                          "装着位置のプレビュー",
                        )}
                      </summary>
                      <TreePreview detail={detail} tree={tree} items={items} />
                    </details>
                  )}
                </div>
              ))}
            </fieldset>
          )}
          {r.partial_tree && !r.can_import && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium">
                {b.t(
                  "부분 구성 미리보기",
                  "Partial layout preview",
                  "部分構成のプレビュー",
                )}
              </summary>
              <TreePreview
                detail={detail}
                tree={r.partial_tree}
                items={items}
              />
            </details>
          )}
          {!!r.unplaced_components.length && (
            <div className="mt-4">
              <h5 className="text-xs font-semibold">
                {b.t(
                  "배치되지 않은 구성품",
                  "Unplaced components",
                  "未配置の構成品",
                )}
              </h5>
              <ul className="mt-2 space-y-1 text-xs">
                {r.unplaced_components.map((part, index) => {
                  const original = detail.components.find(
                    (component) =>
                      component.component_index === part.component_index,
                  );
                  return (
                    <li key={index}>
                      {original
                        ? itemName(original.item, b.locale)
                        : b.t(
                            "구성품 정보 없음",
                            "Component unavailable",
                            "構成品情報なし",
                          )}{" "}
                      ×{part.quantity}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {!!r.issues.length && (
            <details className="mt-3">
              <summary className="cursor-pointer text-xs font-medium">
                {b.t(
                  "재조립 결과 안내",
                  "Reconstruction notes",
                  "再構成について",
                )}
              </summary>
              <ul className="mt-2 space-y-1 text-xs text-foreground dark:text-white">
                {[...new Set(r.issues.map((issue) => issue.code))].map(
                  (code) => (
                    <li key={code}>{issueText(code, b.t)}</li>
                  ),
                )}
                {r.issues_truncated && <li>…</li>}
              </ul>
            </details>
          )}
        </>
      )}
    </section>
  );
}
function TreePreview({
  detail,
  tree,
  items,
}: {
  detail: PresetDetail;
  tree: ReconstructedTree;
  items: Record<string, ItemDetail>;
}) {
  const b = useBuilds();
  const visited = new Set<string>();
  const rows: Array<{
    node: ReconstructedTree["nodes"][number];
    depth: number;
  }> = [];
  function visit(parent: string | null, depth: number) {
    if (depth > 200) return;
    for (const node of tree.nodes) {
      if (node.parent_node_id !== parent || visited.has(node.node_id)) continue;
      visited.add(node.node_id);
      rows.push({ node, depth });
      visit(node.node_id, depth + 1);
    }
  }
  visit(null, 0);
  for (const node of tree.nodes)
    if (!visited.has(node.node_id)) rows.push({ node, depth: 0 });
  return (
    <ol className="mt-3 space-y-2">
      {rows.map(({ node, depth }) => {
        const component = detail.components.find(
          (component) =>
            component.component_index === node.source_component_index,
        );
        const parent = tree.nodes.find(
          (parent) => parent.node_id === node.parent_node_id,
        );
        const slot = parent
          ? items[parent.item_id]?.slots.find(
              (slot) => slot.slot_id === node.slot_id,
            )
          : undefined;
        return (
          <li
            key={node.node_id}
            style={{ marginInlineStart: Math.min(depth, 6) * 12 }}
            className="border-l-2 border-line pl-3 text-xs leading-5"
          >
            <p className="font-medium">
              {component
                ? itemName(component.item, b.locale)
                : b.t(
                    "구성품 정보 없음",
                    "Component unavailable",
                    "構成品情報なし",
                  )}
            </p>
            {parent && (
              <p className="text-foreground dark:text-white">
                {slot
                  ? itemName(slot, b.locale)
                  : b.t(
                      "장착 위치 확인 중",
                      "Checking attachment slot",
                      "装着位置を確認中",
                    )}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
function issueText(
  code: ReconstructionIssue["code"],
  t: (ko: string, en: string, ja: string) => string,
) {
  const messages: Record<
    ReconstructionIssue["code"],
    [string, string, string]
  > = {
    UNSUPPORTED_BASE_ITEM: [
      "지원하지 않는 기본 아이템입니다.",
      "Unsupported base item.",
      "未対応の基本アイテムです。",
    ],
    INVALID_COMPONENTS: [
      "구성품 정보를 확인할 수 없습니다.",
      "Invalid component data.",
      "構成品情報を確認できません。",
    ],
    NODE_LIMIT: [
      "구성품 수가 불러오기 한도를 초과합니다.",
      "Too many component instances.",
      "構成品数が上限を超えています。",
    ],
    ROOT_COMPONENT_COUNT: [
      "기본 총기 구성품을 확인할 수 없습니다.",
      "The base weapon instance is not unique.",
      "基本武器の構成品を確認できません。",
    ],
    MISSING_ITEM_DEFINITION: [
      "일부 아이템 정보를 찾을 수 없습니다.",
      "Some item definitions are missing.",
      "一部のアイテム情報がありません。",
    ],
    UNRESOLVED_CONFLICT_SLOT: [
      "일부 슬롯의 충돌 정보를 확인할 수 없습니다.",
      "Some conflicting slot definitions are missing.",
      "一部のスロットの干渉情報がありません。",
    ],
    ITEM_CONFLICT: [
      "함께 장착할 수 없는 파츠가 포함되어 있습니다.",
      "Conflicting parts are included.",
      "干渉するパーツが含まれています。",
    ],
    CATEGORY_CONFLICT: [
      "파츠 분류의 충돌이 있습니다.",
      "Component categories conflict.",
      "パーツ分類が干渉しています。",
    ],
    SLOT_UNREACHABLE: [
      "일부 구성품을 넣을 슬롯을 찾지 못했습니다.",
      "No attachment slot was found for some components.",
      "一部の構成品のスロットが見つかりません。",
    ],
    AMMUNITION_WITHOUT_SLOT: [
      "탄약을 배치할 슬롯 정보가 없습니다.",
      "No stored attachment slot exists for ammunition.",
      "弾薬を配置するスロット情報がありません。",
    ],
    MULTIPLE_SOLUTIONS: [
      "가능한 배치가 여러 개입니다.",
      "Multiple layouts are possible.",
      "複数の配置が可能です。",
    ],
    SEARCH_LIMIT: [
      "탐색이 완료되지 않았습니다.",
      "The search did not finish.",
      "探索が完了していません。",
    ],
    SOLUTION_LIMIT: [
      "표시된 후보 외에 다른 배치가 있을 수 있습니다.",
      "Other layouts may exist beyond the shown candidates.",
      "表示された候補以外にも配置がある可能性があります。",
    ],
    REQUIRED_SLOT_UNFILLED: [
      "필수 슬롯이 채워지지 않았습니다.",
      "Required slots remain empty.",
      "必須スロットが埋まっていません。",
    ],
    NO_COMPLETE_TREE: [
      "전체 구성품을 배치한 후보를 찾지 못했습니다.",
      "No complete layout was found.",
      "完全な配置候補が見つかりませんでした。",
    ],
  };
  return t(...messages[code]);
}
