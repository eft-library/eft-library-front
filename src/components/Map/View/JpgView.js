import { Box, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const JpgView = ({ map }) => {
  return (
    <Box boxSize="sm" width={'100%'}>
      <Image src={map.map_jpg_path} boxSize="100%" />
    </Box>
  );
};

JpgView.propTypes = {};

export default JpgView;
