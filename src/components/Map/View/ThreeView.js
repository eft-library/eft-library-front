import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ALL_ITEM } from 'src/utils/itemConstants';
import { MAP_COLOR, ALL_COLOR } from 'src/utils/colorConstants';
import MapViewSkeleton from 'src/components/Map/View/MapViewSkeleton';
import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';

const ThreeView = ({ map, viewItemList }) => {
  const mapData = hooks.useLoadMap(map.path, MAP_COLOR.MAP_BLACK);
  const orbitControls = useRef();

  if (!mapData) return <MapViewSkeleton />;

  return (
    <Canvas
      camera={{ position: [0, 10, 10] }}
      style={{
        backgroundColor: hooks.useHexFromDecimal(ALL_COLOR.BLACK_90),
        height: '100vh',
      }}
    >
      <axesHelper scale={10} />
      <ambientLight intensity={2} />
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
  );
};

ThreeView.propTypes = {
  map: PropTypes.objectOf(
    PropTypes.shape({
      krName: PropTypes.string.isRequired,
      enName: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      jpg: PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      subMap: PropTypes.arrayOf(
        PropTypes.shape({
          krName: PropTypes.string.isRequired,
          enName: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
          jpg: PropTypes.string.isRequired,
          depth: PropTypes.number.isRequired,
          link: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
  viewItemList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ThreeView;
