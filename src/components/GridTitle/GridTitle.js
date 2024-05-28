import { SimpleGrid, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const GridTitle = ({ columnDesign, column, isShadow, shadowColor }) => {
  return (
    <SimpleGrid
      columns={columnDesign}
      spacing={2}
      width={'95%'}
      outline={'2px solid'}
      outlineColor={'white'}
      borderRadius={'lg'}
      boxShadow={isShadow ? shadowColor : ''}
      p={2}
      mb={6}
    >
      {column.map((item, index) => (
        <Text
          color={'white'}
          key={index}
          textAlign={'center'}
          fontWeight={700}
          textShadow={isShadow ? shadowColor : ''}
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
  isShadow: PropTypes.bool,
  shadowColor: PropTypes.string,
};

export default GridTitle;
