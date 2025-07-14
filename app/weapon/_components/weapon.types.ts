type WeaponDetail = GunDetail | KnifeDetail | ThrowableDetail;

export interface WeaponListTypes {
  weaponList: WeaponDetail[];
}

interface GunInfo {
  carliber: string;
  modes: ModesLocaleName;
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
  name: LocaleName;
  image: string;
  image_width: number;
  update_time: string;
  url_mapping: string;
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
  name: LocaleName;
  image: string;
  image_width: number;
  update_time: string;
  url_mapping: string;
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

interface ModesLocaleName {
  modes_en: string[];
  modes_ja: string[];
  modes_ko: string[];
}
