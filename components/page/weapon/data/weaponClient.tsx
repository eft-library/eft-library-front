"use client";
import { useAppStore } from "@/store/provider";
import GunRender from "./gunRender";
import KnifeRender from "./knifeRender";
import ThrowableRender from "./throwableRender";
import SpecialRender from "./specialRender";
import StationaryRender from "./stationaryRender";
import { gunColumnDefinition } from "@/lib/consts/gridContsts";
import type { WeaponClient } from "./weaponTypes";

export default function WeaponClient({ weapon }: WeaponClient) {
  const { weaponCategory } = useAppStore((state) => state);

  return (
    <div className="w-full">
      {(weaponCategory === "ALL" ||
        gunColumnDefinition.value_kr.includes(weaponCategory)) && (
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
