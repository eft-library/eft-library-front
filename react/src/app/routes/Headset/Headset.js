import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';
import HeadSetDetail from './HeadsetDetail/HeadsetDetail';
import API_PATH from 'src/api/api_path';
import hooks from 'src/hooks/hooks';
import { Box } from '@chakra-ui/react';

const Headset = () => {
  const { apiData: headsetList, loading } = hooks.useGetApiWithNone(
    API_PATH.GET_ALL_HEADSET,
  );

  if (!headsetList || loading) return null;

  return (
    <PageParent>
      <SubHeader title="헤드셋" />
      <Box mb={10} />
      <HeadSetDetail headsetList={headsetList} />
    </PageParent>
  );
};

export default Headset;
