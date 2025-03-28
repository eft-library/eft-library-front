"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";
import { ammoColumn } from "@/lib/consts/columnConsts";

export default function AmmoSelectorClient() {
  const { setAmmoCategory, ammoCategory } = useAppStore((state) => state);

  return (
    <div className="flex justify-center w-full flex-wrap gap-2">
      {ammoColumn.map((ammo) => (
        <div
          key={ammo.value}
          className={cn(
            "rounded-lg flex justify-center items-center p-[8px] w-[120px] h-[40px] cursor-pointer hover:bg-NeutralGray",
            { "bg-NeutralGray": ammoCategory === ammo.value }
          )}
          style={{ border: `1px solid ${ammo.color}` }}
          onClick={() => setAmmoCategory(ammo.value)}
        >
          <span className="text-[12px] text-center font-bold">
            {ammo.desc_kr}
          </span>
        </div>
      ))}
    </div>
  );
}
