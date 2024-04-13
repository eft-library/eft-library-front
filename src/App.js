import React, { useState } from 'react';
import PageRouter from 'src/routes/router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ChakraProvider,
  CSSReset,
  extendTheme,
  Box,
  Flex,
  Heading,
  Button,
  VStack,
  Text,
} from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Box: {
      baseStyle: {
        borderRadius: 'lg', // 네모 박스의 모서리를 둥글게 만듭니다.
        bg: 'rgba(255, 255, 255, 0.5)', // 투명도를 조절하여 텍스트와 배경 이미지를 함께 보이도록 합니다.
      },
    },
    styles: {
      global: {
        '#root': {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        },
      },
    },
  },
});

function App() {
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
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Flex flexDirection="column">
        <Box
          position="fixed" /* 탑 네비게이션을 화면 상단에 고정시킵니다. */
          top="0"
          left="0"
          width="100%"
          zIndex="1000"
          bg="#000000" // 검은색 배경 설정
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
          backdropFilter="blur(10px)"
        >
          <Flex justifyContent="center" alignItems="center" height="50px">
            <Heading fontSize="28px" cursor="pointer" color="white">
              TKL
            </Heading>
            <Flex justifyContent="center" py="2">
              {menuList.map((menuName, index) => (
                <Button
                  key={index}
                  onMouseEnter={() => changeMenu(menuName)}
                  variant={selectedMenu === menuName ? 'solid' : 'outline'}
                  fontWeight="bold" // 텍스트를 굵게 설정합니다.
                  borderWidth="2px"
                  colorScheme="whiteAlpha" // 텍스트 및 테두리 색상을 지정합니다.
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
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageRouter.MAP />} />
          <Route path="/item/ammo" element={<PageRouter.AMMO />} />
          <Route path="/item/vest" element={<PageRouter.VEST />} />
          <Route path="/item/bag" element={<PageRouter.BAG />} />
          <Route path="/item/rigs" element={<PageRouter.RIGS />} />
          <Route path="/item/container" element={<PageRouter.CONTAINER />} />
          <Route path="/item/headset" element={<PageRouter.HEADSET />} />
          <Route path="/item/head-wear" element={<PageRouter.HEADWEAR />} />
          <Route path="/item/medical" element={<PageRouter.MEDICAL />} />
          <Route path="/item/weapon" element={<PageRouter.WEAPON />} />
          <Route path="/map" element={<PageRouter.MAP />} />
          <Route path="/boss" element={<PageRouter.BOSS />} />
          <Route path="/quest" element={<PageRouter.QUEST />} />
          <Route path="/ballistics" element={<PageRouter.BALLISTICS />} />
          <Route path="/hideout" element={<PageRouter.HIDEOUT />} />
          <Route path="*" element={<PageRouter.NOT_FOUND />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
