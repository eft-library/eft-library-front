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
