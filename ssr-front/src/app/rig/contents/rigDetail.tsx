import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import RenderArrayText from "@/components/gridText/renderArrayText";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Image, Text } from "@chakra-ui/react";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { RigList } from "@/types/types";

export default async function RigDetail() {
  const response = await fetch(API_ENDPOINTS.GET_ALL_RIG, {
    next: { revalidate: 60000 },
  });
  const data = await response.json();
  const rigList: RigList = data.data;

  const columnResponse = await fetch(
    `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.rig}`,
    {
      next: { revalidate: 60000 },
    }
  );

  const columnData = await columnResponse.json();
  const column = columnData.data;

  const noClassColumn = (column: string[]) => {
    return column.filter(
      (item) =>
        item === "사진" || item === "이름" || item === "슬롯" || item === "무게"
    );
  };

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 7]}
        column={column.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {rigList.class_rig.map((item, index) => (
        <GridContents columnDesign={[2, null, 7]} key={index}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Image src={item.image} maxH={"200px"} alt={item.name} />
          </Box>
          <GridCenterText value={item.name} />
          <GridCenterText value={item.durability} />
          <GridCenterText value={item.capacity} />
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
      <Box mb={20} />
      <GridTitle
        columnDesign={[2, null, 4]}
        column={noClassColumn(column.value_kr)}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {rigList.no_class_rig.map((item, index) => (
        <GridContents columnDesign={[2, null, 4]} key={index}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Image src={item.image} maxH={"200px"} alt={item.name} />
          </Box>
          <GridCenterText value={item.name} />
          <GridCenterText value={item.capacity} />
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
