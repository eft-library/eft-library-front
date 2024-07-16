"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { WeaponDetail, Column } from "@/types/types";
import dynamic from "next/dynamic";

const WeaponKnife = dynamic(() => import("./weaponRender/weaponKnife"), {
  ssr: false,
});
const WeaponThrowable = dynamic(
  () => import("./weaponRender/weaponThrowable"),
  { ssr: false }
);
const WeaponStationary = dynamic(
  () => import("./weaponRender/weaponStationary"),
  {
    ssr: false,
  }
);
const WeaponSpecial = dynamic(() => import("./weaponRender/weaponSpecial"), {
  ssr: false,
});
const WeaponGun = dynamic(() => import("./weaponRender/weaponGun"), {
  ssr: false,
});

export default function WeaponDetail({ category }: WeaponDetail) {
  const [weapon, setWeapon] = useState({ knife: [], throwable: [], gun: [] });
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.gun}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_WEAPON, setWeapon);
  }, []);

  const checkGunInclude = (columnList: Column) => {
    return columnList.value_kr.includes(category);
  };

  if (!column) return null;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      width={"100%"}
      flexDirection={"column"}
    >
      <>
        {(category === "ALL" || checkGunInclude(column)) && (
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
