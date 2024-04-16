import { Box, Text, Stack } from '@chakra-ui/react';
import ThreeView from 'src/components/Map/View/ThreeView';
import JpgView from 'src/components/Map/View/JpgView';
import SubMapSelector from 'src/components/Map/Selector/SubMapSelector';
import PropTypes from 'prop-types';
import { MAP_COLOR } from 'src/utils/colorConstants';

const MapView = ({ map, viewItemList, onClickMap, subMap }) => {
  return (
    <Box
      className="CenterBox"
      borderRadius="lg"
      padding="20px"
      margin="5px"
      width="100%"
      height="100%"
    >
      {subMap && subMap.length > 1 && (
        <SubMapSelector onClickMap={onClickMap} subMap={subMap} map={map} />
      )}
      <Stack spacing={4}>
        <Text as={'b'} color={MAP_COLOR.MAP_WHITE}>
          2D MAP
        </Text>
        <JpgView mapJpg={map.jpg} />
        <br />
        <Text as={'b'} color={MAP_COLOR.MAP_WHITE}>
          3D MAP
        </Text>
        <ThreeView map={map} viewItemList={viewItemList} />
      </Stack>
    </Box>
  );
};

MapView.propTypes = {
  map: PropTypes.objectOf(
    PropTypes.shape({
      krName: PropTypes.string.isRequired,
      enName: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      jpg: PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      subMap: PropTypes.arrayOf(
        PropTypes.shape({
          krName: PropTypes.string.isRequired,
          enName: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
          jpg: PropTypes.string.isRequired,
          depth: PropTypes.number.isRequired,
        }),
      ),
    }),
  ).isRequired,
  viewItemList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickMap: PropTypes.func.isRequired,
  subMap: PropTypes.arrayOf(
    PropTypes.shape({
      krName: PropTypes.string.isRequired,
      enName: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      jpg: PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default MapView;
