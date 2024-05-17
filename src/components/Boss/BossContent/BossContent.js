import { Box } from '@chakra-ui/react';
import BossSpawn from 'src/components/Boss/BossContent/BossSpawn/BossSpawn';
import BossHP from 'src/components/Boss/BossContent/BossHP/BossHP';
import BossLoot from 'src/components/Boss/BossContent/BossLoot/BossLoot';

const BossContent = () => {
  return (
    <Box w={'95%'}>
      <BossSpawn />
      <BossHP />
      <BossLoot />
    </Box>
  );
};

export default BossContent;
