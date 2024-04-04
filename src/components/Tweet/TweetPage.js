import { Tweet } from 'react-tweet';
import { TWEET_POST_ID } from 'src/utils/libraryConstants';

const TweetPage = () => {
  return (
    <div>
      <Tweet id={TWEET_POST_ID} />
    </div>
  );
};

export default TweetPage;
