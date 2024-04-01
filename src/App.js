/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import './App.css';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import ModelObj from './ModelObj';

function App() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas>
        <ModelObj />
        <axesHelper scale={10} />
      </Canvas>
    </div>
  );
}

export default App;
