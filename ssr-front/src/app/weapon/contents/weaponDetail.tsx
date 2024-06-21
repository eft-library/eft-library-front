"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import WeaponKnife from "./weaponRender/weaponKnife";
import WeaponThrowable from "./weaponRender/weaponThrowable";
import WeaponStationary from "./weaponRender/weaponStationary";
import WeaponSpecial from "./weaponRender/weaponSpecial";
import WeaponGun from "./weaponRender/weaponGun";
import type { WeaponDetail, Column } from "@/types/types";

export default function WeaponDetail({ category }: WeaponDetail) {
  const [weapon, setWeapon] = useState({ knife: [], throwable: [], gun: [] });
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.gun}`,
      setColumn
    );
  }, []);

  useEffect(() => {
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
