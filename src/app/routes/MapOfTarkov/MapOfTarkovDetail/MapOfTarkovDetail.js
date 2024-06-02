import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import MapOfTarkovExtraction from './MapOfTarkovExtraction/MapOfTarkovExtraction';
import DividerContents from 'src/components/DividerContents/DividerContents';
import ImageSlider from 'src/components/ImageSlider/ImageSlider';
import BossDetail from '../../Boss/BossDetail/BossDetail';
import { MOT_IMAGE_SLIDER_OPTION } from 'src/utils/consts/libraryConsts';

const MapOfTarkovDetail = ({ mapOfTarkov }) => {
  const sortSubList = (subMapList) => {
    subMapList.sort((a, b) => {
      return a.order - b.order;
    });
    return subMapList;
  };

  return (
    <Box w={'95%'} mt={10}>
      <DividerContents
        headText={sortSubList(mapOfTarkov.map_info.sub)[0].name_kr}
      >
        <Box display={'flex'} alignItems={'center'}>
          <ImageSlider
            mapList={sortSubList(mapOfTarkov.map_info.sub)}
            imagePath="jpg_image"
            sliderOption={MOT_IMAGE_SLIDER_OPTION}
            useZoom
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
