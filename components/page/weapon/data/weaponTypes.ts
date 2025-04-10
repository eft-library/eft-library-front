export interface WeaponClient {
  weapon: WeaponData;
}

interface WeaponData {
  gun: GunDetail[];
  knife: KnifeDetail[];
  throwable: ThrowableDetail[];
}

export interface ThrowableRender {
  throwableList: ThrowableDetail[];
}

export interface StationaryRender {
  stationaryList: GunDetail[];
}
export interface KnifeRender {
  knifeList: KnifeDetail[];
}

export interface GunRender {
  gunList: GunDetail[];
}

interface GunInfo {
  carliber: string;
  modes_en: string[];
  modes_kr: string[];
  fire_rate: number;
  ergonomics: number;
  default_ammo: string;
  gun_category: string;
  recoil_vertical: number;
  recoil_horizontal: number;
}

interface GunDetail {
  category: string;
  id: string;
  info: GunInfo;
  image_height: number;
  name_kr: string;
  image: string;
  name_en: string;
  image_width: number;
  update_time: string;
}

interface KnifeInfo {
  hit_radius: number;
  stab_damage: number;
  slash_damage: number;
  gun_category: string;
}

interface KnifeDetail {
  category: string;
  id: string;
  info: KnifeInfo;
  image_height: number;
  name_kr: string;
  image: string;
  name_en: string;
  image_width: number;
  update_time: string;
}

interface ThrowableInfo {
  fuse: number;
  fragments: number;
  gun_category: string;
  max_explosion_distance: number;
  min_explosion_distance: number;
  min_fuse: number;
}

interface ThrowableDetail {
  category: string;
  id: string;
  info: ThrowableInfo;
  image_height: number;
  name_kr: string;
  image: string;
  name_en: string;
  image_width: number;
  update_time: string;
}
