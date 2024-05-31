import { Box, Flex } from '@chakra-ui/react';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import YoutubeNews from '../News/YoutubeNews';

const News = () => {
  return (
    <Box
      border="1px solid"
      borderColor={ALL_COLOR.WHITE}
      borderRadius={'lg'}
      width={'85%'}
      margin="0 auto"
    >
      <Flex justifyContent="center" alignItems="center">
        <YoutubeNews />
        <YoutubeNews />
      </Flex>
    </Box>
  );
};

export default News;
