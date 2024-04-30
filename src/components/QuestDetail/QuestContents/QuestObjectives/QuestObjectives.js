import { Box, Heading, Divider, Text } from '@chakra-ui/react';

const QuestObjectives = () => {
  const obj = [
    '<a href="/map/GROUND_ZERO" target=" _blank" class="highlight_quest">그라운드 제로</a>에서 <a href="/weapon" target=" _blank" class="highlight_quest">Utoys 기관총</a> 찾기',
    '<a href="/map/GROUND_ZERO" target=" _blank" class="highlight_quest">그라운드 제로</a>에서 <a href="/weapon" target=" _blank" class="highlight_quest">AGS 유탄 발사기</a> 찾기,<a href="/map/GROUND_ZERO" target=" _blank" class="highlight_quest">그라운드 제로</a>에서 <span class="highlight_red">5명 표적 제거</span>',
  ];
  return (
    <Box>
      <Heading as={'h3'} size={'lg'} color={'white'} mb={3}>
        목표
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
              __html: `<span class="highlight_quest">*</span>&nbsp;&nbsp;${item}`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default QuestObjectives;
