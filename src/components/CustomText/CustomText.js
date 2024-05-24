import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CustomText = ({ children, color = 'white', mt = 0, fw = 700 }) => {
  return (
    <Text color={color} mt={mt} fontWeight={fw} textAlign="center">
      {children}
    </Text>
  );
};

CustomText.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  mt: PropTypes.number,
  fw: PropTypes.number,
};

export default CustomText;
