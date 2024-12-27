"use client";

import { Box, GridItem, Skeleton } from "@chakra-ui/react";
import GridContents from "@/components/gridContents/gridContents";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import type { AmmoDetail, Ammo, Column } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/hooks/useScrollMove";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import EfficiencyBox from "./efficiencyBox";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function AmmoDetail({ category }: AmmoDetail) {
  const param = useSearchParams();
  const [ammoList, setAmmoList] = useState<Ammo[]>(null);
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.ammo}`,
      setColumn
    );
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_AMMO, setAmmoList);
  }, []);

  useScrollMove(param.get("id"), ammoList, "AMMO");

  const addPlusMinus = (text) => {
    if (typeof text === "number") {
      if (text === 0) return "0";
      return text > 0 ? `+${text}` : `${text}`;
    }
    return "";
  };

  const checkViewAmmo = (ammoCategory: string) => {
    return category === "ALL" || category === ammoCategory;
  };

  const checkTitleColor = (ammoCategory: string) => {
    const lifle = [
      "9x39mm",
      "6.8x51mm",
      "5.56x45mm NATO",
      "7.62x51mm NATO",
      "7.62x54mmR",
      ".366 TKM",
      "7.62x39mm",
      "12.7x55mm STs-130",
      ".300 Blackout",
      ".338 Lapua Magnum",
      "5.45x39mm",
    ];
    const other = ["40x46mm", "other"];
    const pdw = ["4.6x30mm HK", "5.7x28mm FN"];
    const pistol = [
      "9x18mm Makarov",
      "9x21mm Gyurza",
      ".45 ACP",
      "7.62x25mm Tokarev",
      ".357 Magnum",
      "9x19mm Parabellum",
    ];
    const shotgun = ["23x75mm", "12/70", "20/70"];

    if (lifle.includes(ammoCategory)) {
      return ALL_COLOR.BLUE_SHADOW;
    } else if (other.includes(ammoCategory)) {
      return ALL_COLOR.LIGHT_YELLOW_SHADOW;
    } else if (pdw.includes(ammoCategory)) {
      return ALL_COLOR.MINT_SHADOW;
    } else if (pistol.includes(ammoCategory)) {
      return ALL_COLOR.ORANGE_SHADOW;
    } else if (shotgun.includes(ammoCategory)) {
      return ALL_COLOR.RED_SHADOW;
    } else {
      return ALL_COLOR.YELLOW_SHADOW;
    }
  };

  const checkColor = (value: number) => {
    if (value === 0) {
      return ALL_COLOR.WHITE;
    } else if (value > 0) {
      return ALL_COLOR.LIGHT_BLUE;
    } else {
      return ALL_COLOR.RED;
    }
  };

  const recoilColor = (value: number) => {
    if (value === 0) {
      return ALL_COLOR.WHITE;
    } else if (value < 0) {
      return ALL_COLOR.LIGHT_BLUE;
    } else {
      return ALL_COLOR.RED;
    }
  };

  const floatToPercent = (value: number) => {
    if (value !== 0) {
      return Math.round(value * 100);
    } else {
      return value;
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      width={"100%"}
      flexDirection={"column"}
    >
      <GridTitle
        columnDesign={[2, null, 11]}
        column={column}
        isShadow
        isAmmo
        shadowColor={checkTitleColor(category)}
      />
      {!ammoList
        ? Array(20)
            .fill(null)
            .map((_, index) => (
              <GridContents
                key={index}
                columnDesign={[2, null, 11]}
                id={`ammo-null-${index}`}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Skeleton height="110px" width="110px" />
                </Box>

                <GridCenterText>
                  <Skeleton height="20px" width="60px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="60px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="60px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="60px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="60px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="60px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="60px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="60px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="60px" />
                </GridCenterText>
                <GridCenterText>
                  <Skeleton height="20px" width="100px" />
                </GridCenterText>
              </GridContents>
            ))
        : ammoList.map((item) =>
            checkViewAmmo(item.category) ? (
              <GridContents
                columnDesign={[2, null, 11]}
                key={item.id}
                id={item.id}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <ImageZoom
                    originalImg={item.image}
                    thumbnail={item.image}
                    name={item.name}
                  />
                </Box>
                <GridCenterText>{item.name} </GridCenterText>
                <GridCenterText>{item.damage} </GridCenterText>
                <GridCenterText>{item.penetration_power} </GridCenterText>
                <GridCenterText>{item.armor_damage} %</GridCenterText>
                <GridCenterText
                  otherColor={checkColor(
                    floatToPercent(item.accuracy_modifier)
                  )}
                >
                  {addPlusMinus(floatToPercent(item.accuracy_modifier))} %
                </GridCenterText>
                <GridCenterText
                  otherColor={recoilColor(floatToPercent(item.recoil_modifier))}
                >
                  {addPlusMinus(floatToPercent(item.recoil_modifier))}
                </GridCenterText>
                <GridCenterText
                  otherColor={checkColor(
                    floatToPercent(item.light_bleed_modifier)
                  )}
                >
                  {addPlusMinus(floatToPercent(item.light_bleed_modifier))} %
                </GridCenterText>
                <GridCenterText
                  otherColor={checkColor(
                    floatToPercent(item.heavy_bleed_modifier)
                  )}
                >
                  {addPlusMinus(floatToPercent(item.heavy_bleed_modifier))} %
                </GridCenterText>
                <GridItem
                  colSpan={2}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {item.efficiency && item.efficiency.map((efficiency, index) => (
                    <EfficiencyBox key={index} value={efficiency} />
                  ))}
                </GridItem>
              </GridContents>
            ) : null
          )}
    </Box>
  );
}
