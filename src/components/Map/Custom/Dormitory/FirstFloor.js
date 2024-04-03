import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FilterItem } from 'src/utils/itemConstants';
import { CUSTOM_DORMITORY_FIRST_FLOOR } from 'src/utils/mapConstants';
import { useLoadColladaMap } from 'src/hooks/useLoadMap';
import { BLACK } from 'src/utils/designConstants';

function FirstFloor() {
  const CANVAS_CAMERA_POSITION = { position: [0, 10, 10] };
  const colladaData = useLoadColladaMap(CUSTOM_DORMITORY_FIRST_FLOOR, BLACK);
  const [viewItem, setViewItem] = useState([
    FilterItem.KEY_SPAWN,
    FilterItem.MED_CASE,
  ]);
  const orbitControls = useRef();

  const onClickItemButton = (itemName) => {
    if (viewItem.includes(itemName)) {
      setViewItem(viewItem.filter((item) => item !== itemName));
    } else {
      setViewItem([...viewItem, itemName]);
    }
  };

  const onClickResetCamera = () => {
    orbitControls.current.reset();
  };

  if (!colladaData) return null;

  // 재렌더링 시 매번 같은 머티리얼을 사용하여 material-depthTest 속성을 적용
  return (
    <>
      <div>
        <button onClick={() => onClickItemButton(FilterItem.KEY_SPAWN)}>
          Key Filter
        </button>
        <button onClick={() => onClickItemButton(FilterItem.MED_CASE)}>
          Heal Filter
        </button>
        <button onClick={() => onClickResetCamera()}>Reset Camera</button>
      </div>
      <Canvas camera={CANVAS_CAMERA_POSITION}>
        <axesHelper scale={10} />
        <ambientLight intensity={2.5} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        <group
          renderOrder={1}
          // 클릭시 좌표 출력 => 여기에 상자 만들어서 아이템 위치 표시
          onClick={(e) => {
            console.log(e.point);
          }}
        >
          <primitive object={colladaData.scene} position={[0, 0, 0]} />
          {viewItem.includes(FilterItem.KEY_SPAWN) && (
            <>
              <mesh
                position={[17.171613125156625, 0, 10.340594377946204]}
                scale={2}
                renderOrder={0}
              >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'black'} depthTest={false} />
              </mesh>
            </>
          )}
          {viewItem.includes(FilterItem.MED_CASE) && (
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
        <OrbitControls ref={orbitControls} />
      </Canvas>
    </>
  );
}

export default FirstFloor;
