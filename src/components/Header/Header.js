import {
  Heading,
  VStack,
  Button,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useState } from 'react';

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴를 추적하는 상태

  // 메뉴를 변경하는 함수
  const changeMenu = (menuName) => {
    setSelectedMenu(menuName);
  };

  // 메뉴 목록 배열
  const menuList = ['지도', '퀘스트', '아이템', '정보'];

  // 하위 목록 배열
  const subMenuList = {
    지도: [
      '세관',
      '등대',
      '산림',
      '해안선',
      '팩토리',
      '리저브',
      '연구소',
      '인터체인지',
      '그라운드 제로',
      '타르코프 시내',
    ],
    퀘스트: [
      '프라퍼',
      '테라피스트',
      '펜스',
      '스키어',
      '피스키퍼',
      '메카닉',
      '레그맨',
      '예거',
      '등대지기',
    ],
    아이템: [
      '무기',
      '총알',
      '방탄모',
      '의료품',
      '컨테이너',
      '전술 조끼',
      '방탄 조끼',
      '키',
      '헤드셋',
      '가방',
    ],
    정보: ['하이드 아웃', '보스'],
  };
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={6}
      position={'fixed'}
      width={'100%'}
      zIndex={10}
      bg={'tomato'}
    >
      <GridItem colSpan={1} h="14" />
      <GridItem colSpan={1} h="14" textAlign={'center'}>
        <Heading
          as={'h1'}
          size={'2xl'}
          alignItems={'center'}
          justifyContent={'center'}
          color={'white'}
        >
          TKL
        </Heading>
      </GridItem>
      <GridItem colStart={3} colEnd={6} h="14" textAlign={'center'}>
        {menuList.map((menuName, index) => (
          <Button
            key={index}
            onMouseEnter={() => changeMenu(menuName)}
            // variant={selectedMenu === menuName ? 'solid' : 'outline'}
            fontWeight="bold"
            borderWidth="2px"
            colorScheme="blue"
            m="2"
          >
            {menuName}
            {selectedMenu === menuName && (
              <VStack
                spacing={2}
                align="stretch"
                p={2}
                position="absolute"
                top="50px"
                onMouseEnter={() => setSelectedMenu(menuName)}
                onMouseLeave={() => setSelectedMenu(null)}
                bg="rgba(128, 128, 128, 0.5)"
              >
                {subMenuList[selectedMenu].map((subMenuName, index) => (
                  <Text key={index} fontSize="lg">
                    {subMenuName}
                  </Text>
                ))}
              </VStack>
            )}
          </Button>
        ))}
      </GridItem>
    </Grid>
  );
};

export default Header;
