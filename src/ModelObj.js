import React, { useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { FModel } from './FModel';

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
        <mesh position={[0, 1, 0]} scale={5}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
        {/* <FModel /> */}
      </group>
      <OrbitControls />
    </>
  );
}

export default ModelObj;
