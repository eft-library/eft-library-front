import { Box, Flex } from '@chakra-ui/react';
import { MAIN_COLOR } from 'src/utils/consts/colorConsts';
import YoutubeNews from 'src/components/Main/News/YoutubeNews';

const News = () => {
  return (
    <Box
      border="1px solid"
      borderColor={MAIN_COLOR.MAIN_WHITE}
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
