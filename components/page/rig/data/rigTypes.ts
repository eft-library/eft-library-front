export interface RigClient {
  rig_data: RigData;
  isClass: boolean;
}

interface RigData {
  class_rig: RigDetail[];
  no_class_rig: RigDetail[];
}

interface RigInfo {
  weight?: number;
  areas_en: string[];
  areas_kr: string[];
  capacity?: number;
  durability?: number;
  class_value?: number;
}

interface RigDetail {
  id: string;
  name_en: string;
  name_kr: string;
  category: string;
  image: string;
  image_width: number;
  image_height: number;
  info: RigInfo;
  update_time: string;
  url_mapping: string;
}
