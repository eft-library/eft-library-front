import { Text, Image, Box } from '@chakra-ui/react';
import { KNIFE_COLUMN } from 'src/utils/weaponConstants';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridTitle from './GridTitle';
import GridContents from './GridContents';

const RenderKnife = ({ knifeList }) => {
  return (
    <>
      <GridTitle columnDesign={[2, null, 5]} column={KNIFE_COLUMN} />
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
