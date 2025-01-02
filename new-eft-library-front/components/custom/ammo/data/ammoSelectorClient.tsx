"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";

interface AmmoSelectorClient {
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

export default function AmmoSelectorClient({ ammoType }: AmmoSelectorClient) {
  const { setAmmoCategory, ammoCategory } = useAppStore((state) => state);

  return (
    <div className="flex justify-center w-full flex-wrap gap-2">
      {ammoType.json_value.map((ammo) => (
        <div
          key={ammo.value}
          className={cn(
            "rounded-lg flex justify-center items-center p-[8px] w-[120px] h-[40px] cursor-pointer hover:bg-NeutralGray",
            { "bg-NeutralGray": ammoCategory === ammo.value }
          )}
          style={{ border: `1px solid ${ammo.color}` }}
          onClick={() => setAmmoCategory(ammo.value)}
        >
          <span className="text-[10px] text-center font-bold">
            {ammo.desc_kr}
          </span>
        </div>
      ))}
    </div>
  );
}
