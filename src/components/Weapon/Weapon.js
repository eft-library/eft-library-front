import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';
import WeaponSelector from 'src/components/Weapon/WeaponSelector/WeaponSelector';
import WeaponDetail from 'src/components/Weapon/WeaponDetail/WeaponDetail';

const Weapon = () => {
  return (
    <PageParent>
      <SubHeader title="무기" />
      <WeaponSelector />
      <WeaponDetail />
    </PageParent>
  );
};

export default Weapon;
