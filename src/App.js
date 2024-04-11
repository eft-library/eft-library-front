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
          <Route path="*" element={<PageRouter.NOT_FOUND />} />
        </Routes>
        <PageRouter.FOOTER />
      </BrowserRouter>
    </div>
  );
}

export default App;
