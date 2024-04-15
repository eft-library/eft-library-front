import { Box, Text, Stack } from '@chakra-ui/react';
import ThreeView from 'src/components/Map/ThreeView';
import JpgView from 'src/components/Map/JpgView';
import SubMapSelector from 'src/components/Map/SubMapSelector';

const MapView = ({ map, viewItemList, onClickItem }) => {
  return (
    <Box
      className="CenterBox"
      bg={'rgba(255, 255, 255, 0.5)'}
      borderRadius="lg"
      padding="20px"
      margin="5px"
      width="70%"
      height="100%"
    >
      <SubMapSelector onClickItem={onClickItem} />
      <Stack spacing={4}>
        <Text as={'b'} color={'white'}>
          2D MAP
        </Text>
        <JpgView mapInfo={map} />
        <br />
        <Text as={'b'} color={'white'}>
          3D MAP
        </Text>
        <ThreeView mapInfo={map} viewItemList={viewItemList} />
      </Stack>
    </Box>
  );
};

export default MapView;
