import { Text, Image, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridTitle from './GridTitle';
import GridContents from './GridContents';
import API_PATH from 'src/api/api_path';
import hooks from 'src/hooks/hooks';

const RenderThrowable = ({ throwableList }) => {
  const { column, loading } = hooks.useGetColumn(
    API_PATH.GET_COLUMN + '/WEAPON',
  );

  const columnList = (columnObj) => {
    return columnObj.find((item) => item.column_id === 'THROWABLE_COLUMN')
      .column_value_kr;
  };

  const detailThrowable = ['RGN', 'RGO'];

  if (!column || loading) return null;

  return (
    <>
      <GridTitle columnDesign={[2, null, 5]} column={columnList(column)} />
      {throwableList.map((item, index) => (
        <GridContents columnDesign={[2, null, 5]} key={index}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Image src={item.throwable_image} maxH={'200px'} />
          </Box>
          <TextValue value={item.throwable_short_name} />
          <Box
            w={'100%'}
            h={'100%'}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={'column'}
          >
            {detailThrowable.includes(item.throwable_short_name) ? (
              <>
                <Text color="white" textAlign="center" mb={2}>
                  충격시 {item.throwable_min_fuse} 초
                </Text>
                <Text color="white" textAlign="center">
                  (충격 신관이 발동되지 않은 경우 {item.throwable_fuse} 초)
                </Text>
              </>
            ) : (
              <Text color="white" textAlign="center">
                {item.throwable_fuse} 초
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
            <Text color="white" textAlign="center">
              {item.throwable_min_explosion_distance} ~&nbsp;
              {item.throwable_max_explosion_distance} m
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
            <Text color="white" textAlign="center">
              {item.throwable_fragments} m
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
