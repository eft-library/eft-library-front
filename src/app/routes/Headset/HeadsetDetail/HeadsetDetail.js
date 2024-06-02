import GridTitle from 'src/components/GridTitle/GridTitle';
import { useStore } from 'src/stores/store';
import hooks from 'src/hooks/hooks';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import PropTypes from 'prop-types';
import GridContents from 'src/components/GridContents/GridContents';
import { Box, Image } from '@chakra-ui/react';
import GridCenterText from 'src/components/GridText/GridCenterText';

const HeadSetDetail = ({ headsetList }) => {
  const { allColumn } = useStore();
  return (
    <>
      <GridTitle
        columnDesign={[2, null, 2]}
        column={hooks.useColumnListByKr(allColumn, COLUMN_KEY.headset)}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {headsetList.map((item, index) => (
        <GridContents columnDesign={[2, null, 2]} key={index}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Image src={item.image} maxH={'200px'} />
          </Box>
          <GridCenterText value={item.name} />
        </GridContents>
      ))}
    </>
  );
};

HeadSetDetail.propTypes = {
  headsetList: PropTypes.array,
};

export default HeadSetDetail;
