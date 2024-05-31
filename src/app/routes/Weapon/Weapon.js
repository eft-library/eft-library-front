import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';
import WeaponDetail from '../Weapon/WeaponDetail/WeaponDetail';
import ContentsSelector from 'src/components/ContentsSelector/ContentsSelecor';
import { useStore } from 'src/stores/store';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import hooks from 'src/hooks/hooks';

const Weapon = () => {
  const { allColumn, weaponCategory, setWeaponCategory } = useStore();

  const onClickCategory = (weaponCategory) => {
    setWeaponCategory(weaponCategory);
  };

  return (
    <PageParent>
      <SubHeader title="무기" />
      <ContentsSelector
        onClickEvent={onClickCategory}
        itemList={hooks.useColumnListByJson(
          allColumn,
          COLUMN_KEY.weaponType,
          false,
        )}
        currentId={weaponCategory}
        selectorId={'value'}
        itemDesc={'desc_kr'}
      />
      <WeaponDetail category={weaponCategory} />
    </PageParent>
  );
};

export default Weapon;
