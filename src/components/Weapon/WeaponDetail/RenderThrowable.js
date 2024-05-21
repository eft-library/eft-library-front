import { SimpleGrid, Text, Image, Box } from '@chakra-ui/react';
import { THROWABLE_COLUMN } from 'src/utils/weaponConstants';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridTitle from './GridTitle';

const RenderThrowable = ({ throwableList }) => {
  return (
    <>
      <GridTitle columnDesign={[2, null, 5]} column={THROWABLE_COLUMN} />
      {throwableList.map((item, index) => (
        <SimpleGrid
          columns={[2, null, 5]}
          spacing={2}
          width={'90%'}
          outline={'1px solid'}
          outlineColor={'white'}
          borderRadius={'lg'}
          p={2}
          mb={4}
          key={index}
        >
          <Image src={item.throwable_image} />
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
        </SimpleGrid>
      ))}
    </>
  );
};

RenderThrowable.propTypes = {
  throwableList: PropTypes.array,
};

export default RenderThrowable;
