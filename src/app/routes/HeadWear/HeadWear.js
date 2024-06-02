import SubHeader from 'src/components/SubHeader/SubHeader';
import { Box } from '@chakra-ui/react';
import PageParent from 'src/components/PageParent/PageParent';
import API_PATH from 'src/api/api_path';
import hooks from 'src/hooks/hooks';
import HeadWearDetail from './HeadWearDetail/HeadWearDetail';

const HeadWear = () => {
  const { apiData: headWearList, loading } = hooks.useGetApiWithNone(
    API_PATH.GET_ALL_HEAD_WEAR,
  );

  if (!headWearList || loading) return null;

  return (
    <PageParent>
      <SubHeader title="방탄모" />
      <Box mb={10} />
      <HeadWearDetail headWearList={headWearList} />
    </PageParent>
  );
};

export default HeadWear;
