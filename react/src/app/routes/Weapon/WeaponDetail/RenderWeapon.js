import { Box, SimpleGrid, Text, Image, GridItem } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import GridCenterText from '../../../../components/GridText/GridCenterText';
import GridContents from 'src/components/GridContents/GridContents';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { useStore } from 'src/stores/store';
import hooks from 'src/hooks/hooks';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const RenderWeapon = ({ gunList, category }) => {
  const { allColumn } = useStore();

  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (item) => {
    const isGeneralCategory =
      item.category !== 'Special weapons' &&
      item.category !== 'Stationary weapons';
    const isMatchingCategory = item.category === category || category === 'ALL';
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
        outlineColor={ALL_COLOR.WHITE}
        borderRadius={'lg'}
        boxShadow="0 0 14px rgb(202, 238, 18, 0.7)"
        p={2}
        mb={6}
      >
        {hooks
          .useColumnListByKr(allColumn, COLUMN_KEY.weapon)
          .map((item, index) => (
            <GridItem key={index} colSpan={index === 0 ? 2 : 1}>
              <Text
                color={ALL_COLOR.WHITE}
                key={index}
                textAlign={'center'}
                fontWeight={700}
                textShadow={ALL_COLOR.YELLOW_SHADOW}
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
                <Image src={item.image} maxH={'200px'} />
              </Box>
            </GridItem>
            <GridCenterText value={item.short_name} />
            <GridCenterText value={sliceDefaultAmmo(item.default_ammo)} />
            <Box
              w={'100%'}
              h={'100%'}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection={'column'}
            >
              {item.modes_kr.map((mode, mIndex) => (
                <Text key={mIndex} color={ALL_COLOR.WHITE} textAlign="center">
                  {mode}
                </Text>
              ))}
            </Box>
            <GridCenterText value={item.fire_rate} />
            <GridCenterText value={item.ergonomics} />
            <GridCenterText value={item.recoil_horizontal} />
            <GridCenterText value={item.recoil_vertical} />
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
