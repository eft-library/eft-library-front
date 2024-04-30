import { Box, Flex, Text } from '@chakra-ui/react';

const QuestInfo = () => {
  return (
    <Box justifyContent="center" alignItems={'center'}>
      <Box
        w="180px"
        h="180px"
        backgroundColor={'white'}
        color={'white'}
        //   backgroundImage={`url(${process.env.REACT_APP_NAS_URL + npcItem.npc_img_path})`}
        borderRadius={'lg'}
      />
      <Text
        color={'white'}
        textAlign={'center'}
        mt={'4'}
        fontWeight={'700'}
        fontSize="lg"
      >
        슈팅캔
      </Text>
      <Text
        color={'white'}
        textAlign={'center'}
        fontWeight={'700'}
        fontSize="lg"
      >
        (Shooting Cans)
      </Text>
      <Text
        color={'white'}
        textAlign={'center'}
        mt={'1'}
        fontSize="md"
        fontWeight={'600'}
      >
        ✅ Kappa
      </Text>
      <Flex
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mt={4}
      >
        <Box>
          <Text
            color={'white'}
            fontWeight={'700'}
            fontSize="md"
            textAlign={'center'}
          >
            이전
          </Text>
          <Text
            color={'white'}
            fontWeight={'700'}
            fontSize="sm"
            textAlign={'center'}
          >
            -
          </Text>
          <br />
        </Box>
        <Box>
          <Text
            color={'white'}
            fontWeight={'700'}
            fontSize="md"
            textAlign={'center'}
          >
            다음
          </Text>
          <Text
            color={'white'}
            fontWeight={'700'}
            fontSize="sm"
            textAlign={'center'}
          >
            데뷔
          </Text>
          <Text
            color={'white'}
            fontWeight={'700'}
            fontSize="sm"
            textAlign={'center'}
          >
            (Debut)
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default QuestInfo;
