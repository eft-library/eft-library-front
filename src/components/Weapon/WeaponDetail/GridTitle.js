import { SimpleGrid, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const GridTitle = ({ columnDesign, column }) => {
  return (
    <SimpleGrid
      columns={columnDesign}
      spacing={2}
      width={'90%'}
      outline={'1px solid'}
      outlineColor={'white'}
      borderRadius={'lg'}
      p={2}
      mb={6}
    >
      {column.map((item, index) => (
        <Text color={'white'} key={index} textAlign={'center'}>
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
