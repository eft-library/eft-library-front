import React from 'react';
import { MAP_LIST } from 'src/utils/mapConstants';
import { Flex, Button } from '@chakra-ui/react';

const MapSelector = ({ onClickMap }) => {
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
          onClick={() => onClickMap(map.value, false)}
          variant={'solid'}
          colorScheme="purple"
          fontWeight="bold" // 텍스트를 굵게 설정합니다.
          borderWidth="2px" // 텍스트 및 테두리 색상을 지정합니다.
          m="2"
        >
          {map.krName}
        </Button>
      ))}
    </Flex>
  );
};

export default MapSelector;
