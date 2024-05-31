import PageParent from 'src/components/PageParent/PageParent';
import SubHeader from 'src/components/SubHeader/SubHeader';
import { useParams } from 'react-router-dom';
import hooks from 'src/hooks/hooks';
import API_PATH from 'src/api/api_path';
import LinkSelector from 'src/components/LinkSelector/LinkSelector';
import MapOfTarkovDetail from './MapOfTarkovDetail/MapOfTarkovDetail';

const MapOfTarkov = () => {
  const params = useParams();
  const { apiData: mapOfTarkov, loading } = hooks.useGetApiWithParam(
    API_PATH.GET_MAP_OF_TARKOV,
    params.mapId,
  );
  const { apiData: column, loading: columnLoading } = hooks.useGetApiWithNone(
    API_PATH.GET_COLUMN + '/MAP_OF_TARKOV',
  );

  const columnList = (columnObj) => {
    const col = columnObj.find(
      (item) => item.column_id === 'MAP_OF_TARKOV_COLUMN',
    ).column_json_value;
    col.sort((a, b) => a.map_order - b.map_order);
    return col;
  };

  if (!mapOfTarkov || !column || loading || columnLoading) return null;

  return (
    <PageParent>
      <SubHeader title="지도" />
      <LinkSelector
        itemList={columnList(column)}
        itemDesc="map_name_kr"
        itemLink="map_link"
        mt={6}
      />
      <MapOfTarkovDetail mapOfTarkov={mapOfTarkov} />
    </PageParent>
  );
};

export default MapOfTarkov;
