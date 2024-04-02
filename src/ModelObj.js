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
        <group
          renderOrder={1}
          onClick={(e) => {
            console.log(e.point);
          }}
        >
          <primitive object={colladaData.scene} position={[-20, -1, 20]} />
          <mesh
            position={[
              1.6616028104096472, -0.26888365438216044, -4.771423199611192,
            ]}
            scale={1}
            renderOrder={0}
            material={material}
          >
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
          <mesh
            position={[
              17.171613125156625, -0.2688836543821609, 10.340594377946204,
            ]}
            scale={1}
            renderOrder={0}
            material={material}
          >
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
          <mesh
            position={[
              6.063382195161616, -0.26888365438215966, 11.320286508856583,
            ]}
            scale={1}
            renderOrder={0}
            material={material}
          >
            <boxGeometry args={[1, 1, 1]} />
          </mesh>
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
