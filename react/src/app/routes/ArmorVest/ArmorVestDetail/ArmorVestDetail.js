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

const ArmorVestDetail = ({ armorVestList }) => {
  const { allColumn } = useStore();
  return (
    <>
      <GridTitle
        columnDesign={[2, null, 6]}
        column={hooks.useColumnListByKr(allColumn, COLUMN_KEY.armorVest)}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {armorVestList.map((item, index) => (
        <GridContents columnDesign={[2, null, 6]} key={index}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Image src={item.image} maxH={'200px'} />
          </Box>
          <GridCenterText value={item.name} />
          <GridCenterText value={item.durability} />
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
    </>
  );
};

ArmorVestDetail.propTypes = {
  armorVestList: PropTypes.array,
};

export default ArmorVestDetail;
