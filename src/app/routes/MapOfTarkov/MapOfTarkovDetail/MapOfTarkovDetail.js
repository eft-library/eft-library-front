import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import MapOfTarkovMap from './MapOfTarkovMap/MapOfTarkovMap';
import MapOfTarkovBoss from './MapOfTarkovBoss/MapOfTarkovBoss';
import MapOfTarkovExtraction from '../MapOfTarkovExtraction/MapOfTarkovExtraction';

const MapOfTarkovDetail = ({ mapOfTarkov }) => {
  return (
    <Box w={'95%'} mt={10}>
      <MapOfTarkovMap mapList={mapOfTarkov.map_info.map_sub} />
      <MapOfTarkovBoss bossList={mapOfTarkov.boss_list} />
      <MapOfTarkovExtraction extractionInfo={mapOfTarkov.extraction_info} />
    </Box>
  );
};

MapOfTarkovDetail.propTypes = {
  mapOfTarkov: PropTypes.object,
};

export default MapOfTarkovDetail;
