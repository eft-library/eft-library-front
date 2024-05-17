import { Box, SimpleGrid, Text, Image } from '@chakra-ui/react';

const BossDetail = () => {
  const t = ['사진', '이름', '소속', '위치', '스폰 확률', '피통', '추종자'];
  const w = [
    {
      img: 'https://i.namu.wiki/i/UifEv197Swv_tuhQI7M2LI9sdGzVdlSt65n-OJf9yKccpFinxPb0T-c_eHFQSCEi2iICW2dQSodfASyil90X-g.webp',
      name: '르살라',
      magazine: 'Scavs',
      fireMode: '세관',
      fireSpeed: 35,
      ergonomics: 752,
      hRecoil: '중무장 경비병 4명',
    },
    {
      img: 'https://i.namu.wiki/i/UifEv197Swv_tuhQI7M2LI9sdGzVdlSt65n-OJf9yKccpFinxPb0T-c_eHFQSCEi2iICW2dQSodfASyil90X-g.webp',
      name: '르살라',
      magazine: 'Scavs',
      fireMode: '세관',
      fireSpeed: 35,
      ergonomics: 752,
      hRecoil: '중무장 경비병 4명',
    },
  ];

  const renderText = (text) => (
    <Text
      color="white"
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      key={text}
    >
      {text}
    </Text>
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={'center'}
      width={'100%'}
      flexDirection={'column'}
    >
      <SimpleGrid
        columns={[2, null, 7]}
        spacing={2}
        width={'90%'}
        outline={'1px solid'}
        outlineColor={'white'}
        borderRadius={'lg'}
        p={2}
        mb={6}
      >
        {t.map((item, index) => (
          <Text color={'white'} key={index} textAlign={'center'}>
            {item}
          </Text>
        ))}
      </SimpleGrid>
      {w.map((item, index) => (
        <SimpleGrid
          columns={[2, null, 7]}
          spacing={2}
          width={'90%'}
          outline={'1px solid'}
          outlineColor={'white'}
          borderRadius={'lg'}
          p={2}
          mb={4}
          key={index}
        >
          <Image src={item.img} alt="Dan Abramov" />
          {Object.values(item).slice(1).map(renderText)}
        </SimpleGrid>
      ))}
    </Box>
  );
};

export default BossDetail;
