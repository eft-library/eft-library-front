import React from 'react';
import MapView from 'src/components/Map/View/MapView';
import { Flex, Box } from '@chakra-ui/react';
import { MAP_COLOR } from 'src/utils/colorConstants';

const Map = () => {
  return (
    <Box
      className="Map"
      bgSize="cover"
      bg={MAP_COLOR.MAP_BACKGROUND}
      bgPosition="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingTop="80px"
      paddingBottom="10px"
      width="100%"
      height="100%"
    >
      <Flex
        className="Container"
        flex="1"
        flexDirection="column"
        width="60%"
        height="100%"
        justifyContent="center"
        border="1px"
        borderColor={MAP_COLOR.MAP_LIGHT_GRAY}
        borderRadius={'lg'}
      >
        <MapView />
      </Flex>
    </Box>
  );
};

export default Map;
