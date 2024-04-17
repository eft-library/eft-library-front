import { Tweet } from 'react-tweet';
import { TWEET_POST_ID } from 'src/utils/libraryConstants';
import { Box } from '@chakra-ui/react';

const TweetPost = () => {
  return (
    <Box width="600px" height="400px" overflow="auto">
      <Tweet id={TWEET_POST_ID} />
    </Box>
  );
};

export default TweetPost;
