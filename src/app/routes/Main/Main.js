import { Box, Flex } from '@chakra-ui/react';
import { MAP_COLOR } from 'src/utils/consts/colorConsts';
import ImageSlider from '../Main/ImageSlider/ImageSlider';
import Search from '../Main/Search/Search';
import News from '../Main/News/News';
import Info from '../Main/Info/Info';
import hooks from 'src/hooks/hooks';

const Main = () => {
  const { map, loading } = hooks.useGetAllMap();

  if (!map || loading) return null;

  return (
    <Box
      className="Main"
      bgSize="cover"
      bg={MAP_COLOR.MAP_BACKGROUND}
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
        borderColor={MAP_COLOR.MAP_LIGHT_GRAY}
        borderRadius={'lg'}
        paddingBottom={'20px'}
      >
        <Search />
        <News />
        <ImageSlider mapList={map} imagePath="map_main_image" />
        <Info />
      </Flex>
    </Box>
  );
};

export default Main;
