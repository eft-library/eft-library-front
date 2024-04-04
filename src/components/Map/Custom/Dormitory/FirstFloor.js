import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ITEM_LIST } from 'src/utils/itemConstants';
import CUSTOM_DORMITORY_FIRST_FLOOR_INFO from 'src/utils/map/Custom/Dormitory/firstFloorConstants';
import ALL_COLOR from 'src/utils/designConstants';
import { useLoadColladaMap } from 'src/hooks/useLoadMap';
import { useOrbitReset } from 'src/hooks/useOrbitReset';
import { useItemFilter } from 'src/hooks/useItemFilter';
import { useHexFromDecimal } from 'src/hooks/useHexFromDecimal';
import TweetPage from 'src/components/Tweet/TweetPage';

function FirstFloor() {
  const colladaData = useLoadColladaMap(
    CUSTOM_DORMITORY_FIRST_FLOOR_INFO.PATH,
    ALL_COLOR.BLACK,
  );
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
          {ITEM_LIST.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => onClickItem(item.value)}
                style={
                  viewItemList.includes(item.value)
                    ? { color: 'hotpink' }
                    : { color: 'green' }
                }
              >
                {item.kr}
              </button>
              <div>
                {item.child.map((childItem, childIndex) => (
                  <button
                    onClick={() => onClickItem(childItem.value)}
                    key={childIndex} // 각각의 자식 요소에 key 할당
                    style={
                      viewItemList.includes(childItem.value)
                        ? { color: 'hotpink' }
                        : { color: 'green' }
                    }
                  >
                    {childItem.kr}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <TweetPage />
      </div>
      <Canvas
        camera={CUSTOM_DORMITORY_FIRST_FLOOR_INFO.CAMERA_POSITION}
        style={{
          width: '80%',
          backgroundColor: useHexFromDecimal(ALL_COLOR.BLACK_90),
        }}
      >
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
          {CUSTOM_DORMITORY_FIRST_FLOOR_INFO.ITEM_PATH.map(
            (item, index) =>
              viewItemList.includes(item.childValue) && (
                <mesh
                  key={index}
                  position={item.position}
                  scale={2}
                  renderOrder={0}
                >
                  <boxGeometry args={item.boxArgs} />
                  <meshStandardMaterial color={item.color} depthTest={false} />
                </mesh>
              ),
          )}
        </group>
        <OrbitControls ref={orbitControls} />
      </Canvas>
    </div>
  );
}

export default FirstFloor;
