import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';
import BossDetail from '../Boss/BossDetail/BossDetail';
import BossContent from '../Boss/BossContent/BossContent';
import ContentsSelector from 'src/components/ContentsSelector/ContentsSelecor';
import { useStore } from 'src/stores/store';
import hooks from 'src/hooks/hooks';
import { Box } from '@chakra-ui/react';
import API_PATH from 'src/api/api_path';

const Boss = () => {
  const { apiData: boss, loading } = hooks.useGetApiWithNone(
    API_PATH.GET_ALL_BOSS,
  );

  const { bossId, setBossId } = useStore();

  const onClickBoss = (bossValue) => {
    setBossId(bossValue);
  };

  if (!boss || loading) return null;

  return (
    <PageParent>
      <SubHeader title="보스" />
      <ContentsSelector
        onClickEvent={onClickBoss}
        itemList={boss}
        currentId={bossId}
        selectorId={'id'}
        itemDesc="name_kr"
      />
      <Box w={'95%'}>
        <BossDetail bossList={boss} bossId={bossId} />
      </Box>
      <BossContent bossList={boss} bossId={bossId} />
    </PageParent>
  );
};

export default Boss;
