export interface ItemInfoResponse {
  id: string;
  parent_category: string | null;
  category: string | null;
  name_en: string;
  name_ko: string;
  name_ja: string;
  normalized_name: string;
  weight: number | null;
  width: number;
  height: number;
  image: string;
}
