import { Box, Flex } from '@chakra-ui/react';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import ImageSlider from 'src/components/ImageSlider/ImageSlider';
import Search from '../Main/Search/Search';
import News from '../Main/News/News';
import Info from '../Main/Info/Info';
import hooks from 'src/hooks/hooks';
import { MAIN_IMAGE_SLIDER_OPTION } from 'src/utils/consts/libraryConsts';
import API_PATH from 'src/api/api_path';

const Main = () => {
  const { apiData: map, loading } = hooks.useGetApiWithNone(
    API_PATH.GET_ALL_MAP,
  );

  if (!map || loading) return null;

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
        borderColor={ALL_COLOR.LIGHT_GRAY}
        borderRadius={'lg'}
        paddingBottom={'20px'}
      >
        <Search />
        <News />
        <ImageSlider
          mapList={map}
          imagePath="main_image"
          sliderOption={MAIN_IMAGE_SLIDER_OPTION}
          useZoom={false}
        />
        <Info />
      </Flex>
    </Box>
  );
};

export default Main;
