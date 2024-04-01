import React from 'react';
import { useLoader, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { MeshStandardMaterial } from 'three';

function ModelObj() {
  const colladaData = useLoader(ColladaLoader, './models/f.dae');

  // 재렌더링 시 매번 같은 머티리얼을 사용하여 material-depthTest 속성을 적용
  const material = React.useMemo(
    () => new MeshStandardMaterial({ color: 'red', depthTest: false }),
    [],
  );

  return (
    <Canvas camera={{ fov: 75, position: [-10, 20, 20] }}>
      <axesHelper scale={10} />
      <ambientLight intensity={2.5} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      {colladaData && (
        <group renderOrder={1}>
          <primitive object={colladaData.scene} position={[-20, -1, 20]} />
        </group>
      )}
      <mesh
        position={[0, 1, 0]}
        scale={1}
        renderOrder={0}
        material={material} // 새로 생성한 머티리얼을 적용
      >
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}

export default ModelObj;
