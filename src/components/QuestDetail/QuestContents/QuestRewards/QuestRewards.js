import { Box, Heading, Divider, Text } from '@chakra-ui/react';

const QuestRewards = () => {
  const obj = [
    '경험치 +1600,프라퍼 평판 +0.02',
    '예거 평판 +0.01',
    '15,000 루블',
    '1x PP-91 "Kedr" 9x18mm PM BZhT gzh Prapor LL1 에서 Kalashinikov AKS-74UB 5.45x39 돌격 소총 구매 잠금 해제',
  ];
  return (
    <Box mt={20}>
      <Heading as={'h3'} size={'lg'} color={'white'} mb={3}>
        보상
      </Heading>
      <Divider borderColor={'white'} borderWidth={1} mb={4} />
      <Box>
        {obj.map((item, index) => (
          <Text
            key={index}
            color={'white'}
            mt={1}
            fontWeight={700}
            fontSize="lg"
            dangerouslySetInnerHTML={{
              __html: `*&nbsp;&nbsp;${item}`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default QuestRewards;
