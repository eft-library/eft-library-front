import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import RenderArrayText from "@/components/gridText/renderArrayText";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Image, Text } from "@chakra-ui/react";
import { RIG_COLUMN } from "@/util/consts/columnConsts";

interface RigType {
  name: string;
  image: string;
  durability: number;
  capacity: number;
  class_value: string;
  areas_kr: string[];
  weight: number;
}

interface RigListType {
  class_rig: RigType[];
  no_class_rig: RigType[];
}

export default async function RigDetail() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/item/rig`, {
    next: { revalidate: 600 },
  });
  const data = await resp.json();
  const rigList: RigListType = data.data;

  const noClassColumn = (column: string[]) => {
    return column.filter(
      (item) =>
        item === "사진" || item === "이름" || item === "슬롯" || item === "무게"
    );
  };
  console.log(rigList);
  return (
    <>
      <GridTitle
        columnDesign={[2, null, 7]}
        column={RIG_COLUMN.value_kr}
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
        column={noClassColumn(RIG_COLUMN.value_kr)}
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
