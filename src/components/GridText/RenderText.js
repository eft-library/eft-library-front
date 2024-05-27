import { Box, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const RenderText = ({ text }) => (
  <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
    <Text color={'white'} fontWeight={600} textAlign="center">
      {text}
    </Text>
  </Box>
);

RenderText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default RenderText;
