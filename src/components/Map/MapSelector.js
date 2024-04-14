import React from 'react';
import { MAP_LIST } from 'src/utils/mapConstants';
import { Flex, Button } from '@chakra-ui/react';

const MapSelector = (props) => {
  return (
    <Flex
      className="CenterBox"
      flexWrap="wrap"
      justifyContent="center"
      width="70%"
      borderRadius={'lg'}
      bg={'rgba(255, 255, 255, 0.5)'}
    >
      {/* 맵 선택 목록 */}
      {MAP_LIST.map((map, index) => (
        <Button
          key={index}
          onClick={() => props.onClickMap(map.value)}
          // variant={selectedMap === mapName ? "solid" : "outline"}
          colorScheme="transparent"
          fontWeight="bold" // 텍스트를 굵게 설정합니다.
          borderWidth="2px" // 텍스트 및 테두리 색상을 지정합니다.
          m="2"
        >
          {map.kr_name}
        </Button>
      ))}
    </Flex>
  );
};

export default MapSelector;
