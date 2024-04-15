import { Box, Image } from '@chakra-ui/react';

const JpgView = ({ mapInfo }) => {
  return (
    <Box boxSize="sm">
      <Image src={mapInfo.JPG} boxSize="100%" />
    </Box>
  );
};

export default JpgView;
