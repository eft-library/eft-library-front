import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';
import API_PATH from 'src/api/api_path';
import hooks from 'src/hooks/hooks';
import { Box } from '@chakra-ui/react';
import RigDetail from './RigDetail/RigDetail';

const Rig = () => {
  const { apiData: rigList, loading } = hooks.useGetApiWithNone(
    API_PATH.GET_ALL_RIG,
  );

  if (!rigList || loading) return null;

  return (
    <PageParent>
      <SubHeader title="전술 조끼" />
      <Box mb={10} />
      <RigDetail rigList={rigList} />
    </PageParent>
  );
};

export default Rig;
