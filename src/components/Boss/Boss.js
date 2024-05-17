import BossSelector from 'src/components/Boss/BossSelector/BossSelector';
import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';
import BossDetail from 'src/components/Boss/BossDetail/BossDetail';
import BossContent from 'src/components/Boss/BossContent/BossContent';
import { useBossStore } from 'src/config/store';

const Boss = () => {
  const { bossId, setBossId } = useBossStore();

  const onClickBoss = (bossValue) => {
    setBossId(bossValue);
  };

  return (
    <PageParent>
      <SubHeader title="보스" />
      <BossSelector />
      <BossDetail />
      <BossContent />
    </PageParent>
  );
};

export default Boss;
