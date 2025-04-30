export interface InformationInfo {
  id: string;
  name: LocaleName;
  description: LocaleName;
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

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
