export interface WeaponSelectorClient {
  weaponType: WeaponType;
}

interface WeaponType {
  id: string;
  json_value: WeaponJson[];
}

interface WeaponJson {
  value: string;
  desc_en: string;
  desc_kr: string;
}

export interface WeaponClient {
  weapon: WeaponData;
}

interface Weapon {
  id: string;
  category: string;
  name: string;
  short_name: string;
  image: string;
  update_time: string;
}

interface Gun extends Weapon {
  default_ammo: string;
  modes_kr: string[];
  modes_en: string[];
  ergonomics: number;
  recoil_horizontal: number;
  fire_rate: number;
  recoil_vertical: number;
  carliber: string;
}

interface Knife extends Weapon {
  slash_damage: number;
  hit_radius: number;
  stab_damage: number;
}

interface Throwable extends Weapon {
  fuse: number;
  min_explosion_distance: number;
  max_explosion_distance: number;
  fragments: number;
  min_fuse: number | null;
}

interface WeaponData {
  gun: Gun[];
  knife: Knife[];
  throwable: Throwable[];
}

export interface ThrowableRender {
  throwableList: Throwable[];
}

export interface StationaryRender {
  stationaryList: Gun[];
}
export interface SpecialRender {
  specialList: Gun[];
}
export interface KnifeRender {
  knifeList: Knife[];
}

export interface GunRender {
  gunList: Gun[];
}
