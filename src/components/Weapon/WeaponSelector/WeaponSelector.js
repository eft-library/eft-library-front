import { Box, SimpleGrid, Text, Flex } from '@chakra-ui/react';
import { MAIN_COLOR, MAP_COLOR } from 'src/utils/consts/colorConsts';
import { WEAPON_TYPE } from 'src/utils/consts/weaponConsts';
import PropTypes from 'prop-types';

const WeaponSelector = ({ category, onClickCategory }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={'center'}
      mb={14}
      mt={10}
    >
      <SimpleGrid columns={[2, null, 7]} spacing={4}>
        {WEAPON_TYPE.map((item, index) => (
          <Flex
            flexDirection={'column'}
            key={index}
            onClick={() => onClickCategory(item.value)}
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
              bg={category === item.value ? MAP_COLOR.MAP_LIGHT_GRAY : ''}
            >
              <Text
                color={'white'}
                textAlign={'center'}
                mt={'2'}
                fontWeight={700}
              >
                {item.desc_kr}
              </Text>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

WeaponSelector.propTypes = {
  category: PropTypes.string,
  onClickCategory: PropTypes.func,
};

export default WeaponSelector;
