import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';
import RenderWeapon from './RenderWeapon';
import RenderKnife from './RenderKnife';
import RenderSpecial from './RenderSpecial';
import RenderThrowable from './RenderThrowable';
import RenderStationary from './RenderStationary';
import { Box } from '@chakra-ui/react';

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
      <RenderWeapon gunList={weapon.gun} category={category} />
      <RenderSpecial specialList={weapon.gun} category={category} />
      <RenderStationary stationaryList={weapon.gun} category={category} />
      <RenderKnife knifeList={weapon.knife} category={category} />
      <RenderThrowable throwableList={weapon.throwable} category={category} />
    </Box>
  );
};

WeaponDetail.propTypes = {
  category: PropTypes.string,
};

export default WeaponDetail;
