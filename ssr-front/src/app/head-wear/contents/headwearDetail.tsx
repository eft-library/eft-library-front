import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import RenderArrayText from "@/components/gridText/renderArrayText";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Image, Text } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { HeadwearList } from "@/types/types";

export default async function HeadWearDetail() {
  const resp = await fetch(API_ENDPOINTS.GET_ALL_HEAD_WEAR, {
    next: { revalidate: 60000 },
  });
  const data = await resp.json();
  const headWearList: HeadwearList = data.data;

  const columnResponse = await fetch(
    `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.headwear}`,
    {
      next: { revalidate: 60000 },
    }
  );

  const columnData = await columnResponse.json();
  const column = columnData.data;

  const noClassColumn = (column: string[]) => {
    return column.filter((item) => item === "사진" || item === "이름");
  };

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 7]}
        column={column.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {headWearList.class_head_wear.map((item, index) => (
        <GridContents columnDesign={[2, null, 7]} key={index}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Image src={item.image} maxH={"200px"} alt={item.name} />
          </Box>
          <GridCenterText value={item.name} />
          <GridCenterText value={item.class_value} />
          <RenderArrayText arrayText={item.areas_kr} />
          <GridCenterText value={item.durability} />
          <GridCenterText value={item.ricochet_str_kr} />
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
        columnDesign={[2, null, 2]}
        column={noClassColumn(column.value_kr)}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {headWearList.no_class_head_wear.map((item, index) => (
        <GridContents columnDesign={[2, null, 2]} key={index}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Image src={item.image} maxH={"200px"} alt="item" />
          </Box>
          <GridCenterText value={item.name} />
        </GridContents>
      ))}
    </>
  );
}
