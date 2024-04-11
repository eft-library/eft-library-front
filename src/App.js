import 'src/App.css';
import React from 'react';
import PageRouter from 'src/routes/router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <BrowserRouter>
        <PageRouter.HEADER />
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
        <PageRouter.FOOTER />
      </BrowserRouter>
    </div>
  );
}

export default App;
