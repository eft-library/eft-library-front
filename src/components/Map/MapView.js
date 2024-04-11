import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ALL_ITEM } from 'src/utils/itemConstants';
import ALL_COLOR from 'src/utils/designConstants';
import MapViewSkeleton from 'src/components/Map/MapViewSkeleton';
import ItemSelector from 'src/components/Map/ItemSelector';
import hooks from 'src/hooks/hooks';

const MapView = (props) => {
  const mapInfo = props.mapInfo;
  const mapData = hooks.useLoadMap(mapInfo.PATH, ALL_COLOR.BLACK);
  const { viewItemList, onClickItem } = hooks.useItemFilter();
  const orbitControls = useRef();

  if (!mapData) return <MapViewSkeleton />;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      <ItemSelector
        orbitControls={orbitControls}
        viewItemList={viewItemList}
        onClickItem={onClickItem}
      />
      <Canvas
        camera={mapInfo.CAMERA_POSITION}
        style={{
          width: '80%',
          backgroundColor: hooks.useHexFromDecimal(ALL_COLOR.BLACK_90),
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
          <primitive object={mapData.colladaData.scene} position={[0, 0, 0]} />
          {mapData.three_map_item_path.map(
            (item, index) =>
              viewItemList.includes(ALL_ITEM[item.childValue]) && (
                <mesh
                  key={index}
                  position={item.position}
                  scale={2}
                  renderOrder={0}
                >
                  <boxGeometry args={item.boxArgs} />
                  <meshStandardMaterial
                    color={ALL_COLOR[item.color]}
                    depthTest={false}
                  />
                </mesh>
              ),
          )}
        </group>
        <OrbitControls ref={orbitControls} />
      </Canvas>
    </div>
  );
};

export default MapView;
