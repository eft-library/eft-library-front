import type { Locale } from "@/i18n/config";
import type { LiveMapStaticPoint } from "@/types/api/live-map";

export interface DocumentSpawnDefinition {
  id: string;
  image: string;
  labels: Record<Locale, string>;
}

export const documentSpawnDefinitions: DocumentSpawnDefinition[] = [
  {
    id: "6a31824878450ec91c0ea1ae",
    image: "https://assets.tarkov.dev/6a31824878450ec91c0ea1ae-grid-image.webp",
    labels: { ko: "설계도 및 기술 문서", en: "Blueprints and technical documentation", ja: "設計図と技術文書" },
  },
  {
    id: "6a31830dde69ceafd805afa0",
    image: "https://assets.tarkov.dev/6a31830dde69ceafd805afa0-grid-image.webp",
    labels: { ko: "기술 문서", en: "Technical documentation", ja: "技術文書" },
  },
  {
    id: "6a3182dc6cd8de21cf0a3a7d",
    image: "https://assets.tarkov.dev/6a3182dc6cd8de21cf0a3a7d-grid-image.webp",
    labels: { ko: "의료 문서", en: "Medical documents", ja: "医療文書" },
  },
  {
    id: "6a3182b72fd891345e047eef",
    image: "https://assets.tarkov.dev/6a3182b72fd891345e047eef-grid-image.webp",
    labels: { ko: "사용자 문서", en: "User documentation", ja: "ユーザー文書" },
  },
  {
    id: "6a3181f178450ec91c0ea1aa",
    image: "https://assets.tarkov.dev/6a3181f178450ec91c0ea1aa-grid-image.webp",
    labels: { ko: "프로젝트 문서", en: "Project documentation", ja: "プロジェクト文書" },
  },
  {
    id: "6a317b9692cfdcddcb02a58e",
    image: "https://assets.tarkov.dev/6a317b9692cfdcddcb02a58e-grid-image.webp",
    labels: { ko: "PMC 인사 파일", en: "PMC personnel files", ja: "PMC人事ファイル" },
  },
  {
    id: "6a31807f17005505b70d5827",
    image: "https://assets.tarkov.dev/6a31807f17005505b70d5827-grid-image.webp",
    labels: { ko: "재무 문서", en: "Financial documents", ja: "財務文書" },
  },
  {
    id: "6a31828557705071410ca00e",
    image: "https://assets.tarkov.dev/6a31828557705071410ca00e-grid-image.webp",
    labels: { ko: "시험 문서", en: "Test documentation", ja: "テスト文書" },
  },
];

const documentSpawnById = new Map(
  documentSpawnDefinitions.map((definition) => [definition.id, definition]),
);

export function getDocumentSpawnItemId(point: LiveMapStaticPoint) {
  const itemId = point.metadata?.item_id;
  return typeof itemId === "string" ? itemId : null;
}

export function getDocumentSpawnDefinition(point: LiveMapStaticPoint) {
  const itemId = getDocumentSpawnItemId(point);
  return itemId ? documentSpawnById.get(itemId) ?? null : null;
}
