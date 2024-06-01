import { Image, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridTitle from 'src/components/GridTitle/GridTitle';
import GridContents from 'src/components/GridContents/GridContents';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { useStore } from 'src/stores/store';
import hooks from 'src/hooks/hooks';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const RenderSpecial = ({ specialList, category }) => {
  const { allColumn } = useStore();

  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (item) => {
    const isGeneralCategory = item.category === 'Special weapons';
    const isMatchingCategory =
      item.category === 'Special weapons' || category === 'ALL';
    return isGeneralCategory && isMatchingCategory;
  };

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 2]}
        column={hooks.useColumnListByKr(allColumn, COLUMN_KEY.special)}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {specialList.map((item, index) =>
        shouldRenderWeapon(item) ? (
          <GridContents columnDesign={[2, null, 2]} key={index}>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Image src={item.image} maxH={'200px'} />
            </Box>
            <TextValue value={item.short_name} />
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
