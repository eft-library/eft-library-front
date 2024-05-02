import QuestObjectives from 'src/components/QuestDetail/QuestContents/QuestObjectives/QuestObjectives';
import QuestRewards from 'src/components/QuestDetail/QuestContents/QuestRewards/QuestRewards';
import QuestGuide from 'src/components/QuestDetail/QuestContents/QuestGuide/QuestGuide';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const QuestContents = ({ quest }) => {
  return (
    <Box w={'95%'}>
      <QuestObjectives quest={quest} />
      <QuestRewards quest={quest} />
      <QuestGuide quest={quest} />
    </Box>
  );
};

QuestContents.propTypes = {
  // quest: PropTypes.objectOf(
  //   PropTypes.shape({
  //     quest_guide: PropTypes.string,
  //     quest_id: PropTypes.number,
  //     quest_name_en: PropTypes.string,
  //     quest_name_kr: PropTypes.string,
  //     quest_npc_value: PropTypes.string,
  //     quest_objectives_en: PropTypes.arrayOf(PropTypes.string),
  //     quest_objectives_kr: PropTypes.arrayOf(PropTypes.string),
  //     quest_order: PropTypes.number,
  //     quest_required_kappa: PropTypes.bool,
  //     quest_rewards_en: PropTypes.arrayOf(PropTypes.string),
  //     quest_rewards_kr: PropTypes.arrayOf(PropTypes.string),
  //     quest_update_time: PropTypes.string,
  //   }),
  // ),
  quest: PropTypes.object,
};
export default QuestContents;
