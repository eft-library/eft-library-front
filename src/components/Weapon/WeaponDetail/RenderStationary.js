import { Box, Text, Image } from '@chakra-ui/react';
import { STATIONARY_COLUMN } from 'src/utils/consts/weaponConsts';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridTitle from './GridTitle';
import GridContents from './GridContents';

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
      <GridTitle columnDesign={[2, null, 5]} column={STATIONARY_COLUMN} />
      {stationaryList.map((item, index) =>
        shouldRenderWeapon(item) ? (
          <GridContents columnDesign={[2, null, 5]} key={index}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Image
                src={process.env.REACT_APP_NAS_URL + item.weapon_img}
                maxH={'200px'}
              />
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
                <Text key={mIndex} color="white" textAlign="center">
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
