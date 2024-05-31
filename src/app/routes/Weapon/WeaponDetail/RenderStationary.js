import { Box, Text, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridTitle from 'src/components/GridTitle/GridTitle';
import GridContents from 'src/components/GridContents/GridContents';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { useStore } from 'src/stores/store';
import hooks from 'src/hooks/hooks';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const RenderStationary = ({ stationaryList, category }) => {
  const { allColumn } = useStore();

  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (item) => {
    const isGeneralCategory = item.weapon_category === 'Stationary weapons';
    const isMatchingCategory =
      item.weapon_category === 'Stationary weapons' || category === 'ALL';
    return isGeneralCategory && isMatchingCategory;
  };

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={hooks.useColumnListByKr(allColumn, COLUMN_KEY.stationary)}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {stationaryList.map((item, index) =>
        shouldRenderWeapon(item) ? (
          <GridContents columnDesign={[2, null, 5]} key={index}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Image src={hooks.useImageLink(item.weapon_img)} maxH={'200px'} />
            </Box>
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
                <Text key={mIndex} color={ALL_COLOR.WHITE} textAlign="center">
                  {mode}
                </Text>
              ))}
            </Box>
            <TextValue value={item.weapon_fire_rate} />
          </GridContents>
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
