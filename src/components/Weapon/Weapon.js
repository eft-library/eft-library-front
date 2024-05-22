import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';
import WeaponSelector from 'src/components/Weapon/WeaponSelector/WeaponSelector';
import WeaponDetail from 'src/components/Weapon/WeaponDetail/WeaponDetail';
import { useWeaponStore } from 'src/stores/store';
const Weapon = () => {
  const { weaponCategory, setWeaponCategory } = useWeaponStore();

  const onClickCategory = (weaponCategory) => {
    setWeaponCategory(weaponCategory);
  };

  return (
    <PageParent>
      <SubHeader title="무기" />
      <WeaponSelector
        category={weaponCategory}
        onClickCategory={onClickCategory}
      />
      <WeaponDetail category={weaponCategory} />
    </PageParent>
  );
};

export default Weapon;
