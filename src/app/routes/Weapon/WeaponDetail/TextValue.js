import { Box, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const TextValue = ({ value }) => {
  return (
    <Box
      w={'100%'}
      h={'100%'}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={'column'}
    >
      <Text color="white" textAlign="center">
        {value}
      </Text>
    </Box>
  );
};

TextValue.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default TextValue;
