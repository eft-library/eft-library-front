export interface HeadsetList {
  headsetList: HeadsetDetail[];
}
interface HeadsetDetail {
  category: string;
  id: string;
  image_height: number;
  name: LocaleName;
  image: string;
  image_width: number;
  update_time: string;
  url_mapping: string;
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}
