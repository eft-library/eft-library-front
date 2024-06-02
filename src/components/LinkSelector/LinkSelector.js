import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import PropTypes from 'prop-types';

const LinkSelector = ({ itemList, itemDesc, itemLink, mt }) => {
  const param = useParams();

  return (
    <Flex
      mt={mt}
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
          colorScheme={item.id === param.mapId ? 'whiteAlpha' : 'blackAlpha'}
          _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
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
  mt: PropTypes.number,
};

export default LinkSelector;
