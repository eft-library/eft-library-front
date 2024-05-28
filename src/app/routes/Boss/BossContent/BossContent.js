import { Box, Image, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import DividerContents from 'src/components/DividerContents/DividerContents';

const BossContent = ({ bossList, bossId }) => {
  let bossInfo = bossList.find((boss) => boss.boss_id == bossId);

  return (
    <Box w={'95%'}>
      <DividerContents headText="위치">
        <Box>
          <Text
            mb={1}
            dangerouslySetInnerHTML={{
              __html: `${bossInfo.boss_location_guide}`,
            }}
          />
        </Box>
      </DividerContents>
      <DividerContents headText="피통">
        <Box display={'flex'} alignItems={'center'}>
          {bossInfo.boss_health_img_path.map((boss, index) => (
            <Image key={index} src={boss} ml={index !== 0 ? 10 : 0} />
          ))}
        </Box>
      </DividerContents>
      <DividerContents headText="전리품">
        <Box display={'flex'} alignItems={'center'}>
          {bossInfo.boss_loot.map((boss, index) => (
            <Image key={index} src={boss} ml={index !== 0 ? 10 : 0} />
          ))}
        </Box>
      </DividerContents>
    </Box>
  );
};

BossContent.propTypes = {
  bossList: PropTypes.array,
  bossId: PropTypes.string,
};

export default BossContent;