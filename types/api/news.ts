export interface WipeSeasonResponse {
  id: number;
  create_time: string;
  patch_version: string;
  season_start: string;
  season_end: string;
}

export type InformationType = "NOTICE" | "EVENT" | "PATCH-NOTES";

export interface InformationPreview {
  id: string;
  information_type: InformationType;
  title_en: string;
  title_ko: string;
  title_ja: string;
  content_en: string | null;
  content_ko: string | null;
  content_ja: string | null;
  update_time: string;
}

export interface InformationListResponse {
  data: InformationPreview[];
  total_count: number;
  max_pages: number;
  current_page: number;
}

export interface InformationDetail extends InformationPreview {
  content_en: string;
  content_ko: string;
  content_ja: string;
}

export interface InformationDetailResponse {
  information: InformationDetail;
  information_group: InformationPreview[];
}
