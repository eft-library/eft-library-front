import type { StoredContent, StoredNode } from "./types";
export const BUILD_HISTORY_LIMIT = 50;
export interface BuildHistory {
  content: StoredContent | null;
  past: StoredNode[][];
  future: StoredNode[][];
}
export const emptyBuildHistory: BuildHistory = {
  content: null,
  past: [],
  future: [],
};
export type BuildHistoryAction =
  | { type: "load"; content: StoredContent | null }
  | { type: "sync"; content: StoredContent }
  | { type: "edit"; content: StoredContent }
  | { type: "undo" | "redo" };
export function buildHistoryReducer(
  state: BuildHistory,
  action: BuildHistoryAction,
): BuildHistory {
  if (action.type === "load")
    return { content: action.content, past: [], future: [] };
  if (action.type === "sync")
    return state.content?.weapon_item_id === action.content.weapon_item_id
      ? { ...state, content: action.content }
      : { content: action.content, past: [], future: [] };
  if (action.type === "edit") {
    if (
      !state.content ||
      state.content.weapon_item_id !== action.content.weapon_item_id
    )
      return { content: action.content, past: [], future: [] };
    // Text fields keep their native undo stack. Only attachment changes enter
    // the build history, preserving node IDs, attributes and whole subtrees.
    if (
      state.content.nodes === action.content.nodes ||
      JSON.stringify(state.content.nodes) ===
        JSON.stringify(action.content.nodes)
    )
      return { ...state, content: action.content };
    return {
      content: action.content,
      past: [...state.past, state.content.nodes].slice(-BUILD_HISTORY_LIMIT),
      future: [],
    };
  }
  if (!state.content) return state;
  if (action.type === "undo") {
    const nodes = state.past.at(-1);
    if (!nodes) return state;
    return {
      content: { ...state.content, nodes },
      past: state.past.slice(0, -1),
      future: [state.content.nodes, ...state.future],
    };
  }
  const nodes = state.future[0];
  if (!nodes) return state;
  return {
    content: { ...state.content, nodes },
    past: [...state.past, state.content.nodes].slice(-BUILD_HISTORY_LIMIT),
    future: state.future.slice(1),
  };
}
export function buildHistoryShortcut(
  event: {
    key: string;
    ctrlKey: boolean;
    metaKey: boolean;
    altKey: boolean;
    shiftKey: boolean;
    repeat: boolean;
    isComposing: boolean;
    defaultPrevented: boolean;
  },
  editingText: boolean,
): "undo" | "redo" | null {
  if (
    editingText ||
    event.defaultPrevented ||
    event.repeat ||
    event.isComposing ||
    event.altKey ||
    !(event.ctrlKey || event.metaKey)
  )
    return null;
  const key = event.key.toLowerCase();
  if (key === "z") return event.shiftKey ? "redo" : "undo";
  return key === "y" && !event.shiftKey ? "redo" : null;
}
