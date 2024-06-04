import { Box, Flex } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { MAIN_IMAGE_SLIDER_OPTION } from "@/util/consts/libraryConsts";
import ImageSlider from "@/components/imageSlider/imageSlider";
import Info from "@/app/detail/info";
import News from "@/app/detail/news";
import Search from "@/app/detail/search";

export default async function Main() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/map/all`, {
    next: { revalidate: 600 },
  });
  const map = await resp.json();

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
          mapList={map.data}
          imagePath="main_image"
          sliderOption={MAIN_IMAGE_SLIDER_OPTION}
          useZoom={false}
        />
        <Info />
      </Flex>
    </Box>
  );
}
