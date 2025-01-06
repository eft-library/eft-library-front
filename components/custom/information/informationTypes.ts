export interface InformationInfo {
  id: string;
  name_en: string[];
  name_kr: string[];
  notes_en: string;
  notes_kr: string;
  update_time: string;
}
export interface InformationData {
  data: InformationInfo[];
  total_count: number;
  max_pages: number;
  current_page: number;
}

export interface InformationClient {
  informationData: InformationData;
  routeLink: string;
}
