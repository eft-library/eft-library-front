import React from 'react';
import { MAP_LIST } from 'src/utils/mapConstants';
import { Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { MAP_COLOR } from 'src/utils/colorConstants';

const MapSelector = () => {
  const param = useParams();
  return (
    <Flex
      className="CenterBox"
      flexWrap="wrap"
      justifyContent="center"
      width="100%"
      borderRadius={'lg'}
    >
      {MAP_LIST.map((map, index) => (
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

export default MapSelector;
