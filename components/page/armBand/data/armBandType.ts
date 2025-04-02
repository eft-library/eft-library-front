export interface ArmBandList {
  armBandList: ArmbandDetail[];
}

interface ArmbandDetail {
  category: string;
  id: string;
  image_height: number;
  name_kr: string;
  image: string;
  name_en: string;
  image_width: number;
  update_time: string;
}
