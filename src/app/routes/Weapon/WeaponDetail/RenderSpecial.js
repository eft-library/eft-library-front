import { Image, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridTitle from 'src/components/GridTitle/GridTitle';
import GridContents from 'src/components/GridContents/GridContents';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { useColumnStore } from 'src/stores/store';

const RenderSpecial = ({ specialList, category }) => {
  const { allColumn } = useColumnStore();
  const columnList = (columnObj) => {
    return columnObj.find((item) => item.column_id === COLUMN_KEY.special)
      .column_value_kr;
  };

  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (item) => {
    const isGeneralCategory = item.weapon_category === 'Special weapons';
    const isMatchingCategory =
      item.weapon_category === 'Special weapons' || category === 'ALL';
    return isGeneralCategory && isMatchingCategory;
  };

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 2]}
        column={columnList(allColumn)}
        isShadow
        shadowColor="0px 1px 1px rgb(202, 238, 18, 0.7)"
      />
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
