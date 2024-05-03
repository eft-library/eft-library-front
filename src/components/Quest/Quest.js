import { Box, Flex, Heading } from '@chakra-ui/react';
import { MAP_COLOR } from 'src/utils/colorConstants';
import NPC from 'src/components/Quest/NPC/NPC';
import Preview from 'src/components/Quest/Preview/Preview';
import 'src/components/Quest/Quest.css';
import { useQuestStore } from 'src/config/store';

const Quest = () => {
  const { npcId, setNpcId } = useQuestStore();

  const onClickNpc = (npcValue) => {
    setNpcId(npcValue);
  };

  return (
    <Box
      className="Main"
      bgSize="cover"
      bg={MAP_COLOR.MAP_BACKGROUND}
      bgPosition="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingTop="80px"
      paddingBottom="20px"
      width="100%"
      height="auto"
    >
      <Flex
        className="Container"
        flex="1"
        flexDirection="column"
        width="60%"
        height="100vh"
        justifyContent="center"
        border="1px"
        borderColor={MAP_COLOR.MAP_LIGHT_GRAY}
        borderRadius={'lg'}
        paddingBottom={'20px'}
      >
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection="column"
          mb={'40px'}
          mt={'40px'}
        >
          <Heading as={'h1'} size={'xl'} color={MAP_COLOR.MAP_WHITE}>
            퀘스트
          </Heading>
        </Flex>
        <NPC selectedNpc={npcId} onClickNpc={onClickNpc} />
        <Preview selectedNpc={npcId} />
      </Flex>
    </Box>
  );
};

export default Quest;
