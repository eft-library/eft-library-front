import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import RenderArrayText from "@/components/gridText/renderArrayText";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Image, Text } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { ArmorVest } from "@/types/types";

export default async function ArmorVestDetail() {
  const response = await fetch(API_ENDPOINTS.GET_ALL_ARMOR_VEST, {
    next: { revalidate: 60000 },
  });
  const data = await response.json();
  const armorVestList: ArmorVest[] = data.data;

  const columnResponse = await fetch(
    `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.armorVest}`,
    {
      next: { revalidate: 60000 },
    }
  );

  const columnData = await columnResponse.json();
  const column = columnData.data;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 6]}
        column={column.value_kr}
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
