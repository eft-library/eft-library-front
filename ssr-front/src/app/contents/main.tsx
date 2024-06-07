"use client";

import { Box, Flex } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { MAIN_IMAGE_SLIDER_OPTION } from "@/util/consts/libraryConsts";
import ImageSlider from "@/components/imageSlider/imageSlider";
import Info from "@/app/contents/info";
import News from "@/app/contents/news";
import Search from "@/app/contents/search";
import { useAppStore } from "@/store/provider";
import { fetchDataWithNone } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Main() {
  interface MainInfoType {
    [key: string]: any;
  }

  const [mainInfo, setMainInfo] = useState<MainInfoType[]>([]);
  useEffect(() => {
    fetchDataWithNone("/api/map/all", setMainInfo);
  }, []);
  const { bossId } = useAppStore((state) => state);

  return (
    <Box
      className="Main"
      bgSize="cover"
      bg={ALL_COLOR.BACKGROUND}
      bgPosition="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingTop="80px"
      paddingBottom="20px"
      width="100%"
      height="auto"
    >
      <Flex
        className="Container"
        flex="1"
        flexDirection="column"
        width="60%"
        height="100vh"
        justifyContent="center"
        border="1px"
        borderColor={ALL_COLOR.WHITE}
        borderRadius={"lg"}
        paddingBottom={"20px"}
      >
        <Search />
        <News />
        <ImageSlider
          mapList={mainInfo}
          imagePath="main_image"
          sliderOption={MAIN_IMAGE_SLIDER_OPTION}
          useZoom={false}
        />
        <Info />
      </Flex>
    </Box>
  );
}
