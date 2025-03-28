"use client";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/provider";

export default function AmmoSelectorClient() {
  const { setAmmoCategory, ammoCategory } = useAppStore((state) => state);

  const ammoColumn = [
    { color: "#ffffff", value: "ALL", desc_en: "All", desc_kr: "전체" },
    {
      color: "#90bdff",
      value: "5.45x39mm",
      desc_en: "5.45x39mm",
      desc_kr: "5.45x39mm",
    },
    { color: "#90bdff", value: "9x39mm", desc_en: "9x39mm", desc_kr: "9x39mm" },
    {
      color: "#90bdff",
      value: "6.8x51mm",
      desc_en: "6.8x51mm",
      desc_kr: "6.8x51mm",
    },
    {
      color: "#90bdff",
      value: "5.56x45mm NATO",
      desc_en: "5.56x45mm NATO",
      desc_kr: "5.56x45mm NATO",
    },
    {
      color: "#90bdff",
      value: "7.62x51mm NATO",
      desc_en: "7.62x51mm NATO",
      desc_kr: "7.62x51mm NATO",
    },
    {
      color: "#90bdff",
      value: "7.62x54mmR",
      desc_en: "7.62x54mmR",
      desc_kr: "7.62x54mmR",
    },
    {
      color: "#90bdff",
      value: ".366 TKM",
      desc_en: ".366 TKM",
      desc_kr: ".366 TKM",
    },
    {
      color: "#90bdff",
      value: "7.62x39mm",
      desc_en: "7.62x39mm",
      desc_kr: "7.62x39mm",
    },
    {
      color: "#90bdff",
      value: "12.7x55mm STs-130",
      desc_en: "12.7x55mm STs-130",
      desc_kr: "12.7x55mm STs-130",
    },
    {
      color: "#90bdff",
      value: ".300 Blackout",
      desc_en: ".300 Blackout",
      desc_kr: ".300 Blackout",
    },
    {
      color: "#90bdff",
      value: ".338 Lapua Magnum",
      desc_en: ".338 Lapua Magnum",
      desc_kr: ".338 Lapua Magnum",
    },
    {
      color: "#61ffe3",
      value: "4.6x30mm HK",
      desc_en: "4.6x30mm HK",
      desc_kr: "4.6x30mm HK",
    },
    {
      color: "#61ffe3",
      value: "5.7x28mm FN",
      desc_en: "5.7x28mm FN",
      desc_kr: "5.7x28mm FN",
    },
    { color: "#ff4e4e", value: "12/70", desc_en: "12/70", desc_kr: "12/70" },
    { color: "#ff4e4e", value: "20/70", desc_en: "20/70", desc_kr: "20/70" },
    {
      color: "#ff4e4e",
      value: "23x75mm",
      desc_en: "23x75mm",
      desc_kr: "23x75mm",
    },
    {
      color: "#ffb169",
      value: "9x18mm Makarov",
      desc_en: "9x18mm Makarov",
      desc_kr: "9x18mm Makarov",
    },
    {
      color: "#ffb169",
      value: "9x21mm Gyurza",
      desc_en: "9x21mm Gyurza",
      desc_kr: "9x21mm Gyurza",
    },
    {
      color: "#ffb169",
      value: "9x19mm Parabellum",
      desc_en: "9x19mm Parabellum",
      desc_kr: "9x19mm Parabellum",
    },
    {
      color: "#ffb169",
      value: "7.62x25mm Tokarev",
      desc_en: "7.62x25mm Tokarev",
      desc_kr: "7.62x25mm Tokarev",
    },
    {
      color: "#ffb169",
      value: ".45 ACP",
      desc_en: ".45 ACP",
      desc_kr: ".45 ACP",
    },
    {
      color: "#ffb169",
      value: ".357 Magnum",
      desc_en: ".357 Magnum",
      desc_kr: ".357 Magnum",
    },
    {
      color: "#ffb169",
      value: ".50 Action Express",
      desc_en: ".50 Action Express",
      desc_kr: ".50 Action Express",
    },
    {
      color: "#fff500",
      value: "40x46mm",
      desc_en: "40x46mm",
      desc_kr: "40x46mm",
    },
    { color: "#fff500", value: "other", desc_en: "other", desc_kr: "other" },
  ];

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
