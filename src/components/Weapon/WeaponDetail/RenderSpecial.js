import { Image, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridTitle from './GridTitle';
import GridContents from './GridContents';
import API_PATH from 'src/api/api_path';
import hooks from 'src/hooks/hooks';

const RenderSpecial = ({ specialList, category }) => {
  const { column, loading } = hooks.useGetColumn(
    API_PATH.GET_COLUMN + '/WEAPON',
  );

  const columnList = (columnObj) => {
    return columnObj.find((item) => item.column_id === 'SPECIAL_COLUMN')
      .column_value_kr;
  };

  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (item) => {
    const isGeneralCategory = item.weapon_category === 'Special weapons';
    const isMatchingCategory =
      item.weapon_category === 'Special weapons' || category === 'ALL';
    return isGeneralCategory && isMatchingCategory;
  };

  if (!column || loading) return null;

  return (
    <>
      <GridTitle columnDesign={[2, null, 2]} column={columnList(column)} />
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
