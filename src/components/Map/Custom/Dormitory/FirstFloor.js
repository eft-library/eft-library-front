import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ItemList } from 'src/utils/itemConstants';
import {
  CANVAS_CAMERA_POSITION,
  CUSTOM_DORMITORY_FIRST_FLOOR,
} from 'src/utils/mapConstants';
import { BLACK } from 'src/utils/designConstants';
import { useLoadColladaMap } from 'src/hooks/useLoadMap';
import { useOrbitReset } from 'src/hooks/useOrbitReset';
import { useItemFilter } from 'src/hooks/useItemFilter';

function FirstFloor() {
  const colladaData = useLoadColladaMap(CUSTOM_DORMITORY_FIRST_FLOOR, BLACK);
  const { viewItemList, onClickItem } = useItemFilter();
  const orbitControls = useRef();

  if (!colladaData) return null;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      <div
        style={{
          width: '20%',
          display: 'block',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <div>
          <div>
            <button onClick={() => useOrbitReset(orbitControls)}>
              Reset Camera
            </button>
          </div>
          {ItemList.map((item, index) => (
            <>
              <button onClick={() => onClickItem(item.value)} key={index}>
                {item.kr}
              </button>
              <div>
                {item.child.map((childItem, childIndex) => (
                  <button
                    onClick={() => onClickItem(childItem.value)}
                    key={childIndex}
                  >
                    {childItem.kr}
                  </button>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
      <Canvas camera={CANVAS_CAMERA_POSITION} style={{ width: '80%' }}>
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
          {/* {viewItemList.includes(FilterItem.KEY_SPAWN) && (
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
          {viewItemList.includes(FilterItem.MED_CASE) && (
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
          )} */}
        </group>
        <OrbitControls ref={orbitControls} />
      </Canvas>
    </div>
  );
}

export default FirstFloor;
