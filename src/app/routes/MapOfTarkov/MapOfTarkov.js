import PageParent from 'src/components/PageParent/PageParent';
import SubHeader from 'src/components/SubHeader/SubHeader';
import { useParams } from 'react-router-dom';
import hooks from 'src/hooks/hooks';
import API_PATH from 'src/api/api_path';
import LinkSelector from 'src/components/LinkSelector/LinkSelector';
import MapOfTarkovDetail from './MapOfTarkovDetail/MapOfTarkovDetail';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { useStore } from 'src/stores/store';

const MapOfTarkov = () => {
  const { allColumn } = useStore();
  const params = useParams();
  const { apiData: mapOfTarkov, loading } = hooks.useGetApiWithParam(
    API_PATH.GET_MAP_OF_TARKOV,
    params.mapId,
  );

  const columnList = (columnObj) => {
    const col = columnObj.find(
      (item) => item.column_id === COLUMN_KEY.mapOfTarkov,
    ).column_json_value;
    col.sort((a, b) => a.map_order - b.map_order);
    return col;
  };

  if (!mapOfTarkov || loading) return null;

  return (
    <PageParent>
      <SubHeader title="지도" />
      <LinkSelector
        itemList={columnList(allColumn)}
        itemDesc="map_name_kr"
        itemLink="map_link"
        mt={6}
      />
      <MapOfTarkovDetail mapOfTarkov={mapOfTarkov} />
    </PageParent>
  );
};

export default MapOfTarkov;
