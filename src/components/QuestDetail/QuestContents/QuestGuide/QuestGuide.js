import { Box, Heading, Divider, Text } from '@chakra-ui/react';

const QuestGuide = () => {
  return (
    <Box mt={20}>
      <Heading as={'h3'} size={'lg'} color={'white'} mb={3}>
        가이드
      </Heading>
      <Divider borderColor={'white'} borderWidth={1} mb={4} />
      <Box></Box>
    </Box>
  );
};

export default QuestGuide;
