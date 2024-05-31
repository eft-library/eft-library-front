import { Box, Text, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { MAP_COLOR } from 'src/utils/consts/colorConsts';
import { useState, useEffect } from 'react';
import ThreeView from '../Map/View/ThreeView';
import JpgView from '../Map/View/JpgView';
import SubMapSelector from '../Map/Selector/SubMapSelector';
import ItemSelector from '../Map/Selector/ItemSelector';
import hooks from 'src/hooks/hooks';
import MapViewSkeleton from './View/MapViewSkeleton';
import PageParent from 'src/components/PageParent/PageParent';
import LinkSelector from 'src/components/LinkSelector/LinkSelector';
import API_PATH from 'src/api/api_path';

const Map = () => {
  const params = useParams();
  const { apiData: map, loading } = hooks.useGetApiWithNone(
    API_PATH.GET_ALL_MAP,
  );
  const [mapData, setMapData] = useState(null);
  const [subMap, setSubMap] = useState(null);
  const { viewItemList, onClickItem, onClickAllItem } = hooks.useItemFilter(
    mapData ? mapData.map_jpg_item_path : null,
  );
  const { apiData: column, loading: columnLoading } = hooks.useGetApiWithNone(
    API_PATH.GET_COLUMN + '/MAP',
  );

  const columnList = (columnObj) => {
    const col = columnObj.find(
      (item) => item.column_id === 'MAP_COLUMN',
    ).column_json_value;
    col.sort((a, b) => a.map_order - b.map_order);
    return col;
  };

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

  if (!mapData || !column || loading || columnLoading)
    return <MapViewSkeleton />;

  return (
    <PageParent>
      {viewItemList && (
        <ItemSelector
          originItemList={mapData.map_jpg_item_path}
          viewItemList={viewItemList}
          onClickItem={onClickItem}
          onClickAllItem={onClickAllItem}
        />
      )}
      <LinkSelector
        itemList={columnList(column)}
        itemDesc="map_name_kr"
        itemLink="map_link"
        mt={3}
      />
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
          <JpgView map={mapData} viewItemList={viewItemList} />
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
    </PageParent>
  );
};

export default Map;
