import React from 'react';
import hooks from 'src/hooks/hooks';
import MapView from 'src/components/Map/View/MapView';
import ItemSelector from 'src/components/Map/Selector/ItemSelector';
import MapSelector from 'src/components/Map/Selector/MapSelector';
import { Flex, Box } from '@chakra-ui/react';
import { MAP_COLOR } from 'src/utils/colorConstants';

const Map = () => {
  const { viewItemList, onClickItem, onClickAllItem } = hooks.useItemFilter();

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
      paddingBottom="80px"
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
        <MapSelector />
        <MapView viewItemList={viewItemList} />
        <ItemSelector
          viewItemList={viewItemList}
          onClickItem={onClickItem}
          onClickAllItem={onClickAllItem}
        />
      </Flex>
    </Box>
  );
};

export default Map;
