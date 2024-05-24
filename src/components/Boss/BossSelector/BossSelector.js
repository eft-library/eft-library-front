import { Box, SimpleGrid, Flex } from '@chakra-ui/react';
import { MAIN_COLOR, MAP_COLOR } from 'src/utils/consts/colorConsts';
import PropTypes from 'prop-types';
import CustomText from 'src/components/CustomText/CustomText';

const BossSelector = ({ bossList, bossId, onClickBoss }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={'center'}
      mb={14}
      mt={10}
    >
      <SimpleGrid columns={[2, null, 7]} spacing={4}>
        {bossList.map((boss, index) => (
          <Flex
            flexDirection={'column'}
            key={index}
            onClick={() => onClickBoss(boss.boss_id)}
          >
            <Box
              cursor={'pointer'}
              w="110px"
              h="40px"
              color={'white'}
              outline={'1px solid'}
              outlineColor={MAIN_COLOR.MAIN_WHITE}
              borderRadius={'lg'}
              _hover={{ bg: MAP_COLOR.MAP_LIGHT_GRAY }}
              bg={bossId === boss.boss_id ? MAP_COLOR.MAP_LIGHT_GRAY : ''}
            >
              <CustomText mt={2}>{boss.boss_name_kr}</CustomText>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

BossSelector.propTypes = {
  bossList: PropTypes.array,
  bossId: PropTypes.string,
  onClickBoss: PropTypes.func,
};

export default BossSelector;
