import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import RenderArrayText from "@/components/gridText/renderArrayText";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Image, Text } from "@chakra-ui/react";
import { ARMOR_VEST_COLUMN } from "@/util/consts/columnConsts";

interface ArmorVestListType {
  name: string;
  image: string;
  durability: number;
  capacity: number;
  class_value: number;
  areas_kr: string[];
  weight: number;
}

export default async function ArmorVestDetail() {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item/armor_vest`,
    {
      next: { revalidate: 600 },
    }
  );
  const data = await resp.json();
  const armorVestList: ArmorVestListType[] = data.data;
  return (
    <>
      <GridTitle
        columnDesign={[2, null, 6]}
        column={ARMOR_VEST_COLUMN.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {armorVestList.map((item, index) => (
        <GridContents columnDesign={[2, null, 6]} key={index}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Image src={item.image} maxH={"200px"} alt={item.name} />
          </Box>
          <GridCenterText value={item.name} />
          <GridCenterText value={item.durability} />
          <GridCenterText value={item.class_value} />
          <RenderArrayText arrayText={item.areas_kr} />
          <Box
            w={"100%"}
            h={"100%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <Text color={ALL_COLOR.WHITE} textAlign="center">
              {item.weight} kg
            </Text>
          </Box>
        </GridContents>
      ))}
    </>
  );
}
