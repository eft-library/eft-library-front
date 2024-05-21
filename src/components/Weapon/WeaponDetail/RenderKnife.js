import { SimpleGrid, Text, Image, Box } from '@chakra-ui/react';
import { KNIFE_COLUMN } from 'src/utils/weaponConstants';
import PropTypes from 'prop-types';
import TextValue from './TextValue';

const RenderKnife = ({ knifeList, category }) => {
  return (
    (category === 'ALL' || category === 'Knife') && (
      <>
        <SimpleGrid
          columns={[2, null, 5]}
          spacing={2}
          width={'90%'}
          outline={'1px solid'}
          outlineColor={'white'}
          borderRadius={'lg'}
          p={2}
          mb={6}
        >
          {KNIFE_COLUMN.map((item, index) => (
            <Text color={'white'} key={index} textAlign={'center'}>
              {item}
            </Text>
          ))}
        </SimpleGrid>
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
            <Image src={item.knife_image} bg={'white'} />
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
    )
  );
};

RenderKnife.propTypes = {
  knifeList: PropTypes.array,
  category: PropTypes.string,
};

export default RenderKnife;
