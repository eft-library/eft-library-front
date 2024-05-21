import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';
import RenderWeapon from './RenderWeapon';
import RenderKnife from './RenderKnife';
import RenderSpecial from './RenderSpecial';
import RenderThrowable from './RenderThrowable';
import RenderStationary from './RenderStationary';
import { Box } from '@chakra-ui/react';
import { GUN_CATEGORY_LIST } from 'src/utils/weaponConstants';

const WeaponDetail = ({ category }) => {
  const { weapon, loading } = hooks.useGetAllWeapon();

  if (!weapon || loading) return null;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={'center'}
      width={'100%'}
      flexDirection={'column'}
    >
      {(category === 'ALL' || GUN_CATEGORY_LIST.includes(category)) && (
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
