import { Box, Flex } from '@chakra-ui/react';
import { MAP_COLOR } from 'src/utils/colorConstants';

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
      width="100%"
      height="100vh"
    >
      <Flex
        className="Container"
        flex="1"
        flexDirection="column"
        width="70%"
        height="100%"
        justifyContent="center"
        border="1px"
        borderColor={MAP_COLOR.MAP_LIGHT_GRAY}
        borderRadius={'lg'}
      >
        <div>hi</div>
      </Flex>
    </Box>
  );
};

export default Main;
