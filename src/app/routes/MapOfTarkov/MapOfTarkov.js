import PageParent from 'src/components/PageParent/PageParent';
import SubHeader from 'src/components/SubHeader/SubHeader';
import { useParams } from 'react-router-dom';

const MapOfTarkov = () => {
  const params = useParams();
  <PageParent>
    <SubHeader title="지도" />
  </PageParent>;
};

export default MapOfTarkov;
