import { Box, SimpleGrid, Text, Image, GridItem } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridContents from 'src/components/GridContents/GridContents';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { useStore } from 'src/stores/store';

const RenderWeapon = ({ gunList, category }) => {
  const { allColumn } = useStore();

  const columnList = (columnObj) => {
    return columnObj.find((item) => item.column_id === COLUMN_KEY.weapon)
      .column_value_kr;
  };

  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (item) => {
    const isGeneralCategory =
      item.weapon_category !== 'Special weapons' &&
      item.weapon_category !== 'Stationary weapons';
    const isMatchingCategory =
      item.weapon_category === category || category === 'ALL';
    return isGeneralCategory && isMatchingCategory;
  };

  // 무기 문자열 자르기
  const sliceDefaultAmmo = (defaultAmmo) => {
    const pattern = 'mm';
    const handGunPattern = 'ACP';

    const index = defaultAmmo.indexOf(pattern);
    const handGunIndex = defaultAmmo.indexOf(handGunPattern);

    if (index !== -1) {
      return defaultAmmo.substring(0, index + pattern.length);
    } else if (handGunIndex !== -1) {
      return defaultAmmo.substring(0, handGunIndex + handGunPattern.length);
    } else {
      return defaultAmmo;
    }
  };

  return (
    <>
      <SimpleGrid
        columns={[2, null, 9]}
        spacing={2}
        width={'95%'}
        outline={'2px solid'}
        outlineColor={'white'}
        borderRadius={'lg'}
        boxShadow="0 0 14px rgb(202, 238, 18, 0.7)"
        p={2}
        mb={6}
      >
        {columnList(allColumn).map((item, index) => (
          <GridItem key={index} colSpan={index === 0 ? 2 : 1}>
            <Text
              color={'white'}
              key={index}
              textAlign={'center'}
              fontWeight={700}
              textShadow="0px 1px 1px rgb(202, 238, 18, 0.7)"
            >
              {item}
            </Text>
          </GridItem>
        ))}
      </SimpleGrid>
      {gunList.map((item, index) =>
        shouldRenderWeapon(item) ? (
          <GridContents columnDesign={[2, null, 9]} key={index}>
            <GridItem colSpan={2}>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Image src={item.weapon_img} maxH={'200px'} />
              </Box>
            </GridItem>
            <TextValue value={item.weapon_short_name} />
            <TextValue value={sliceDefaultAmmo(item.weapon_default_ammo)} />
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
          </GridContents>
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
