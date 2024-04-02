import React, { useState } from 'react';
import { useLoader, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';

function ModelObj() {
  const ITEM_KEY = 'key';
  const ITEM_HEAL = 'heal';
  const colladaData = useLoader(ColladaLoader, './models/f.dae');
  const [viewItem, setViewItem] = useState([ITEM_KEY, ITEM_HEAL]);

  const onClickItemButton = (itemName) => {
    if (viewItem.includes(itemName)) {
      setViewItem(viewItem.filter((item) => item !== itemName));
    } else {
      setViewItem([...viewItem, itemName]);
    }
  };

  // 재렌더링 시 매번 같은 머티리얼을 사용하여 material-depthTest 속성을 적용
  return (
    <>
      <div>
        <button onClick={() => onClickItemButton(ITEM_KEY)}>Key Filter</button>
        <button onClick={() => onClickItemButton(ITEM_HEAL)}>
          Heal Filter
        </button>
      </div>
      <Canvas camera={{ fov: 75, position: [-10, 20, 20] }}>
        <axesHelper scale={10} />
        <ambientLight intensity={2.5} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        {colladaData && (
          <group
            renderOrder={1}
            // 클릭시 좌표 출력 => 여기에 상자 만들어서 아이템 위치 표시
            onClick={(e) => {
              console.log(e.point);
            }}
          >
            <primitive object={colladaData.scene} position={[-20, -1, 20]} />
            {viewItem.includes(ITEM_KEY) && (
              <>
                <mesh
                  position={[17.171613125156625, 0, 10.340594377946204]}
                  scale={2}
                  renderOrder={0}
                >
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color={'black'} depthTest={false} />
                </mesh>
                <mesh
                  position={[1.6616028104096472, 0, -4.771423199611192]}
                  scale={2}
                  renderOrder={0}
                >
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color={'yellow'} depthTest={false} />
                </mesh>
              </>
            )}
            {viewItem.includes(ITEM_HEAL) && (
              <>
                <mesh
                  position={[6.063382195161616, 0, 11.320286508856583]}
                  scale={2}
                  renderOrder={0}
                >
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color={'green'} depthTest={false} />
                </mesh>
              </>
            )}
          </group>
        )}
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default ModelObj;
