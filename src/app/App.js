import React, { useEffect } from 'react';
import PageRouter from 'src/routes/router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { useStore } from 'src/stores/store';
import API_PATH from 'src/api/api_path';
import hooks from 'src/hooks/hooks';

function App() {
  const { setColumn, allColumn, setItemFilter } = useStore();
  const { apiData: columnData } = hooks.useGetApiWithNone(
    API_PATH.GET_ALL_COLUMN,
  );
  const { apiData: apiItemFilter } = hooks.useGetApiWithNone(
    API_PATH.GET_ITEM_FILTER,
  );

  // 우클릭 막기
  useEffect(() => {
    document.oncontextmenu = function () {
      return false;
    };
  }, []);

  useEffect(() => {
    if (columnData) {
      setColumn(columnData);
    }

    if (apiItemFilter) {
      setItemFilter(apiItemFilter);
    }
  }, [columnData, apiItemFilter]);

  return (
    <ChakraProvider>
      <CSSReset />
      <BrowserRouter>
        <PageRouter.HEADER />
        <Routes>
          <Route path="/api/*" render={() => null} />
          <Route path="/" element={<PageRouter.MAIN />} />
          <Route path="/map/:mapId" element={<PageRouter.MAP />} />
          <Route
            path="/map-of-tarkov/:mapId"
            element={<PageRouter.MAP_OF_TARKOV />}
          />
          <Route path="/quest" element={<PageRouter.QUEST />} />
          <Route
            path="/quest/detail/:questId"
            element={<PageRouter.QUSET_DETAIL />}
          />
          <Route path="/weapon" element={<PageRouter.WEAPON />} />
          <Route path="/ammo" element={<PageRouter.AMMO />} />
          <Route path="/head-wear" element={<PageRouter.HEADWEAR />} />
          <Route path="/medical" element={<PageRouter.MEDICAL />} />
          <Route path="/container" element={<PageRouter.CONTAINER />} />
          <Route path="/rig" element={<PageRouter.RIG />} />
          <Route path="/armor-vest" element={<PageRouter.ARMOR_VEST />} />
          <Route path="/key" element={<PageRouter.KEY />} />
          <Route path="/bag" element={<PageRouter.BAG />} />
          <Route path="/headset" element={<PageRouter.HEADSET />} />
          <Route path="/hideout" element={<PageRouter.HIDEOUT />} />
          <Route path="/boss" element={<PageRouter.BOSS />} />
          <Route path="*" element={<PageRouter.NOT_FOUND />} />
        </Routes>
        {allColumn && Object.keys(allColumn).length > 0 && (
          <PageRouter.FOOTER />
        )}
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
