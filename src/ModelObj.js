/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */

import React, { useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';

function ModelObj() {
  const [dae, setDae] = useState();
  // const gltfData = useGLTF('./models/d.glb');
  const colladaData = useLoader(ColladaLoader, './models/f.dae');

  // 모델 로드 후 실행
  useState(() => {
    if (colladaData) {
      const { scene } = colladaData;
      setDae(scene);
    }
  }, [colladaData]);

  return (
    <>
      <ambientLight intensity={2.5} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      <group>
        <primitive object={dae} position={[-20, -1, 20]} />
      </group>
      <OrbitControls />
    </>
  );
}

export default ModelObj;
