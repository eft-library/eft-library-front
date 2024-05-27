import { Box, Heading, Divider } from '@chakra-ui/react';
import ImageSlider from 'src/components/ImageSlider/ImageSlider';
import PropTypes from 'prop-types';

const MapOfTarkovMap = ({ mapList }) => {
  return (
    <Box mb={10}>
      <Heading as={'h3'} size={'lg'} color={'white'} mb={3}>
        {mapList[0].map_name_kr}
      </Heading>
      <Divider borderColor={'white'} borderWidth={1} mb={4} />
      <Box display={'flex'} alignItems={'center'}>
        <ImageSlider mapList={mapList} imagePath="map_jpg_path" />
      </Box>
    </Box>
  );
};

MapOfTarkovMap.propTypes = {
  mapList: PropTypes.array,
};

export default MapOfTarkovMap;
