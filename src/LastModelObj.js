import React, { useState } from 'react';
import { useLoader, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';

function ModelObj() {
  const [dae, setDae] = useState();
  const colladaData = useLoader(ColladaLoader, './models/f.dae');

  // 모델 로드 후 실행
  useState(() => {
    if (colladaData) {
      const { scene } = colladaData;
      setDae(scene);
    }
  }, [colladaData]);

  return (
    <Canvas camera={{ fov: 75, position: [-10, 20, 20] }}>
      <axesHelper scale={10} />
      <ambientLight intensity={2.5} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      <group renderOrder={1}>
        <primitive object={dae} position={[-20, -1, 20]} />
      </group>
      <mesh
        position={[0, 1, 0]}
        scale={1}
        renderOrder={0}
        material-depthTest={false}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}

export default ModelObj;
