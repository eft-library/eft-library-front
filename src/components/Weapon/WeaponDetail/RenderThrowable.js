import { Text, Image, Box } from '@chakra-ui/react';
import { THROWABLE_COLUMN } from 'src/utils/weaponConstants';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridTitle from './GridTitle';
import GridContents from './GridContents';

const RenderThrowable = ({ throwableList }) => {
  return (
    <>
      <GridTitle columnDesign={[2, null, 5]} column={THROWABLE_COLUMN} />
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
            <Text color="white" textAlign="center">
              {item.throwable_fuse} 초
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
              {item.throwable_min_explosion_distance} ~
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
