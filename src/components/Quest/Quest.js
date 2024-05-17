import { Box, Flex, Heading } from '@chakra-ui/react';
import { MAP_COLOR } from 'src/utils/colorConstants';
import NPC from 'src/components/Quest/NPC/NPC';
import Preview from 'src/components/Quest/Preview/Preview';
import 'src/components/Quest/Quest.css';
import { useQuestStore } from 'src/config/store';
import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';

const Quest = () => {
  const { npcId, setNpcId } = useQuestStore();

  const onClickNpc = (npcValue) => {
    setNpcId(npcValue);
  };

  return (
    <PageParent>
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection="column"
        mb={'40px'}
        mt={'40px'}
      >
        <SubHeader title="퀘스트" />
      </Flex>
      <NPC selectedNpc={npcId} onClickNpc={onClickNpc} />
      <Preview selectedNpc={npcId} />
    </PageParent>
  );
};

export default Quest;
