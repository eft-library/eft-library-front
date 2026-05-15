import type { Locale } from "@/i18n/config";

export interface ChatSearchEntry {
  value: string;
  lang: Locale;
  update_time?: string;
}

export interface ChatStreamRequest {
  session_id: string;
  query: string;
  lang: Locale;
  domain?: string | null;
  rag_limit?: number | null;
  history_limit?: number | null;
}

export interface ChatSourceDocument {
  domain: string;
  entity_id: string;
  chunk_id: string;
  chunk_type: string;
  entity_name: string;
  url: string | null;
  similarity: number | null;
  lexical_score: number | null;
  trigram_score: number | null;
  fused_score: number | null;
}

export type ChatStreamEvent =
  | {
      type: "docs";
      docs: ChatSourceDocument[];
    }
  | {
      type: "token";
      content: string;
    }
  | {
      type: "error";
      message: string;
      detail?: string;
    }
  | {
      type: "done";
    };
