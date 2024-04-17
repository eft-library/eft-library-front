import TweetPost from 'src/components/Main/News/TweetPost';
import { Box, Flex } from '@chakra-ui/react';
import { MAIN_COLOR } from 'src/utils/colorConstants';

const News = () => {
  return (
    <Box
      border="1px solid"
      borderColor={MAIN_COLOR.MAIN_WHITE}
      borderRadius={'lg'}
      width={'80%'}
      margin="0 auto" // 가운데 정렬을 위한 스타일 추가
    >
      <Flex justifyContent="center" alignItems="center">
        <TweetPost />
        <TweetPost />
      </Flex>
    </Box>
  );
};

export default News;
