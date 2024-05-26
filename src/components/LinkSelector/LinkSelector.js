import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { MAP_COLOR } from 'src/utils/consts/colorConsts';
import PropTypes from 'prop-types';

const LinkSelector = ({ itemList, itemDesc, itemLink }) => {
  const param = useParams();
  return (
    <Flex
      className="CenterBox"
      flexWrap="wrap"
      justifyContent="center"
      width="100%"
      borderRadius={'lg'}
    >
      {itemList.map((item, index) => (
        <Button
          key={index}
          variant={'solid'}
          colorScheme={
            item.map_id === param.mapId ? 'whiteAlpha' : 'blackAlpha'
          }
          _hover={{ bg: MAP_COLOR.MAP_LIGHT_GRAY }}
          fontWeight="bold"
          borderWidth="2px"
          m="2"
        >
          <Link to={item[itemLink]} fontSize="lg">
            {item[itemDesc]}
          </Link>
        </Button>
      ))}
    </Flex>
  );
};

LinkSelector.propTypes = {
  itemList: PropTypes.array,
  itemDesc: PropTypes.string,
  itemLink: PropTypes.string,
};

export default LinkSelector;
