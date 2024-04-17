import React from 'react';
import PageRouter from 'src/routes/router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <BrowserRouter>
        <PageRouter.HEADER />
        <Routes>
          <Route path="/" element={<PageRouter.MAIN />} />
          <Route path="/map/:mapId" element={<PageRouter.MAP />} />
          <Route path="/quest" element={<PageRouter.QUEST />} />
          <Route path="/item/WEAPON" element={<PageRouter.WEAPON />} />
          <Route path="/item/AMMO" element={<PageRouter.AMMO />} />
          <Route path="/item/HEAD_WEAR" element={<PageRouter.HEADWEAR />} />
          <Route path="/item/MEDICAL" element={<PageRouter.MEDICAL />} />
          <Route path="/item/CONTAINER" element={<PageRouter.CONTAINER />} />
          <Route path="/item/RIG" element={<PageRouter.RIG />} />
          <Route path="/item/ARMOR_VEST" element={<PageRouter.VEST />} />
          <Route path="/item/KEY" element={<PageRouter.KEY />} />
          <Route path="/item/BAG" element={<PageRouter.BAG />} />
          <Route path="/item/HEADSET" element={<PageRouter.HEADSET />} />
          <Route path="/HIDEOUT" element={<PageRouter.HIDEOUT />} />
          <Route path="/BOSS" element={<PageRouter.BOSS />} />
          <Route path="/ballistics" element={<PageRouter.BALLISTICS />} />
          <Route path="*" element={<PageRouter.NOT_FOUND />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
