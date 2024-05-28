import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import MapOfTarkovExtraction from './MapOfTarkovExtraction/MapOfTarkovExtraction';
import DividerContents from 'src/components/DividerContents/DividerContents';
import ImageSlider from 'src/components/ImageSlider/ImageSlider';
import BossDetail from '../../Boss/BossDetail/BossDetail';

const MapOfTarkovDetail = ({ mapOfTarkov }) => {
  return (
    <Box w={'95%'} mt={10}>
      <DividerContents headText={mapOfTarkov.map_info.map_sub[0].map_name_kr}>
        <Box display={'flex'} alignItems={'center'}>
          <ImageSlider
            mapList={mapOfTarkov.map_info.map_sub}
            imagePath="map_jpg_path"
          />
        </Box>
      </DividerContents>
      <DividerContents headText="보스">
        <BossDetail bossList={mapOfTarkov.boss_list} bossId={true} />
      </DividerContents>
      <MapOfTarkovExtraction extractionList={mapOfTarkov.extraction_info} />
    </Box>
  );
};

MapOfTarkovDetail.propTypes = {
  mapOfTarkov: PropTypes.object,
};

export default MapOfTarkovDetail;
