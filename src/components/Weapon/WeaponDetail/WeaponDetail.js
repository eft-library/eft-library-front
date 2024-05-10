import { Box, SimpleGrid, Text, Image } from '@chakra-ui/react';

const WeaponDetail = () => {
  const t = [
    '사진',
    '이름',
    '탄창',
    '발사모드',
    '발사속도',
    '인체공학',
    '수평반동',
    '수직반동',
  ];
  const w = [
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrOGx2G_D3vX8SG9gqO7QQS1_cVocVgnd5r7TVZwj4FA&s',
      name: '9A-91',
      magazine: '9x39mm',
      fireMode: '단발연사',
      fireSpeed: 900,
      ergonomics: 69,
      hRecoil: 234,
      vRecoil: 90,
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrOGx2G_D3vX8SG9gqO7QQS1_cVocVgnd5r7TVZwj4FA&s',
      name: '9A-91',
      magazine: '9x39mm',
      fireMode: '단발연사',
      fireSpeed: 900,
      ergonomics: 69,
      hRecoil: 234,
      vRecoil: 90,
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
        columns={[2, null, 8]}
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
          columns={[2, null, 8]}
          spacing={2}
          width={'90%'}
          outline={'1px solid'}
          outlineColor={'white'}
          borderRadius={'lg'}
          p={2}
          mb={4}
          key={index}
        >
          <Box
            boxSize="sm"
            width={'100px'}
            height={'80px'}
            display="flex"
            justifyContent="center"
            alignItems={'center'}
          >
            <Image src={item.img} alt="Dan Abramov" />
          </Box>
          {Object.values(item).slice(1).map(renderText)}
        </SimpleGrid>
      ))}
    </Box>
  );
};

export default WeaponDetail;
