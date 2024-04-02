import React, { useEffect } from 'react';
import { useLoader, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { LineBasicMaterial } from 'three';

function LastModelObj() {
  const colladaData = useLoader(ColladaLoader, './models/d.dae');

  useEffect(() => {
    if (colladaData) {
      const { scene } = colladaData;
      // 모델의 모든 자식 노드를 반복하여 선을 검정색으로 설정
      scene.traverse((child) => {
        if (child.isLine) {
          // 선의 재질을 검정색으로 설정
          const lineMaterial = new LineBasicMaterial({ color: 0x000000 });
          child.material = lineMaterial;
        }
      });
    }
  }, [colladaData]);

  return (
    <Canvas camera={{ fov: 75, position: [-10, 20, 20] }}>
      <axesHelper scale={10} />
      <ambientLight intensity={2.5} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      {colladaData && (
        <group renderOrder={1}>
          <primitive object={colladaData.scene} position={[0, 0, 0]} />
        </group>
      )}
      <OrbitControls />
    </Canvas>
  );
}

export default LastModelObj;
