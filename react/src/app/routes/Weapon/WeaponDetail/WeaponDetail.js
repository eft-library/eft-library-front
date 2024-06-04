import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';
import RenderWeapon from './RenderWeapon';
import RenderKnife from './RenderKnife';
import RenderSpecial from './RenderSpecial';
import RenderThrowable from './RenderThrowable';
import RenderStationary from './RenderStationary';
import { Box } from '@chakra-ui/react';
import API_PATH from 'src/api/api_path';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { useStore } from 'src/stores/store';

const WeaponDetail = ({ category }) => {
  const { allColumn } = useStore();

  const { apiData: weapon, loading } = hooks.useGetApiWithNone(
    API_PATH.GET_ALL_WEAPON,
  );

  const checkGunInclude = () => {
    const gunCategoryList = allColumn.find(
      (item) => item.id === COLUMN_KEY.gun,
    ).value_kr;

    return gunCategoryList.includes(category);
  };

  if (!weapon || loading) return null;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={'center'}
      width={'100%'}
      flexDirection={'column'}
    >
      {(category === 'ALL' || checkGunInclude()) && (
        <>
          <RenderWeapon gunList={weapon.gun} category={category} />
          <Box mb={20} />
        </>
      )}
      {(category === 'ALL' || category === 'Special weapons') && (
        <>
          <RenderSpecial specialList={weapon.gun} category={category} />
          <Box mb={20} />
        </>
      )}
      {(category === 'ALL' || category === 'Stationary weapons') && (
        <>
          <RenderStationary stationaryList={weapon.gun} category={category} />
          <Box mb={20} />
        </>
      )}
      {(category === 'ALL' || category === 'Knife') && (
        <>
          <RenderKnife knifeList={weapon.knife} />
          <Box mb={20} />
        </>
      )}
      {(category === 'ALL' || category === 'Throwable weapon') && (
        <>
          <RenderThrowable throwableList={weapon.throwable} />
        </>
      )}
    </Box>
  );
};

WeaponDetail.propTypes = {
  category: PropTypes.string,
};

export default WeaponDetail;
