import GridTitle from 'src/components/GridTitle/GridTitle';
import { useStore } from 'src/stores/store';
import hooks from 'src/hooks/hooks';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import PropTypes from 'prop-types';
import GridContents from 'src/components/GridContents/GridContents';
import { Box, Image, Text } from '@chakra-ui/react';
import GridCenterText from 'src/components/GridText/GridCenterText';
import RenderArrayText from 'src/components/GridText/RenderArrayText';

const RigDetail = ({ rigList }) => {
  const { allColumn } = useStore();

  const noClassColumn = (column) => {
    return column.filter(
      (item) =>
        item === '사진' ||
        item === '이름' ||
        item === '슬롯' ||
        item === '무게',
    );
  };

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 7]}
        column={hooks.useColumnListByKr(allColumn, COLUMN_KEY.rig)}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {rigList.class_rig.map((item, index) => (
        <GridContents columnDesign={[2, null, 7]} key={index}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Image src={item.image} maxH={'200px'} />
          </Box>
          <GridCenterText value={item.name} />
          <GridCenterText value={item.durability} />
          <GridCenterText value={item.capacity} />
          <GridCenterText value={item.class_value} />
          <RenderArrayText arrayText={item.areas_kr} />
          <Box
            w={'100%'}
            h={'100%'}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={'column'}
          >
            <Text color={ALL_COLOR.WHITE} textAlign="center">
              {item.weight} kg
            </Text>
          </Box>
        </GridContents>
      ))}
      <Box mb={20} />
      <GridTitle
        columnDesign={[2, null, 4]}
        column={noClassColumn(
          hooks.useColumnListByKr(allColumn, COLUMN_KEY.rig),
        )}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {rigList.no_class_rig.map((item, index) => (
        <GridContents columnDesign={[2, null, 4]} key={index}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Image src={item.image} maxH={'200px'} />
          </Box>
          <GridCenterText value={item.name} />
          <GridCenterText value={item.capacity} />
          <Box
            w={'100%'}
            h={'100%'}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={'column'}
          >
            <Text color={ALL_COLOR.WHITE} textAlign="center">
              {item.weight} kg
            </Text>
          </Box>
        </GridContents>
      ))}
    </>
  );
};

RigDetail.propTypes = {
  rigList: PropTypes.object,
};

export default RigDetail;
