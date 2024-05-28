import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { MAP_COLOR } from 'src/utils/consts/colorConsts';

const SubMapSelector = ({ onClickSubMap, subMap, mapId }) => {
  return (
    <HStack justifyContent="center">
      {subMap.map((sub, index) => (
        <Text
          key={index}
          onClick={() => onClickSubMap(sub)}
          color={
            mapId === sub.map_id ? MAP_COLOR.MAP_YELLOW : MAP_COLOR.MAP_WHITE
          }
          fontWeight="bold"
          _hover={{ color: MAP_COLOR.MAP_DARK_YELLOW }}
          p="2"
          cursor="pointer"
        >
          * {sub.map_name_kr}
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
