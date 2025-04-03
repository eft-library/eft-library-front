export interface ItemDetail {
  category: string;
  id: string;
  image_height: number;
  name_kr: string;
  image: string;
  info: any;
  name_en: string;
  image_width: number;
  update_time: string;
}

export interface ItemClient {
  itemInfo: ItemDetail;
}
