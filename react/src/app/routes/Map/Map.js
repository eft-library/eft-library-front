import { Box, Text, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import { useState, useEffect } from 'react';
import ThreeView from '../Map/View/ThreeView';
import JpgView from '../Map/View/JpgView';
import SubMapSelector from '../Map/Selector/SubMapSelector';
import ItemSelector from '../Map/Selector/ItemSelector';
import hooks from 'src/hooks/hooks';
import PageParent from 'src/components/PageParent/PageParent';
import LinkSelector from 'src/components/LinkSelector/LinkSelector';
import API_PATH from 'src/api/api_path';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { useStore } from 'src/stores/store';

const Map = () => {
  const { allColumn } = useStore();
  const params = useParams();
  const [mapData, setMapData] = useState(null);
  const [subMap, setSubMap] = useState(null);
  const { viewItemList, onClickItem, onClickAllItem } = hooks.useItemFilter(
    mapData ? mapData.jpg_item_path : null,
  );
  const { apiData: map, loading } = hooks.useGetApiWithNone(
    API_PATH.GET_ALL_MAP,
  );

  useEffect(() => {
    if (map) {
      const newMap = map.filter((item) => {
        return item.id === params.mapId;
      })[0];
      setMapData(newMap);
      setSubMap(newMap.sub);
    }
  }, [params, loading]);

  const onClickSubMap = (value) => {
    setMapData(value);
    if (value.depth === 1) {
      setSubMap(value.sub);
    }
  };

  if (!mapData || loading) return null;

  return (
    <PageParent>
      {viewItemList && (
        <ItemSelector
          originItemList={mapData.jpg_item_path}
          viewItemList={viewItemList}
          onClickItem={onClickItem}
          onClickAllItem={onClickAllItem}
        />
      )}
      <LinkSelector
        itemList={hooks.useColumnListByJson(allColumn, COLUMN_KEY.map, true)}
        itemDesc="name_kr"
        itemLink="link"
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
            mapId={mapData.id}
          />
        )}
        <Stack spacing={4}>
          <Text as={'b'} color={ALL_COLOR.WHITE}>
            2D MAP
          </Text>
          <JpgView map={mapData} viewItemList={viewItemList} />
          <br />
          <Text as={'b'} color={ALL_COLOR.WHITE}>
            3D MAP
          </Text>
          <ThreeView
            key={mapData.id}
            map={mapData}
            viewItemList={viewItemList}
          />
        </Stack>
      </Box>
    </PageParent>
  );
};

export default Map;
