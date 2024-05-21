import { Image, Box } from '@chakra-ui/react';
import { SPECIAL_COLUMN } from 'src/utils/weaponConstants';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridTitle from './GridTitle';
import GridContents from './GridContents';

const RenderSpecial = ({ specialList, category }) => {
  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (item) => {
    const isGeneralCategory = item.weapon_category === 'Special weapons';
    const isMatchingCategory =
      item.weapon_category === 'Special weapons' || category === 'ALL';
    return isGeneralCategory && isMatchingCategory;
  };

  return (
    <>
      <GridTitle columnDesign={[2, null, 2]} column={SPECIAL_COLUMN} />
      {specialList.map((item, index) =>
        shouldRenderWeapon(item) ? (
          <GridContents columnDesign={[2, null, 2]} key={index}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Image src={item.weapon_img} maxH={'200px'} />
            </Box>
            <TextValue value={item.weapon_short_name} />
          </GridContents>
        ) : null,
      )}
    </>
  );
};

RenderSpecial.propTypes = {
  specialList: PropTypes.array,
  category: PropTypes.string,
};

export default RenderSpecial;
