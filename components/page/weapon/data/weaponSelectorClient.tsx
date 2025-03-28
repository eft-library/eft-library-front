"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";

export default function WeaponSelectorClient() {
  const { setWeaponCategory, weaponCategory } = useAppStore((state) => state);

  const weaponColumn = [
    { value: "ALL", desc_en: "All", desc_kr: "전체" },
    { value: "Assault carbine", desc_en: "카빈 소총", desc_kr: "카빈 소총" },
    { value: "Assault rifle", desc_en: "돌격 소총", desc_kr: "돌격 소총" },
    { value: "Machinegun", desc_en: "경기관총", desc_kr: "경기관총" },
    { value: "SMG", desc_en: "기관단총", desc_kr: "기관단총" },
    {
      value: "Sniper rifle",
      desc_en: "볼트액션 소총",
      desc_kr: "볼트액션 소총",
    },
    {
      value: "Marksman rifle",
      desc_en: "지정사수 소총",
      desc_kr: "지정사수 소총",
    },
    { value: "Shotgun", desc_en: "산탄총", desc_kr: "산탄총" },
    { value: "Grenade launcher", desc_en: "유탄발사기", desc_kr: "유탄발사기" },
    { value: "Handgun", desc_en: "권총", desc_kr: "권총" },
    {
      value: "Stationary weapons",
      desc_en: "거치식 화기",
      desc_kr: "거치식 화기",
    },
    { value: "Knife", desc_en: "근접 무기", desc_kr: "근접 무기" },
    { value: "Throwable weapon", desc_en: "투척 무기", desc_kr: "투척 무기" },
    { value: "Special weapons", desc_en: "특수 무기", desc_kr: "특수 무기" },
  ];

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
