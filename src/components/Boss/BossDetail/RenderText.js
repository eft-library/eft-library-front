import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const RenderText = ({ text }) => (
  <Text
    color="white"
    textAlign="center"
    display="flex"
    justifyContent="center"
    alignItems="center"
    fontWeight={600}
  >
    {text}
  </Text>
);

RenderText.propTypes = {
  text: PropTypes.string,
};

export default RenderText;
