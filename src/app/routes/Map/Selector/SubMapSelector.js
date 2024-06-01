import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const SubMapSelector = ({ onClickSubMap, subMap, mapId }) => {
  return (
    <HStack justifyContent="center">
      {subMap.map((sub, index) => (
        <Text
          key={index}
          onClick={() => onClickSubMap(sub)}
          color={mapId === sub.id ? ALL_COLOR.YELLOW : ALL_COLOR.DARK_YELLOW}
          fontWeight="bold"
          _hover={{ color: ALL_COLOR.DARK_YELLOW }}
          p="2"
          cursor="pointer"
        >
          * {sub.name_kr}
        </Text>
      ))}
    </HStack>
  );
};

SubMapSelector.propTypes = {
  onClickSubMap: PropTypes.func.isRequired,
  subMap: PropTypes.array,
  mapId: PropTypes.string.isRequired,
};

export default SubMapSelector;
