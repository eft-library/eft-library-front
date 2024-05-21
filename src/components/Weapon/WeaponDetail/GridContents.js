import { SimpleGrid } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const GridContents = ({ children, columnDesign }) => {
  return (
    <SimpleGrid
      columns={columnDesign}
      spacing={2}
      width={'95%'}
      outline={'1px solid'}
      outlineColor={'white'}
      borderRadius={'lg'}
      p={2}
      mb={4}
    >
      {children}
    </SimpleGrid>
  );
};

GridContents.propTypes = {
  columnDesign: PropTypes.array,
  children: PropTypes.node,
};

export default GridContents;
