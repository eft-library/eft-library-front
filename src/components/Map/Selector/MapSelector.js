import React from 'react';
import { MAP_LIST } from 'src/utils/mapConstants';
import { Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const MapSelector = () => {
  const param = useParams();
  return (
    <Flex
      className="CenterBox"
      flexWrap="wrap"
      justifyContent="center"
      width="70%"
      borderRadius={'lg'}
    >
      {MAP_LIST.map((map, index) => (
        <Button
          key={index}
          variant={'solid'}
          colorScheme={map.value === param.mapId ? 'whiteAlpha' : 'blackAlpha'}
          _hover={{ bg: 'gray' }}
          fontWeight="bold"
          borderWidth="2px"
          m="2"
        >
          <Link to={map.link} fontSize="lg">
            {map.krName}
          </Link>
        </Button>
      ))}
    </Flex>
  );
};

export default MapSelector;
