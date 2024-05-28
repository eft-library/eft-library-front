import { Box, Text, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridTitle from 'src/components/GridTitle/GridTitle';
import GridContents from 'src/components/GridContents/GridContents';
import API_PATH from 'src/api/api_path';
import hooks from 'src/hooks/hooks';

const RenderStationary = ({ stationaryList, category }) => {
  const { column, loading } = hooks.useGetColumn(
    API_PATH.GET_COLUMN + '/WEAPON',
  );

  const columnList = (columnObj) => {
    return columnObj.find((item) => item.column_id === 'STATIONARY_COLUMN')
      .column_value_kr;
  };

  // 무기 렌더링 조건 함수
  const shouldRenderWeapon = (item) => {
    const isGeneralCategory = item.weapon_category === 'Stationary weapons';
    const isMatchingCategory =
      item.weapon_category === 'Stationary weapons' || category === 'ALL';
    return isGeneralCategory && isMatchingCategory;
  };

  if (!column || loading) return null;

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={columnList(column)}
        isShadow
        shadowColor="0px 1px 1px rgb(202, 238, 18, 0.7)"
      />
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