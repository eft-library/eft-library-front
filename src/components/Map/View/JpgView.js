import { Box, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const JpgView = ({ mapJpg }) => {
  return (
    <Box boxSize="sm">
      <Image src={mapJpg} boxSize="100%" />
    </Box>
  );
};

JpgView.propTypes = {
  mapJpg: PropTypes.string.isRequired,
};

export default JpgView;
