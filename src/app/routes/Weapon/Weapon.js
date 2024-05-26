import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';
import WeaponDetail from '../Weapon/WeaponDetail/WeaponDetail';
import ContentsSelector from 'src/components/ContentsSelector/ContentsSelecor';
import { useWeaponStore } from 'src/stores/store';
import hooks from 'src/hooks/hooks';
import API_PATH from 'src/api/api_path';

const Weapon = () => {
  const { weaponCategory, setWeaponCategory } = useWeaponStore();
  const { column, loading } = hooks.useGetColumn(
    API_PATH.GET_COLUMN + '/WEAPON',
  );

  const onClickCategory = (weaponCategory) => {
    setWeaponCategory(weaponCategory);
  };

  const columnList = (columnObj) => {
    return columnObj.find((item) => item.column_id === 'WEAPON_TYPE')
      .column_json_value;
  };

  if (!column || loading) return null;

  return (
    <PageParent>
      <SubHeader title="무기" />
      <ContentsSelector
        onClickEvent={onClickCategory}
        itemList={columnList(column)}
        currentId={weaponCategory}
        selectorId={'value'}
        itemDesc={'desc_kr'}
      />
      <WeaponDetail category={weaponCategory} />
    </PageParent>
  );
};

export default Weapon;
