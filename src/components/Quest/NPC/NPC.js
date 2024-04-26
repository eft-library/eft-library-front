import { Box, SimpleGrid, Text, Flex } from '@chakra-ui/react';
import { MAIN_COLOR } from 'src/utils/colorConstants';
import hooks from 'src/hooks/hooks';

const NPC = () => {
  const { npc, loading } = hooks.useGetNpc();

  if (!npc || loading) return null;

  return (
    <Box display="flex" justifyContent="center" alignItems={'center'} mb={10}>
      <SimpleGrid columns={[2, null, 5]} spacing={12}>
        {npc.map((npcItem, index) => (
          <Flex key={index} flexDirection={'column'}>
            <Box
              cursor={'pointer'}
              w="120px"
              h="120px"
              color={'white'}
              backgroundImage={`url(${process.env.REACT_APP_NAS_URL + npcItem.npc_img_path})`}
              border="1px solid"
              borderColor={MAIN_COLOR.MAIN_WHITE}
              borderRadius={'lg'}
            />
            <Text color={'white'} textAlign={'center'} mt={'2'}>
              {npcItem.npc_name_kr}
            </Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default NPC;
