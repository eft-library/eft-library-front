import { SimpleGrid, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const GridTitle = ({ columnDesign, column }) => {
  return (
    <SimpleGrid
      columns={columnDesign}
      spacing={2}
      width={'95%'}
      outline={'2px solid'}
      outlineColor={'white'}
      borderRadius={'lg'}
      boxShadow="0 0 14px rgb(202, 238, 18, 0.7)"
      p={2}
      mb={6}
    >
      {column.map((item, index) => (
        <Text
          color={'white'}
          key={index}
          textAlign={'center'}
          fontWeight={700}
          textShadow="0px 1px 1px rgb(202, 238, 18, 0.7)"
        >
          {item}
        </Text>
      ))}
    </SimpleGrid>
  );
};

GridTitle.propTypes = {
  columnDesign: PropTypes.array,
  column: PropTypes.array,
};

export default GridTitle;
