import { SimpleGrid, Text, Image, Box } from '@chakra-ui/react';
import { KNIFE_COLUMN } from 'src/utils/weaponConstants';
import PropTypes from 'prop-types';
import TextValue from './TextValue';
import GridTitle from './GridTitle';

const RenderKnife = ({ knifeList }) => {
  return (
    <>
      <GridTitle columnDesign={[2, null, 5]} column={KNIFE_COLUMN} />
      {knifeList.map((item, index) => (
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
          <Image src={item.knife_image} />
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
        </SimpleGrid>
      ))}
    </>
  );
};

RenderKnife.propTypes = {
  knifeList: PropTypes.array,
};

export default RenderKnife;
