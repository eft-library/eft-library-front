import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';
import RenderWeapon from './RenderWeapon';
import RenderKnife from './RenderKnife';
import RenderSpecial from './RenderSpecial';
import RenderThrowable from './RenderThrowable';
import RenderStationary from './RenderStationary';
import { Box } from '@chakra-ui/react';
import API_PATH from 'src/api/api_path';

const WeaponDetail = ({ category }) => {
  const { weapon, loading } = hooks.useGetAllWeapon();
  const { column: columnData, loading: columnLoading } = hooks.useGetColumn(
    API_PATH.GET_WEAPON_COLUMN,
  );

  const checkGunInclude = () => {
    const gunCategoryList = columnData.find(
      (item) => item.column_id === 'GUN_CATEGORY_INFO',
    ).column_value_kr;

    return gunCategoryList.includes(category);
  };

  if (!weapon || !columnData || loading || columnLoading) return null;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={'center'}
      width={'100%'}
      flexDirection={'column'}
    >
      {(category === 'ALL' || checkGunInclude()) && (
        <RenderWeapon gunList={weapon.gun} category={category} />
      )}
      {(category === 'ALL' || category === 'Special weapons') && (
        <RenderSpecial specialList={weapon.gun} category={category} />
      )}
      {(category === 'ALL' || category === 'Stationary weapons') && (
        <RenderStationary stationaryList={weapon.gun} category={category} />
      )}
      {(category === 'ALL' || category === 'Knife') && (
        <RenderKnife knifeList={weapon.knife} />
      )}
      {(category === 'ALL' || category === 'Throwable weapon') && (
        <RenderThrowable throwableList={weapon.throwable} />
      )}
    </Box>
  );
};

WeaponDetail.propTypes = {
  category: PropTypes.string,
};

export default WeaponDetail;
