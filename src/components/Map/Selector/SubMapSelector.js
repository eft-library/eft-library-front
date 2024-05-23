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
  subMap: PropTypes.arrayOf(
    PropTypes.shape({
      map_name_kr: PropTypes.string.isRequired,
      map_name_en: PropTypes.string.isRequired,
      map_id: PropTypes.string.isRequired,
      map_three_path: PropTypes.string.isRequired,
      map_update_time: PropTypes.string.isRequired,
      map_jpg_path: PropTypes.string.isRequired,
      map_depth: PropTypes.number.isRequired,
      map_link: PropTypes.string.isRequired,
      map_three_item_path: PropTypes.arrayOf(
        PropTypes.shape({
          color: PropTypes.string.isRequired,
          boxArgs: PropTypes.arrayOf(PropTypes.number.isRequired),
          position: PropTypes.arrayOf(PropTypes.number.isRequired),
          childValue: PropTypes.string.isRequired,
          motherValue: PropTypes.string.isRequired,
        }),
      ),
      map_main_image: PropTypes.string.isRequired,
      map_jpg_item_path: PropTypes.arrayOf(
        PropTypes.shape({
          item: PropTypes.number,
        }),
      ),
      map_parent_value: PropTypes.string.isRequired,
    }),
  ),

  mapId: PropTypes.string.isRequired,
};

export default SubMapSelector;
