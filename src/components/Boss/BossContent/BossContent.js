import { Box } from '@chakra-ui/react';
import BossSpawn from 'src/components/Boss/BossContent/BossSpawn/BossSpawn';
import BossHP from 'src/components/Boss/BossContent/BossHP/BossHP';
import BossLoot from 'src/components/Boss/BossContent/BossLoot/BossLoot';

const BossContent = () => {
  // boss 자세한 데이터 요청 및 가져오기
  // 가져올 때 값은 props로 필터링
  return (
    <Box w={'95%'}>
      <BossSpawn />
      <BossHP />
      <BossLoot />
    </Box>
  );
};

export default BossContent;
