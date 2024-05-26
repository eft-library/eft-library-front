import { Skeleton } from '@chakra-ui/react';
import { Box, Text, Stack } from '@chakra-ui/react';
import { MAP_COLOR } from 'src/utils/consts/colorConsts';

const MapViewSkeleton = () => {
  return (
    <>
      <Skeleton height="100px" width="100%" />
      <Box
        className="CenterBox"
        borderRadius="lg"
        padding="20px"
        margin="5px"
        width="100%"
        height="100%"
      >
        <Skeleton height="100px" width="100%" />
        <Stack spacing={4}>
          <Text as={'b'} color={MAP_COLOR.MAP_WHITE}>
            2D MAP
          </Text>
          <Skeleton height="400px" width="100%" />
          <br />
          <Text as={'b'} color={MAP_COLOR.MAP_WHITE}>
            3D MAP
          </Text>
          <Skeleton height="800px" width="100%" />
        </Stack>
      </Box>
    </>
  );
};

export default MapViewSkeleton;
