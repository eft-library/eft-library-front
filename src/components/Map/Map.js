import React, { useState } from 'react';
import MapView from 'src/components/Map/MapView';
import ItemSelector from 'src/components/Map/ItemSelector';
import { MAP_INFO } from 'src/utils/mapConstants';
import MapSelector from 'src/components/Map/MapSelector';
import { Link } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';
import hooks from 'src/hooks/hooks';

const Map = () => {
  const [map, setMap] = useState(MAP_INFO.CUSTOM_GA_FIRST_FLOOR_DORMITORY);
  const { viewItemList, onClickItem } = hooks.useItemFilter();

  const onClickMap = (name) => {
    setMap(MAP_INFO[name]);
  };

  return (
    <Box
      className="App"
      // bg={`url(${process.env.PUBLIC_URL}/images/background.png)`} /* 이미지 경로를 동적으로 설정 */
      bgSize="cover"
      bg="#000000"
      bgPosition="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingTop="80px" /* 탑 네비게이션의 높이만큼 상단 패딩 추가 */
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
          <MapView key={map.NAME} mapInfo={map} viewItemList={viewItemList} />
          <ItemSelector
            // orbitControls={orbitControls}
            viewItemList={viewItemList}
            onClickItem={onClickItem}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Map;
