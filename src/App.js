import React from 'react';
import PageRouter from 'src/routes/router';
import Header from './components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';

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
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageRouter.MAP />} />
          <Route path="/map/:mapId" element={<PageRouter.MAP />} />
          <Route path="/quest" element={<PageRouter.QUEST />} />
          <Route path="/item/weapon" element={<PageRouter.WEAPON />} />
          <Route path="/item/ammo" element={<PageRouter.AMMO />} />
          <Route path="/item/head-wear" element={<PageRouter.HEADWEAR />} />
          <Route path="/item/medical" element={<PageRouter.MEDICAL />} />
          <Route path="/item/container" element={<PageRouter.CONTAINER />} />
          <Route path="/item/rig" element={<PageRouter.RIG />} />
          <Route path="/item/vest" element={<PageRouter.VEST />} />
          <Route path="/item/key" element={<PageRouter.KEY />} />
          <Route path="/item/bag" element={<PageRouter.BAG />} />
          <Route path="/item/headset" element={<PageRouter.HEADSET />} />
          <Route path="/hideout" element={<PageRouter.HIDEOUT />} />
          <Route path="/boss" element={<PageRouter.BOSS />} />
          <Route path="/ballistics" element={<PageRouter.BALLISTICS />} />
          <Route path="*" element={<PageRouter.NOT_FOUND />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
