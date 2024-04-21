import { Box, Text, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { MAP_COLOR } from 'src/utils/colorConstants';
import { useState, useEffect } from 'react';
import MapSelector from 'src/components/Map/Selector/MapSelector';
import ThreeView from 'src/components/Map/View/ThreeView';
import JpgView from 'src/components/Map/View/JpgView';
import SubMapSelector from 'src/components/Map/Selector/SubMapSelector';
import PropTypes from 'prop-types';
import hooks from 'src/hooks/hooks';

const MapView = ({ viewItemList }) => {
  const params = useParams();
  const { map, loading } = hooks.useGetAllMap();
  const [mapData, setMapData] = useState(null);
  const [subMap, setSubMap] = useState(null);

  useEffect(() => {
    if (map) {
      const newMap = map.filter((item) => {
        return item.map_id === params.mapId;
      })[0];
      setMapData(newMap);
      setSubMap(newMap.map_sub);
    }
  }, [params, loading]);

  const onClickSubMap = (map_value) => {
    setMapData(map_value);
    if (map_value.depth === 1) {
      setSubMap(map_value.map_sub);
    }
  };

  if (!mapData) return null;

  return (
    <>
      <MapSelector map={map} />
      <Box
        className="CenterBox"
        borderRadius="lg"
        padding="20px"
        margin="5px"
        width="100%"
        height="100%"
      >
        {subMap && subMap.length > 1 && (
          <SubMapSelector
            onClickSubMap={onClickSubMap}
            subMap={subMap}
            mapId={mapData.map_id}
          />
        )}
        <Stack spacing={4}>
          <Text as={'b'} color={MAP_COLOR.MAP_WHITE}>
            2D MAP
          </Text>
          <JpgView map={mapData} />
          <br />
          <Text as={'b'} color={MAP_COLOR.MAP_WHITE}>
            3D MAP
          </Text>
          <ThreeView
            key={mapData.map_id}
            map={mapData}
            viewItemList={viewItemList}
          />
        </Stack>
      </Box>
    </>
  );
};

MapView.propTypes = {
  viewItemList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MapView;
