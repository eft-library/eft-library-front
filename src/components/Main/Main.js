import { Box, Flex } from '@chakra-ui/react';
import { MAP_COLOR } from 'src/utils/colorConstants';
import ImageSlider from 'src/components/Main/ImageSlider/ImageSlider';
import Search from 'src/components/Main/Search/Search';
import News from 'src/components/Main/News/News';
import Info from 'src/components/Main/Info/Info';

const Main = () => {
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
      paddingBottom="80px"
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
        <ImageSlider />
        <Info />
      </Flex>
    </Box>
  );
};

export default Main;
