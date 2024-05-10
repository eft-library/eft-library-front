import { Box, SimpleGrid, Text, Flex } from '@chakra-ui/react';
import { MAIN_COLOR, MAP_COLOR } from 'src/utils/colorConstants';
import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';

const WeaponSelector = () => {
  const weap = [
    '전체',
    '카빈 소총',
    '돌격 소총',
    '경기관총',
    '기관단총',
    '볼트액션 소총',
    '지정사수 소총',
    '산탄총',
    '유탄발사기',
    '권총',
    '거치식 화기',
    '근접 무기',
    '투척 무기',
    '특수 무기',
  ];
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={'center'}
      mb={14}
      mt={10}
    >
      <SimpleGrid columns={[2, null, 7]} spacing={4}>
        {weap.map((item, index) => (
          <Flex flexDirection={'column'} key={index}>
            <Box
              cursor={'pointer'}
              w="110px"
              h="40px"
              color={'white'}
              outline={'1px solid'}
              outlineColor={MAIN_COLOR.MAIN_WHITE}
              borderRadius={'lg'}
              _hover={{ bg: MAP_COLOR.MAP_LIGHT_GRAY }}
            >
              <Text color={'white'} textAlign={'center'} mt={'2'}>
                {item}
              </Text>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default WeaponSelector;
