import { Text, Image, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridTitle from 'src/components/GridTitle/GridTitle';
import GridContents from 'src/components/GridContents/GridContents';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { useStore } from 'src/stores/store';
import hooks from 'src/hooks/hooks';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const RenderThrowable = ({ throwableList }) => {
  const { allColumn } = useStore();

  const detailThrowable = ['RGN', 'RGO'];

  return (
    <>
      <GridTitle
        columnDesign={[2, null, 5]}
        column={hooks.useColumnListByKr(allColumn, COLUMN_KEY.throwable)}
        isShadow
        shadowColor={ALL_COLOR.YELLOW_SHADOW}
      />
      {throwableList.map((item, index) => (
        <GridContents columnDesign={[2, null, 5]} key={index}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Image src={item.image} maxH={'200px'} />
          </Box>
          <TextValue value={item.short_name} />
          <Box
            w={'100%'}
            h={'100%'}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={'column'}
          >
            {detailThrowable.includes(item.short_name) ? (
              <>
                <Text color={ALL_COLOR.WHITE} textAlign="center" mb={2}>
                  충격시 {item.min_fuse} 초
                </Text>
                <Text color={ALL_COLOR.WHITE} textAlign="center">
                  (충격 신관이 발동되지 않은 경우 {item.fuse} 초)
                </Text>
              </>
            ) : (
              <Text color={ALL_COLOR.WHITE} textAlign="center">
                {item.fuse} 초
              </Text>
            )}
          </Box>
          <Box
            w={'100%'}
            h={'100%'}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={'column'}
          >
            <Text color={ALL_COLOR.WHITE} textAlign="center">
              {item.min_explosion_distance} ~&nbsp;
              {item.max_explosion_distance} m
            </Text>
          </Box>
          <Box
            w={'100%'}
            h={'100%'}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={'column'}
          >
            <Text color={ALL_COLOR.WHITE} textAlign="center">
              {item.fragments} m
            </Text>
          </Box>
        </GridContents>
      ))}
    </>
  );
};

RenderThrowable.propTypes = {
  throwableList: PropTypes.array,
};

export default RenderThrowable;
