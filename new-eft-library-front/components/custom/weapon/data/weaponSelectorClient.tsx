"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";

interface WeaponSelectorClient {
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

export default function WeaponSelectorClient({
  weaponType,
}: WeaponSelectorClient) {
  const { setWeaponCategory, weaponCategory } = useAppStore((state) => state);

  return (
    <div className="flex justify-center w-full flex-wrap gap-2">
      {weaponType.json_value.map((weapon) => (
        <div
          key={weapon.value}
          className={cn(
            "rounded-lg flex justify-center items-center p-[8px] w-[120px] h-[40px] cursor-pointer hover:bg-NeutralGray border-solid border-[1px] border-white",
            { "bg-NeutralGray": weaponCategory === weapon.value }
          )}
          onClick={() => setWeaponCategory(weapon.value)}
        >
          <span className="text-base text-center font-bold">
            {weapon.desc_kr}
          </span>
        </div>
      ))}
    </div>
  );
}
