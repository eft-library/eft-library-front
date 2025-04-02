export interface AmmoClient {
  ammoList: AmmoDetail[];
}

interface AmmoInfo {
  round: string;
  damage: number;
  efficiency: any[];
  armor_damage: number;
  ammo_category: string;
  recoil_modifier: number;
  accuracy_modifier: number;
  penetration_power: number;
  heavy_bleed_modifier: number;
  light_bleed_modifier: number;
}

interface AmmoDetail {
  category: string;
  id: string;
  info: AmmoInfo;
  image_height: number;
  name_kr: string;
  image: string;
  name_en: string;
  image_width: number;
  update_time: string;
}
