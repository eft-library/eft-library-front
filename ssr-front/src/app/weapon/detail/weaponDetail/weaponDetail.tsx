"use client";

import { GUN_CATEGORY_INFO } from "@/util/consts/columnConsts";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import WeaponKnife from "../contents/weaponKnife";
import WeaponThrowable from "../contents/weaponThrowable";
import WeaponStationary from "../contents/weaponStationary";
import WeaponSpecial from "../contents/weaponSpecial";
import WeaponGun from "../contents/weaponGun";

interface WeaponDetailType {
  category: string;
}

export default function WeaponDetail({ category }: WeaponDetailType) {
  const [weapon, setWeapon] = useState({ knife: [], throwable: [], gun: [] });

  useEffect(() => {
    fetchDataWithNone("/api/weapon/all", setWeapon);
  }, []);

  const checkGunInclude = () => {
    return GUN_CATEGORY_INFO.value_kr.includes(category);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      width={"100%"}
      flexDirection={"column"}
    >
      <>
        {(category === "ALL" || checkGunInclude()) && (
          <>
            <WeaponGun gunList={weapon.gun} category={category} />
            {category === "ALL" && <Box mb={20} />}
          </>
        )}
        {(category === "ALL" || category === "Special weapons") && (
          <>
            <WeaponSpecial specialList={weapon.gun} category={category} />
            {category === "ALL" && <Box mb={20} />}
          </>
        )}
        {(category === "ALL" || category === "Stationary weapons") && (
          <>
            <WeaponStationary stationaryList={weapon.gun} category={category} />
            {category === "ALL" && <Box mb={20} />}
          </>
        )}
        {(category === "ALL" || category === "Knife") && (
          <>
            <WeaponKnife knifeList={weapon.knife} />
            {category === "ALL" && <Box mb={20} />}
          </>
        )}
        {(category === "ALL" || category === "Throwable weapon") && (
          <>
            <WeaponThrowable throwableList={weapon.throwable} />
          </>
        )}
      </>
    </Box>
  );
}
