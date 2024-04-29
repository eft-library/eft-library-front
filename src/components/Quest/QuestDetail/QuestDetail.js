import { Box, Flex } from '@chakra-ui/react';
import { MAP_COLOR } from 'src/utils/colorConstants';
import { useParams } from 'react-router-dom';

const QuestDetail = () => {
  const params = useParams();

  return (
    <Box
      className="Main"
      bgSize="cover"
      bg={MAP_COLOR.MAP_BACKGROUND}
      bgPosition="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingTop="80px"
      paddingBottom="20px"
      width="100%"
      height="auto"
    >
      <Flex
        className="Container"
        flex="1"
        flexDirection="column"
        width="60%"
        height="100vh"
        justifyContent="center"
        border="1px"
        borderColor={MAP_COLOR.MAP_LIGHT_GRAY}
        borderRadius={'lg'}
        paddingBottom={'20px'}
      >
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          flexDirection="column"
          mb={'40px'}
          mt={'40px'}
        ></Flex>
      </Flex>
    </Box>
  );
};

export default QuestDetail;
