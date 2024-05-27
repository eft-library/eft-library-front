import { Box, Heading, Divider } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const DividerContents = ({ children, headText }) => {
  return (
    <Box>
      <Heading as={'h3'} size={'lg'} color={'white'} mb={3}>
        {headText}
      </Heading>
      <Divider borderColor={'white'} borderWidth={1} mb={4} />
      {children}
    </Box>
  );
};

DividerContents.propTypes = {
  headText: PropTypes.string,
  children: PropTypes.node,
};

export default DividerContents;
