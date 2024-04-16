import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SubMapSelector = ({ onClickMap, subMap }) => {
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
      {subMap.map((sub, index) => (
        <Button
          key={index}
          onClick={() => onClickMap(sub.value, true)}
          colorScheme="teal"
          variant="solid"
          fontWeight="bold" // 텍스트를 굵게 설정합니다.
          borderWidth="2px" // 텍스트 및 테두리 색상을 지정합니다.
          m="2"
        >
          {sub.krName}
        </Button>
      ))}
    </Flex>
  );
};

SubMapSelector.propTypes = {
  onClickMap: PropTypes.func.isRequired,
  subMap: PropTypes.arrayOf(
    PropTypes.shape({
      krName: PropTypes.string.isRequired,
      enName: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      jpg: PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default SubMapSelector;
