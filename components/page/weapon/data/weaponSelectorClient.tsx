"use client";

import { weaponColumn } from "@/lib/consts/columnConsts";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";

export default function WeaponSelectorClient() {
  const { setWeaponCategory, weaponCategory } = useAppStore((state) => state);

  return (
    <div className="flex w-full flex-wrap rounded-lg border-solid border-2 border-white gap-1 p-1">
      {weaponColumn.map((weapon) => (
        <div
          key={weapon.value}
          className={cn(
            "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
            { "bg-CloudGray": weaponCategory === weapon.value },
            { "text-Background": weaponCategory === weapon.value }
          )}
          onClick={() => setWeaponCategory(weapon.value)}
        >
          <span className="text-center font-bold">{weapon.desc_kr}</span>
        </div>
      ))}
    </div>
  );
}
