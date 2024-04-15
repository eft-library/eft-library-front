import React from 'react';
import { MAP_LIST } from 'src/utils/mapConstants';
import { Flex, Button } from '@chakra-ui/react';

const SubMapSelector = ({ onClickMap }) => {
  return (
    <Flex
      className="CenterBox"
      flexWrap="wrap"
      justifyContent="center"
      width="100%"
      borderRadius={'lg'}
      bg={'rgba(255, 255, 255, 0.5)'}
      mb={'20'}
    >
      {/* 맵 선택 목록 */}
      {MAP_LIST.map((main) =>
        main.sub_map.map((sub, sub_index) => (
          <Button
            key={sub_index}
            onClick={() => onClickMap(sub.value)}
            colorScheme="teal"
            variant="solid"
            fontWeight="bold" // 텍스트를 굵게 설정합니다.
            borderWidth="2px" // 텍스트 및 테두리 색상을 지정합니다.
            m="2"
          >
            {sub.kr_name}
          </Button>
        )),
      )}
    </Flex>
  );
};

export default SubMapSelector;
