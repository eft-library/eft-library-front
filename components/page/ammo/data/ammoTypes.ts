export interface AmmoClient {
  ammoList: Ammo[];
}

interface Ammo {
  id: string;
  name: string;
  round: string;
  damage: number;
  penetration_power: number;
  armor_damage: number;
  accuracy_modifier: number;
  recoil_modifier: number;
  light_bleed_modifier: number;
  heavy_bleed_modifier: number;
  width: number;
  height: number;
  efficiency: number[];
  image: string;
  category: string;
}

export interface AmmoSelectorClient {
  ammoType: AmmoType;
}

interface AmmoType {
  id: string;
  json_value: AmmoJson[];
}

interface AmmoJson {
  color: string;
  value: string;
  desc_en: string;
  desc_kr: string;
}
