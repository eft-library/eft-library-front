import { Box, SimpleGrid, Text, Flex } from '@chakra-ui/react';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';
import API_PATH from 'src/api/api_path';

const NPC = ({ selectedNpc, onClickNpc }) => {
  const { apiData: npc, loading } = hooks.useGetApiWithNone(API_PATH.GET_NPC);

  const handleHover = (e) => {
    e.target.style.transform = 'scale(1.1)'; // 이미지 확대
    e.target.style.opacity = '0.8'; // 이미지 불투명도 변경
  };

  const handleHoverExit = (e) => {
    e.target.style.transform = 'scale(1)'; // 이미지 축소
    e.target.style.opacity = '1'; // 이미지 불투명도 원래대로
  };

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
              onClick={() => onClickNpc(npcItem.npc_id)}
              color={ALL_COLOR.WHITE}
              backgroundImage={`url(${hooks.useImageLink(npcItem.npc_img_path)})`}
              outline={
                selectedNpc === npcItem.npc_id ? '4px solid' : '1px solid'
              }
              outlineColor={
                selectedNpc === npcItem.npc_id
                  ? ALL_COLOR.DARK_YELLOW
                  : ALL_COLOR.WHITE
              }
              borderRadius={'lg'}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverExit}
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

NPC.propTypes = {
  selectedNpc: PropTypes.string,
  onClickNpc: PropTypes.func,
};

export default NPC;
