import type { LocaleName } from "@/components/types/common";

export interface AmmoTableTypes {
  ammoList: AmmoDetail[];
  word: string;
}

export interface AmmoViewTypes {
  ammoList: AmmoDetail[];
}

interface AmmoInfo {
  round: string;
  damage: number;
  efficiency: number[] | null;
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
  name: LocaleName;
  image: string;
  image_width: number;
  update_time: string;
  url_mapping: string;
}
