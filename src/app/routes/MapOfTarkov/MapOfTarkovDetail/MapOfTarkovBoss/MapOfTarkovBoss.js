import { Box, Heading, Divider } from '@chakra-ui/react';
import BossDetail from 'src/app/routes/Boss/BossDetail/BossDetail';
import PropTypes from 'prop-types';

const MapOfTarkovBoss = ({ bossList }) => {
  return (
    <Box mb={20}>
      <Heading as={'h3'} size={'lg'} color={'white'} mb={3}>
        보스
      </Heading>
      <Divider borderColor={'white'} borderWidth={1} mb={4} />
      <BossDetail bossList={bossList} bossId={true} />
    </Box>
  );
};

MapOfTarkovBoss.propTypes = {
  bossList: PropTypes.array,
};

export default MapOfTarkovBoss;
