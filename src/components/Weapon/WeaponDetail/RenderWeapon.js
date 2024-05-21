import { Box, SimpleGrid, Text, Image, GridItem } from '@chakra-ui/react';
import { WEAOPN_COLUMN } from 'src/utils/weaponConstants';
import PropTypes from 'prop-types';
import TextValue from './TextValue';

const RenderWeapon = ({ gunList, category }) => {
  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (item) => {
    const isGeneralCategory =
      item.weapon_category !== 'Special weapons' &&
      item.weapon_category !== 'Stationary weapons';
    const isMatchingCategory =
      item.weapon_category === category || category === 'ALL';
    return isGeneralCategory && isMatchingCategory;
  };

  return (
    <>
      <SimpleGrid
        columns={[2, null, 9]}
        spacing={2}
        width={'90%'}
        outline={'1px solid'}
        outlineColor={'white'}
        borderRadius={'lg'}
        p={2}
        mb={6}
      >
        {WEAOPN_COLUMN.map((item, index) => (
          <GridItem key={index} colSpan={index === 0 ? 2 : 1}>
            <Text color={'white'} key={index} textAlign={'center'}>
              {item}
            </Text>
          </GridItem>
        ))}
      </SimpleGrid>
      {gunList.map((item, index) =>
        shouldRenderWeapon(item) ? (
          <SimpleGrid
            columns={[2, null, 9]}
            spacing={2}
            width={'90%'}
            outline={'1px solid'}
            outlineColor={'white'}
            borderRadius={'lg'}
            p={2}
            mb={4}
            key={index}
          >
            <GridItem colSpan={2}>
              <Image src={item.weapon_img} />
            </GridItem>
            <TextValue value={item.weapon_short_name} />
            <TextValue value={item.weapon_carliber} />
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
            <TextValue value={item.weapon_ergonomics} />
            <TextValue value={item.weapon_recoil_horizontal} />
            <TextValue value={item.weapon_recoil_vertical} />
          </SimpleGrid>
        ) : null,
      )}
    </>
  );
};

RenderWeapon.propTypes = {
  gunList: PropTypes.array,
  category: PropTypes.string,
};

export default RenderWeapon;
