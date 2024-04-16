import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { MAP_COLOR } from 'src/utils/colorConstants';

const SubMapSelector = ({ onClickMap, subMap, map }) => {
  return (
    <HStack justifyContent="center">
      {subMap.map((sub, index) => (
        <Text
          key={index}
          onClick={() => onClickMap(sub.value, true)}
          color={map.value === sub.value ? MAP_COLOR.MAP_YELLOW : '#FFFFFF'}
          fontWeight="bold"
          _hover={{ color: MAP_COLOR.MAP_DARK_YELLOW }}
          p="2"
          cursor="pointer"
        >
          * {sub.krName}
        </Text>
      ))}
    </HStack>
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
  map: PropTypes.objectOf(
    PropTypes.shape({
      krName: PropTypes.string.isRequired,
      enName: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      jpg: PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      subMap: PropTypes.arrayOf(
        PropTypes.shape({
          krName: PropTypes.string.isRequired,
          enName: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
          jpg: PropTypes.string.isRequired,
          depth: PropTypes.number.isRequired,
        }),
      ),
    }),
  ).isRequired,
};

export default SubMapSelector;
