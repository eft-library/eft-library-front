import { Box, SimpleGrid, Text, Image } from '@chakra-ui/react';
import { WEAOPN_COLUMN } from 'src/utils/weaponConstants';
import hooks from 'src/hooks/hooks';

const WeaponDetail = ({ category }) => {
  const { weapon, loading } = hooks.useGetAllWeapon();

  if (!weapon || loading) return null;

  const TextValue = ({ value }) => {
    return (
      <Box
        w={'100%'}
        h={'100%'}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={'column'}
      >
        <Text color="white" textAlign="center">
          {value}
        </Text>
      </Box>
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={'center'}
      width={'100%'}
      flexDirection={'column'}
    >
      <SimpleGrid
        columns={[2, null, 8]}
        spacing={2}
        width={'90%'}
        outline={'1px solid'}
        outlineColor={'white'}
        borderRadius={'lg'}
        p={2}
        mb={6}
      >
        {WEAOPN_COLUMN.map((item, index) => (
          <Text color={'white'} key={index} textAlign={'center'}>
            {item}
          </Text>
        ))}
      </SimpleGrid>
      {weapon.map((item, index) =>
        category === 'ALL' || category === item.weapon_category ? (
          <SimpleGrid
            columns={[2, null, 8]}
            spacing={2}
            width={'90%'}
            outline={'1px solid'}
            outlineColor={'white'}
            borderRadius={'lg'}
            p={2}
            mb={4}
            key={index}
          >
            <Image src={item.weapon_img} />
            <TextValue value={item.weapon_short_name} />
            <TextValue value={item.weapon_default_ammo} />
            <Box
              w={'100%'}
              h={'100%'}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection={'column'}
            >
              {item.weapon_modes_kr.map((mode, mIndex) => (
                <Text key={mIndex} color="white" textAlign="center">
                  {mode}
                </Text>
              ))}
            </Box>
            <TextValue value={item.weapon_fire_rate} />
            <TextValue value={item.weapon_ergonomics} />
            <TextValue value={item.weapon_recoil_horizontal} />
            <TextValue value={item.weapon_recoil_vertical} />
          </SimpleGrid>
        ) : null,
      )}
    </Box>
  );
};

export default WeaponDetail;
