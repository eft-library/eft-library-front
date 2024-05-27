import { Box, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import DividerContents from 'src/components/DividerContents/DividerContents';

const QuestContents = ({ quest }) => {
  return (
    <Box w={'95%'}>
      <DividerContents headText="목표">
        <Box>
          {quest.quest_objectives_kr.map((objectives, index) => (
            <Text
              key={index}
              color={'white'}
              mt={1}
              fontWeight={700}
              fontSize="lg"
              dangerouslySetInnerHTML={{
                __html: `*&nbsp;&nbsp;${objectives}`,
              }}
            />
          ))}
        </Box>
      </DividerContents>
      <DividerContents headText="보상">
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
      </DividerContents>
      <DividerContents headText="가이드">
        <Box>
          <Text
            color={'white'}
            mt={1}
            fontWeight={700}
            fontSize="lg"
            dangerouslySetInnerHTML={{
              __html: `${quest.quest_guide}`,
            }}
          />
        </Box>
      </DividerContents>
    </Box>
  );
};

QuestContents.propTypes = {
  quest: PropTypes.object,
};
export default QuestContents;
