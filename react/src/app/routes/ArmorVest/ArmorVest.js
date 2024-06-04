import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';
import API_PATH from 'src/api/api_path';
import hooks from 'src/hooks/hooks';
import { Box } from '@chakra-ui/react';
import ArmorVestDetail from './ArmorVestDetail/ArmorVestDetail';

const ArmorVest = () => {
  const { apiData: armorVestList, loading } = hooks.useGetApiWithNone(
    API_PATH.GET_ALL_ARMOR_VEST,
  );

  if (!armorVestList || loading) return null;

  return (
    <PageParent>
      <SubHeader title="방탄 조끼" />
      <Box mb={10} />
      <ArmorVestDetail armorVestList={armorVestList} />
    </PageParent>
  );
};

export default ArmorVest;
