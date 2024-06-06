import { Text, Image, Box } from "@chakra-ui/react";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridTitle from "@/components/gridTitle/gridTitle";
import GridContents from "@/components/gridContents/gridContents";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { KNIFE_COLUMN } from "@/util/consts/columnConsts";

interface KnifeListType {
  [key: string]: any;
}

interface WeaponKnifeType {
  knifeList: KnifeListType[];
}

export default function WeaponKnife({ knifeList }: WeaponKnifeType) {
  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={KNIFE_COLUMN.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {knifeList.map((item, index) => (
        <GridContents columnDesign={[2, null, 5]} key={index}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Image src={item.image} maxH={"200px"} alt={item.name} />
          </Box>
          <GridCenterText value={item.name} />
          <GridCenterText value={item.slash_damage} />
          <GridCenterText value={item.stab_damage} />
          <Box
            w={"100%"}
            h={"100%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <Text color={ALL_COLOR.WHITE} textAlign="center">
              {item.hit_radius} m
            </Text>
          </Box>
        </GridContents>
      ))}
    </>
  );
}
