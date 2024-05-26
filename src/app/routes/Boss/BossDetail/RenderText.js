import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import CustomText from 'src/components/CustomText/CustomText';

const RenderText = ({ text }) => (
  <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
    <CustomText fw={600}>{text}</CustomText>
  </Box>
);

RenderText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default RenderText;
