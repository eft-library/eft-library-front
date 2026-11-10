"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import type { Locale } from "@/i18n/config";
import { useAuthRecovery } from "@/lib/auth/use-auth-recovery";
import type { ItemSummary, WeaponSummary, PresetDetail } from "../types";
import type { StoredContent, Workspace } from "./types";
import { BUILDS_ENABLED, BuildApiError, buildsApi, buildsKey } from "./api";
import {
  buildHistoryReducer,
  buildHistoryShortcut,
  emptyBuildHistory,
} from "./history";
import { importPresetContent } from "./preset-import";
import { savePublicBuild } from "./publication";
import { buildInput, mountPart, newContent, removeNode } from "./tree";
import { buildText, ConfirmBuildAction } from "./ui";

type Screen = "weapons" | "editor" | "public" | "mine";
const Context = createContext<ReturnType<typeof useBuildState> | null>(null);
function useBuildState(
  locale: Locale,
  account: string,
  token: string,
  registered: boolean,
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuthRecovery();
  const [screen, setScreen] = useState<Screen>(() =>
    pathname === "/modding" ? "weapons" : "editor",
  );
  useEffect(() => {
    setScreen(pathname === "/modding" ? "weapons" : "editor");
  }, [pathname]);
  function navigateScreen(next: Screen) {
    setScreen(next);
    const target =
      next === "weapons"
        ? "/modding"
        : next === "editor" && content
          ? `/modding/${content.weapon_item_id}`
          : null;
    if (target && pathname !== target) router.push(target);
  }
  const [history, dispatchHistory] = useReducer(
    buildHistoryReducer,
    emptyBuildHistory,
  );
  const content = history.content;
  const hasContent = content !== null;
  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;
  function setContent(next: StoredContent | null) {
    dispatchHistory({ type: "load", content: next });
  }
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [baseline, setBaseline] = useState("");
  const [conflict, setConflict] = useState<Workspace | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [pending, setPending] = useState(false);
  const busy = useRef(false);
  const alive = useRef(true);
  const [message, setMessage] = useState("");
  const [publicationFailed, setPublicationFailed] = useState(false);
  const confirmation = useRef<((value: boolean) => void) | null>(null);
  const [confirmMessage, setConfirmMessage] = useState<string | null>(null);
  const intents = useRef(new Map<string, string>());
  const dirty = !!content && JSON.stringify(content) !== baseline;
  const t = (ko: string, en: string, ja: string) =>
    buildText(locale, ko, en, ja);
  const canWrite = BUILDS_ENABLED && !!token && registered && auth === "idle";
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      confirmation.current?.(false);
      void queryClient
        .cancelQueries({ queryKey: [...buildsKey, account] })
        .then(() =>
          queryClient.removeQueries({ queryKey: [...buildsKey, account] }),
        );
    };
  }, [account, queryClient]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  function confirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      confirmation.current?.(false);
      confirmation.current = resolve;
      setConfirmMessage(message);
    });
  }
  function resolveConfirm(value: boolean) {
    setConfirmMessage(null);
    confirmation.current?.(value);
    confirmation.current = null;
  }
  function intent(key: string) {
    let id = intents.current.get(key);
    if (!id) {
      id = crypto.randomUUID();
      intents.current.set(key, id);
    }
    return id;
  }
  function completeIntent(key: string) {
    intents.current.delete(key);
  }
  async function refresh() {
    await queryClient.invalidateQueries({ queryKey: buildsKey });
  }
  async function perform<T>(job: () => Promise<T>): Promise<T | undefined> {
    if (busy.current) return;
    busy.current = true;
    setPending(true);
    setError(null);
    setMessage("");
    try {
      const result = await job();
      if (!alive.current) return;
      await refresh();
      return result;
    } catch (error) {
      if (alive.current) {
        setError(error);
        if (error instanceof BuildApiError && error.status === 409)
          await refresh();
      }
    } finally {
      busy.current = false;
      if (alive.current) setPending(false);
    }
  }
  function accept(next: Workspace, preserveHistory = false) {
    setPublicationFailed(false);
    setWorkspace(next);
    dispatchHistory({
      type: preserveHistory ? "sync" : "load",
      content: next.content,
    });
    setBaseline(JSON.stringify(next.content));
    setConflict(null);
    setError(null);
    setScreen("editor");
    const target = `/modding/${next.content.weapon_item_id}`;
    if (pathname !== target) router.push(target);
  }
  async function mayReplace() {
    return (
      !dirty ||
      (await confirm(
        t(
          "저장하지 않은 편집을 버리고 새 구성을 열까요?",
          "Discard unsaved edits and open this build?",
          "未保存の編集を破棄して開きますか？",
        ),
      ))
    );
  }
  async function start(weapon: WeaponSummary) {
    if (busy.current || !(await mayReplace())) return false;
    const next = newContent(weapon);
    setWorkspace(null);
    setPublicationFailed(false);
    setContent(next);
    setBaseline(JSON.stringify(next));
    setConflict(null);
    setError(null);
    setScreen("editor");
    const target = `/modding/${weapon.item.id}`;
    if (pathname !== target) router.push(target);
    return true;
  }
  async function open(id: string) {
    if (!canWrite || !(await mayReplace())) return;
    const result = await perform(() => buildsApi.detail(id, "draft", token));
    if (result?.view === "draft") accept(result);
  }
  async function save() {
    if (!content || !canWrite) return;
    let persisted = false;
    const result = await perform(async () => {
      const input = buildInput(content);
      try {
        return await savePublicBuild(
          async () => {
            if (workspace && !dirty) {
              const latest = await buildsApi.detail(
                workspace.id,
                "draft",
                token,
              );
              if (latest.view !== "draft")
                throw new Error("BUILD_RESPONSE_INVALID");
              return latest;
            }
            return workspace
              ? buildsApi.update(
                  workspace.id,
                  { ...input, expected_version: workspace.version },
                  token,
                )
              : buildsApi.create(
                  {
                    ...input,
                    request_id: intent(`create:${JSON.stringify(input)}`),
                  },
                  token,
                );
          },
          token,
          (saved) => {
            // Retrying an idempotent creation can return an already edited draft.
            // Review that version rather than publishing unexpected content.
            if (
              JSON.stringify(buildInput(saved.content)) !==
              JSON.stringify(input)
            ) {
              if (alive.current) setConflict(saved);
              throw new BuildApiError(409, "BUILD_VERSION_CONFLICT");
            }
            persisted = true;
            completeIntent(`create:${JSON.stringify(input)}`);
            if (alive.current) accept(saved, true);
          },
        );
      } catch (error) {
        if (alive.current && persisted) {
          setPublicationFailed(true);
          await refresh();
        }
        if (
          error instanceof BuildApiError &&
          error.code === "BUILD_VERSION_CONFLICT" &&
          workspace
        ) {
          const latest = await buildsApi.detail(workspace.id, "draft", token);
          if (alive.current && latest.view === "draft") setConflict(latest);
        }
        throw error;
      }
    });
    if (result) {
      accept(result, true);
      setMessage(
        t(
          "저장하고 공개했습니다.",
          "Saved and shared publicly.",
          "保存して公開しました。",
        ),
      );
    }
  }
  async function discardBuild() {
    if (
      !workspace ||
      !canWrite ||
      !(await confirm(
        t(
          "이 빌드와 공개본·추천·댓글을 삭제할까요? 복구할 수 없습니다.",
          "Delete this build, its publications, votes and comments? This cannot be undone.",
          "ビルド・公開版・投票・コメントを削除しますか？元に戻せません。",
        ),
      ))
    )
      return;
    const result = await perform(() =>
      buildsApi.delete(workspace.id, workspace.version, token),
    );
    if (result) {
      setWorkspace(null);
      setContent(null);
      setBaseline("");
      setScreen("mine");
      if (pathname !== "/modding") router.push("/modding");
    }
  }
  async function copy(id: string, revision: number) {
    if (!canWrite || !(await mayReplace())) return;
    let persisted = false;
    const result = await perform(async () => {
      try {
        return await savePublicBuild(
          () =>
            buildsApi.copy(
              id,
              { revision, request_id: intent(`copy:${id}:${revision}`) },
              token,
            ),
          token,
          (saved) => {
            persisted = true;
            completeIntent(`copy:${id}:${revision}`);
            if (alive.current) accept(saved);
          },
        );
      } catch (error) {
        if (alive.current && persisted) {
          setPublicationFailed(true);
          await refresh();
        }
        throw error;
      }
    });
    if (result) accept(result);
  }
  function edit(next: StoredContent) {
    if (!busy.current) {
      dispatchHistory({ type: "edit", content: next });
      setMessage("");
    }
  }
  function mount(key: string, item?: ItemSummary) {
    if (content && !busy.current) edit(mountPart(content, key, item));
  }
  function remove(id: string) {
    if (content && !busy.current)
      edit({ ...content, nodes: removeNode(content.nodes, id) });
  }
  async function reset() {
    if (
      content &&
      !busy.current &&
      (await confirm(
        t(
          "장착한 파츠를 모두 해제할까요?",
          "Remove all mounted parts?",
          "装着パーツをすべて解除しますか？",
        ),
      ))
    )
      edit({
        ...content,
        nodes: content.nodes.filter((node) => !node.parent_node_id),
      });
  }
  async function importPreset(detail: PresetDetail, index: number) {
    if (!content || busy.current) return false;
    let next: StoredContent;
    try {
      next = importPresetContent(detail, index, content, locale);
    } catch (error) {
      setError(error);
      return false;
    }
    if (
      !(await confirm(
        t(
          "실제 원본 배치가 아닌 추정 구성입니다. 현재 장착 구성을 이 후보로 교체할까요? 되돌리기로 복구할 수 있습니다.",
          "This is an inferred layout, not the original source tree. Replace your current attachments with this candidate? Undo can restore them.",
          "元の配置ではなく推定構成です。この候補で現在の装着構成を置き換えますか？元に戻す操作で復元できます。",
        ),
      ))
    )
      return false;
    if (!alive.current || busy.current) return false;
    edit(next);
    setError(null);
    setScreen("editor");
    return true;
  }
  function undo() {
    if (!busy.current && !confirmMessage) {
      dispatchHistory({ type: "undo" });
      setMessage("");
    }
  }
  function redo() {
    if (!busy.current && !confirmMessage) {
      dispatchHistory({ type: "redo" });
      setMessage("");
    }
  }
  useEffect(() => {
    if (screen !== "editor" || !hasContent || pending || confirmMessage) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      const editingText =
        target instanceof HTMLElement &&
        !!target.closest(
          "input, textarea, select, [contenteditable]:not([contenteditable='false']), [role='textbox']",
        );
      const action = buildHistoryShortcut(event, editingText);
      if (
        !action ||
        busy.current ||
        document.querySelector("dialog[open]") ||
        (action === "undo" ? !canUndo : !canRedo)
      )
        return;
      event.preventDefault();
      dispatchHistory({ type: action });
      setMessage("");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [screen, hasContent, pending, confirmMessage, canUndo, canRedo]);
  return {
    locale,
    t,
    account,
    token,
    canWrite,
    enabled: BUILDS_ENABLED,
    screen,
    setScreen: navigateScreen,
    content,
    workspace,
    dirty,
    conflict,
    error,
    setError,
    pending,
    message,
    publicationFailed,
    start,
    open,
    save,
    discardBuild,
    copy,
    edit,
    mount,
    remove,
    reset,
    undo,
    redo,
    importPreset,
    canUndo,
    canRedo,
    perform,
    refresh,
    confirm,
    intent,
    completeIntent,
    accept,
    confirmMessage,
    resolveConfirm,
    keepEdits: () => {
      if (conflict) {
        setWorkspace(conflict);
        setBaseline(JSON.stringify(conflict.content));
        setConflict(null);
        setError(null);
      }
    },
    loadLatest: () => {
      if (conflict) accept(conflict);
    },
    reload: async () => {
      if (workspace && (await mayReplace())) {
        const result = await perform(() =>
          buildsApi.detail(workspace.id, "draft", token),
        );
        if (result?.view === "draft") accept(result);
      }
    },
  };
}
export function BuildsProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const { data: session } = useSession();
  const account =
    session?.userInfo?.email ?? session?.user?.email ?? "anonymous";
  return (
    <AccountBuilds
      key={account}
      account={account}
      token={session?.accessToken ?? ""}
      registered={!!session?.userInfo && session.error !== "UserNotRegistered"}
      locale={locale}
    >
      {children}
    </AccountBuilds>
  );
}
function AccountBuilds({
  children,
  locale,
  account,
  token,
  registered,
}: {
  children: ReactNode;
  locale: Locale;
  account: string;
  token: string;
  registered: boolean;
}) {
  const state = useBuildState(locale, account, token, registered);
  return (
    <Context.Provider value={state}>
      {children}
      {state.confirmMessage && (
        <ConfirmBuildAction
          message={state.confirmMessage}
          locale={locale}
          resolve={state.resolveConfirm}
        />
      )}
    </Context.Provider>
  );
}
export function useBuilds() {
  const context = useContext(Context);
  if (!context) throw new Error("BuildsProvider required");
  return context;
}
