"use client";
import { useAppStore } from "@/store/provider";
import GunRender from "./gunRender";
import KnifeRender from "./knifeRender";
import ThrowableRender from "./throwableRender";
import SpecialRender from "./specialRender";
import StationaryRender from "./stationaryRender";

interface WeaponClient {
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

export default function WeaponClient({ weapon }: WeaponClient) {
  const { weaponCategory } = useAppStore((state) => state);

  const checkGunInclude = () => {
    const columnList = {
      value_en: [
        "Assault carbine",
        "Assault rifle",
        "Machinegun",
        "SMG",
        "Sniper rifle",
        "Marksman rifle",
        "Shotgun",
        "Grenade launcher",
        "Handgun",
      ],
      type: "WEAPON",
      id: "GUN_CATEGORY_INFO",
      value_kr: [
        "Assault carbine",
        "Assault rifle",
        "Machinegun",
        "SMG",
        "Sniper rifle",
        "Marksman rifle",
        "Shotgun",
        "Grenade launcher",
        "Handgun",
      ],
    };

    return columnList.value_kr.includes(weaponCategory);
  };

  return (
    <div className="w-full">
      {(weaponCategory === "ALL" || checkGunInclude()) && (
        <GunRender gunList={weapon.gun} />
      )}
      {(weaponCategory === "ALL" ||
        weaponCategory === "Stationary weapons") && (
        <StationaryRender stationaryList={weapon.gun} />
      )}
      {(weaponCategory === "ALL" || weaponCategory === "Knife") && (
        <KnifeRender knifeList={weapon.knife} />
      )}
      {(weaponCategory === "ALL" || weaponCategory === "Throwable weapon") && (
        <ThrowableRender throwableList={weapon.throwable} />
      )}
      {(weaponCategory === "ALL" || weaponCategory === "Special weapons") && (
        <SpecialRender specialList={weapon.gun} />
      )}
    </div>
  );
}
