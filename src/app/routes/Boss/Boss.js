import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';
import BossDetail from '../Boss/BossDetail/BossDetail';
import BossContent from '../Boss/BossContent/BossContent';
import ContentsSelector from 'src/components/ContentsSelector/ContentsSelecor';
import { useBossStore } from 'src/stores/store';
import hooks from 'src/hooks/hooks';

const Boss = () => {
  const { boss, loading } = hooks.useGetAllBoss();

  const { bossId, setBossId } = useBossStore();

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
        selectorId={'boss_id'}
        itemDesc="boss_name_kr"
      />
      <BossDetail bossList={boss} bossId={bossId} />
      <BossContent bossList={boss} bossId={bossId} />
    </PageParent>
  );
};

export default Boss;
