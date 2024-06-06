import GridTitle from "@/components/gridTitle/gridTitle";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridContents from "@/components/gridContents/gridContents";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Image } from "@chakra-ui/react";
import { HEAD_PHONE_COLUMN } from "@/util/consts/columnConsts";

interface HeadsetListType {
  name: string;
  image: string;
}

export default async function HeadsetDetail() {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item/headset`,
    {
      next: { revalidate: 600 },
    }
  );
  const data = await resp.json();
  const headsetList: HeadsetListType[] = data.data;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 2]}
        column={HEAD_PHONE_COLUMN.value_kr}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {headsetList.map((item, index) => (
        <GridContents columnDesign={[2, null, 2]} key={index}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Image src={item.image} maxH={"200px"} alt={item.name} />
          </Box>
          <GridCenterText value={item.name} />
        </GridContents>
      ))}
    </>
  );
}
