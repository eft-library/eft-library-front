import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';
import WeaponDetail from 'src/components/Weapon/WeaponDetail/WeaponDetail';
import ContentsSelector from '../ContentsSelector/ContentsSelecor';
import { useWeaponStore } from 'src/stores/store';
import { WEAPON_TYPE } from 'src/utils/consts/weaponConsts';

const Weapon = () => {
  const { weaponCategory, setWeaponCategory } = useWeaponStore();

  const onClickCategory = (weaponCategory) => {
    setWeaponCategory(weaponCategory);
  };

  return (
    <PageParent>
      <SubHeader title="무기" />
      <ContentsSelector
        onClickEvent={onClickCategory}
        itemList={WEAPON_TYPE}
        currentId={weaponCategory}
        selectorId={'value'}
        itemDesc={'desc_kr'}
      />
      <WeaponDetail category={weaponCategory} />
    </PageParent>
  );
};

export default Weapon;
