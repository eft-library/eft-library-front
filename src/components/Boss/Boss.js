import BossSelector from 'src/components/Boss/BossSelector/BossSelector';
import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';
import BossDetail from 'src/components/Boss/BossDetail/BossDetail';
import BossContent from 'src/components/Boss/BossContent/BossContent';
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
      <BossSelector bossList={boss} onClickBoss={onClickBoss} bossId={bossId} />
      <BossDetail bossList={boss} bossId={bossId} />
      <BossContent bossList={boss} bossId={bossId} />
    </PageParent>
  );
};

export default Boss;
