export type StoryLocalizedField =
  | "title"
  | "objectives"
  | "requirements"
  | "guide"
  | "contents"
  | "desc";

export interface StorySelectorEntry {
  id: string;
  title_en: string;
  title_ko: string;
  title_ja: string;
}

export interface StoryDetailEntry {
  id: string;
  title_en: string;
  title_ko: string;
  title_ja: string;
  objectives_en: string | null;
  objectives_ko: string | null;
  objectives_ja: string | null;
  requirements_en: string | null;
  requirements_ko: string | null;
  requirements_ja: string | null;
  guide_en: string | null;
  guide_ko: string | null;
  guide_ja: string | null;
  update_time: string;
}

export interface StoryDetailResponse {
  selector: StorySelectorEntry[];
  detail: StoryDetailEntry | null;
}

export type StoryNodeType =
  | "base"
  | "branch"
  | "craft"
  | "payment"
  | "achievement"
  | "penalty"
  | "timegate"
  | "ending";

export interface StoryRoadmapEdge {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  style?: {
    stroke?: string;
    strokeWidth?: number;
  } | null;
  markerEnd?: {
    type?: string;
    color?: string;
  } | null;
}

export interface StoryRoadmapNode {
  id: string;
  node_type: StoryNodeType;
  title_en: string;
  title_ko: string;
  title_ja: string;
  contents_en: string | null;
  contents_ko: string | null;
  contents_ja: string | null;
  desc_en: string | null;
  desc_ko: string | null;
  desc_ja: string | null;
  value_text: string | null;
  image: string | null;
  x_coordinate: number | null;
  y_coordinate: number | null;
  edge: StoryRoadmapEdge[] | null;
  update_time: string;
}
