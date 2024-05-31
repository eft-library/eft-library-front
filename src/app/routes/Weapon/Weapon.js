import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';
import WeaponDetail from '../Weapon/WeaponDetail/WeaponDetail';
import ContentsSelector from 'src/components/ContentsSelector/ContentsSelecor';
import { useWeaponStore } from 'src/stores/store';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { useColumnStore } from 'src/stores/store';

const Weapon = () => {
  const { allColumn } = useColumnStore();
  const { weaponCategory, setWeaponCategory } = useWeaponStore();

  const onClickCategory = (weaponCategory) => {
    setWeaponCategory(weaponCategory);
  };

  const columnList = (columnObj) => {
    return columnObj.find((item) => item.column_id === COLUMN_KEY.weaponType)
      .column_json_value;
  };

  return (
    <PageParent>
      <SubHeader title="무기" />
      <ContentsSelector
        onClickEvent={onClickCategory}
        itemList={columnList(allColumn)}
        currentId={weaponCategory}
        selectorId={'value'}
        itemDesc={'desc_kr'}
      />
      <WeaponDetail category={weaponCategory} />
    </PageParent>
  );
};

export default Weapon;
