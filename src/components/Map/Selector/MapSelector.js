import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { MAP_COLOR } from 'src/utils/colorConstants';
import PropTypes from 'prop-types';

const MapSelector = ({ map }) => {
  const param = useParams();
  return (
    <Flex
      className="CenterBox"
      flexWrap="wrap"
      justifyContent="center"
      width="100%"
      borderRadius={'lg'}
    >
      {map.map((map, index) => (
        <Button
          key={index}
          variant={'solid'}
          colorScheme={map.map_id === param.mapId ? 'whiteAlpha' : 'blackAlpha'}
          _hover={{ bg: MAP_COLOR.MAP_LIGHT_GRAY }}
          fontWeight="bold"
          borderWidth="2px"
          m="2"
        >
          <Link to={map.map_link} fontSize="lg">
            {map.map_name_kr}
          </Link>
        </Button>
      ))}
    </Flex>
  );
};

MapSelector.propTypes = {
  map: PropTypes.arrayOf(
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
      map_sub: PropTypes.arrayOf(
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
    }),
  ).isRequired,
};

export default MapSelector;
