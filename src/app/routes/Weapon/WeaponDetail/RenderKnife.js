import { Text, Image, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridTitle from 'src/components/GridTitle/GridTitle';
import GridContents from 'src/components/GridContents/GridContents';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { useStore } from 'src/stores/store';

const RenderKnife = ({ knifeList }) => {
  const { allColumn } = useStore();

  const columnList = (columnObj) => {
    return columnObj.find((item) => item.column_id === COLUMN_KEY.knife)
      .column_value_kr;
  };

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={columnList(allColumn)}
        isShadow
        shadowColor="0px 1px 1px rgb(202, 238, 18, 0.7)"
      />
      {knifeList.map((item, index) => (
        <GridContents columnDesign={[2, null, 5]} key={index}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Image src={item.knife_image} maxH={'200px'} />
          </Box>
          <TextValue value={item.knife_name} />
          <TextValue value={item.knife_slash_damage} />
          <TextValue value={item.knife_stab_damage} />
          <Box
            w={'100%'}
            h={'100%'}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={'column'}
          >
            <Text color="white" textAlign="center">
              {item.knife_hit_radius} m
            </Text>
          </Box>
        </GridContents>
      ))}
    </>
  );
};

RenderKnife.propTypes = {
  knifeList: PropTypes.array,
};

export default RenderKnife;
