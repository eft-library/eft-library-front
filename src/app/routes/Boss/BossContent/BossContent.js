import { Box } from '@chakra-ui/react';
import BossSpawn from '../BossContent/BossSpawn/BossSpawn';
import BossHP from '../BossContent/BossHP/BossHP';
import BossLoot from '../BossContent/BossLoot/BossLoot';
import PropTypes from 'prop-types';

const BossContent = ({ bossList, bossId }) => {
  let bossInfo = bossList.find((boss) => boss.boss_id == bossId);

  return (
    <Box w={'95%'}>
      <BossSpawn bossSpawn={bossInfo.boss_location_guide} />
      <BossHP bossHP={bossInfo.boss_health_img_path} />
      <BossLoot bossLoot={bossInfo.boss_loot} />
    </Box>
  );
};

BossContent.propTypes = {
  bossList: PropTypes.array,
  bossId: PropTypes.string,
};

export default BossContent;
