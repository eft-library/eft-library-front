import { Box, Flex } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { MAIN_IMAGE_SLIDER_OPTION } from "@/util/consts/libraryConsts";
import ImageSlider from "@/components/imageSlider/imageSlider";
import Info from "@/app/contents/info";
import News from "@/app/contents/news";
import Search from "@/app/contents/search";
import API_ENDPOINTS from "@/config/endPoints";
import type { SubMenu } from "@/types/types";

export default async function Main() {
  const response = await fetch(API_ENDPOINTS.GET_ALL_MAP, {
    next: { revalidate: 60000 },
  });
  const data = await response.json();
  const mainInfo: SubMenu[] = data.data;

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
