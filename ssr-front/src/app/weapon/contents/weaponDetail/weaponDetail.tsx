"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import WeaponKnife from "../weaponRender/weaponKnife";
import WeaponThrowable from "../weaponRender/weaponThrowable";
import WeaponStationary from "../weaponRender/weaponStationary";
import WeaponSpecial from "../weaponRender/weaponSpecial";
import WeaponGun from "../weaponRender/weaponGun";

interface WeaponDetailType {
  category: string;
}

interface ColumnType {
  id: string;
  type: string;
  update_time: string;
  value_kr: string[] | null;
  value_en: string[] | null;
  json_value: JsonValueType[] | null;
}

// JsonValueType 인터페이스 정의
interface JsonValueType {
  value: string;
  desc_en: string;
  desc_kr: string;
  order: number;
}

export default function WeaponDetail({ category }: WeaponDetailType) {
  const [weapon, setWeapon] = useState({ knife: [], throwable: [], gun: [] });
  const [column, setColumn] = useState<ColumnType>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.gun}`,
      setColumn
    );
  }, []);

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_WEAPON, setWeapon);
  }, []);

  const checkGunInclude = (columnList: ColumnType) => {
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
