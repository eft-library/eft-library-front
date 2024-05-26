import { Box, Heading, Divider, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const QuestRewards = ({ quest }) => {
  return (
    <Box mt={20}>
      <Heading as={'h3'} size={'lg'} color={'white'} mb={3}>
        보상
      </Heading>
      <Divider borderColor={'white'} borderWidth={1} mb={4} />
      <Box>
        {quest.quest_rewards_kr.map((rewards, index) => (
          <Text
            key={index}
            color={'white'}
            mt={1}
            fontWeight={700}
            fontSize="lg"
            dangerouslySetInnerHTML={{
              __html: `*&nbsp;&nbsp;${rewards}`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

QuestRewards.propTypes = {
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
export default QuestRewards;
