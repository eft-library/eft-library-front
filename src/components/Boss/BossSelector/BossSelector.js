import { Box, SimpleGrid, Text, Flex } from '@chakra-ui/react';
import { MAIN_COLOR, MAP_COLOR } from 'src/utils/colorConstants';
import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';

const BossSelector = () => {
  const weap = [
    '르살라',
    '타길라',
    '카반',
    '콜론테이',
    '킬라',
    '글루하',
    '슈트르만',
    '세니타',
    '지랴키',
    '군주',
    '컬티스트',
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

export default BossSelector;
