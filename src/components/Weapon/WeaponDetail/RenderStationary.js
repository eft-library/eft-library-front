import { Box, SimpleGrid, Text, Image } from '@chakra-ui/react';
import { STATIONARY_COLUMN } from 'src/utils/weaponConstants';
import PropTypes from 'prop-types';
import TextValue from './TextValue';

const RenderStationary = ({ stationaryList, category }) => {
  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (item) => {
    const isGeneralCategory = item.weapon_category === 'Stationary weapons';
    const isMatchingCategory =
      item.weapon_category === 'Stationary weapons' || category === 'ALL';
    return isGeneralCategory && isMatchingCategory;
  };
  return (
    <>
      <SimpleGrid
        columns={[2, null, 5]}
        spacing={2}
        width={'90%'}
        outline={'1px solid'}
        outlineColor={'white'}
        borderRadius={'lg'}
        p={2}
        mb={6}
      >
        {STATIONARY_COLUMN.map((item, index) => (
          <Text color={'white'} key={index} textAlign={'center'}>
            {item}
          </Text>
        ))}
      </SimpleGrid>
      {stationaryList.map((item, index) =>
        shouldRenderWeapon(item) ? (
          <SimpleGrid
            columns={[2, null, 5]}
            spacing={2}
            width={'90%'}
            outline={'1px solid'}
            outlineColor={'white'}
            borderRadius={'lg'}
            p={2}
            mb={4}
            key={index}
          >
            <Image src={item.weapon_img} bg={'white'} />
            <TextValue value={item.weapon_short_name} />
            <TextValue value={item.weapon_default_ammo} />
            <Box
              w={'100%'}
              h={'100%'}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection={'column'}
            >
              {item.weapon_modes_kr.map((mode, mIndex) => (
                <Text key={mIndex} color="white" textAlign="center">
                  {mode}
                </Text>
              ))}
            </Box>
            <TextValue value={item.weapon_fire_rate} />
          </SimpleGrid>
        ) : null,
      )}
    </>
  );
};

RenderStationary.propTypes = {
  stationaryList: PropTypes.array,
  category: PropTypes.string,
};

export default RenderStationary;
