import { Image, Box } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { SPECIAL_COLUMN } from "@/util/consts/columnConsts";

interface SpecialListType {
  name: string;
  short_name: string;
  image: string;
  category: string;
  caliber: string;
  modes_kr: string[];
  fire_rate: number;
  carliber: string;
}

interface WeaponSpecialType {
  specialList: SpecialListType[];
  category: string;
}

export default function WeaponSpecial({
  specialList,
  category,
}: WeaponSpecialType) {
  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (itemCategory: string) => {
    const isGeneralCategory = itemCategory === "Special weapons";
    const isMatchingCategory =
      itemCategory === "Special weapons" || category === "ALL";
    return isGeneralCategory && isMatchingCategory;
  };
  return (
    <>
      <GridTitle
        columnDesign={[2, null, 2]}
        column={SPECIAL_COLUMN.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {specialList.map((item, index) =>
        shouldRenderWeapon(item.category) ? (
          <GridContents columnDesign={[2, null, 2]} key={index}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image src={item.image} maxH={"200px"} alt={item.name} />
            </Box>
            <GridCenterText value={item.short_name} />
          </GridContents>
        ) : null
      )}
    </>
  );
}
