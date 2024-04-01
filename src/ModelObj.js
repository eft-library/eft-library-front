/* eslint-disable react/no-unknown-property */

import React, { useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';

function ModelObj() {
  const [dae, setDae] = useState();
  const colladaData = useLoader(ColladaLoader, './models/d.dae');

  // 모델 로드 후 실행
  useState(() => {
    if (colladaData) {
      const { scene } = colladaData;
      setDae(scene);
    }
  }, [colladaData]);

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[0, 0, 0]} intensity={1} />
      <group>
        <primitive object={dae} />
      </group>
      <OrbitControls />
    </>
  );
}

export default ModelObj;
