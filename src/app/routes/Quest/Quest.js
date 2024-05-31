import { Flex } from '@chakra-ui/react';
import NPC from '../Quest/NPC/NPC';
import Preview from '../Quest/Preview/Preview';
import '../Quest/Quest.css';
import { useStore } from 'src/stores/store';
import SubHeader from 'src/components/SubHeader/SubHeader';
import PageParent from 'src/components/PageParent/PageParent';

const Quest = () => {
  const { npcId, setNpcId } = useStore();

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
      >
        <SubHeader title="퀘스트" />
      </Flex>
      <NPC selectedNpc={npcId} onClickNpc={onClickNpc} />
      <Preview selectedNpc={npcId} />
    </PageParent>
  );
};

export default Quest;
