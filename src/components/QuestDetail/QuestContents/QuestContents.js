import QuestObjectives from 'src/components/QuestDetail/QuestContents/QuestObjectives/QuestObjectives';
import QuestRewards from 'src/components/QuestDetail/QuestContents/QuestRewards/QuestRewards';
import QuestGuide from 'src/components/QuestDetail/QuestContents/QuestGuide/QuestGuide';
import { Box } from '@chakra-ui/react';

const QuestContents = () => {
  return (
    <Box w={'95%'}>
      <QuestObjectives />
      <QuestRewards />
      <QuestGuide />
    </Box>
  );
};

export default QuestContents;
