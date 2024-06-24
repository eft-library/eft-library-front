"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/provider";

// 스크롤 이벤트
export const useScrollMove = (
  id: string,
  data: any,
  reset: string = "None"
) => {
  const {
    setKeyCategory,
    setMedicalCategory,
    setWeaponCategory,
    setAmmoCategory,
    setLootCategory,
  } = useAppStore((state) => state);

  useEffect(() => {
    if (id) {
      if (reset === "KEY") {
        setKeyCategory("ALL");
      } else if (reset === "MEDICAL") {
        setMedicalCategory("ALL");
      } else if (reset === "WEAPON") {
        setWeaponCategory("ALL");
      } else if (reset === "AMMO") {
        setAmmoCategory("ALL");
      } else if (reset === "LOOT") {
        setLootCategory("ALL");
      }
    }

    if (typeof window !== "undefined" && data) {
      setTimeout(() => {
        const targetElement = document.getElementById(id);
        if (id && targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [id, data]);
};
