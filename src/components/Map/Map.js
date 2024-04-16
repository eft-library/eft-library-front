import React, { useState } from 'react';
import hooks from 'src/hooks/hooks';
import MapView from 'src/components/Map/View/MapView';
import ItemSelector from 'src/components/Map/Selector/ItemSelector';
import MapSelector from 'src/components/Map/Selector/MapSelector';
import { useParams } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';

const Map = () => {
  const params = useParams();
  const [map, setMap] = useState(hooks.useFindMap(params.mapId));
  const [subMap, setSubMap] = useState(hooks.useFindMap(params.mapId).subMap);
  const { viewItemList, onClickItem } = hooks.useItemFilter();

  const onClickMap = (value, type) => {
    const changeMap = hooks.useFindMap(value, type);
    setMap(changeMap);

    if (changeMap.depth === 1) {
      setSubMap(changeMap.subMap);
    }
  };

  return (
    <Box
      className="App"
      bgSize="cover"
      bg="#000000"
      bgPosition="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingTop="80px"
      width="100%"
      height="100%"
    >
      <Flex
        className="Container"
        flex="1"
        flexDirection="column"
        width="100%"
        height="100%"
      >
        <Flex
          className="CenterBox"
          flexWrap="wrap"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <MapSelector onClickMap={onClickMap} />
          <MapView
            key={map.value}
            viewItemList={viewItemList}
            map={map}
            subMap={subMap}
            onClickMap={onClickMap}
          />
          <ItemSelector viewItemList={viewItemList} onClickItem={onClickItem} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Map;
