import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ALL_ITEM } from 'src/utils/itemConstants';
import { MAP_COLOR, ALL_COLOR } from 'src/utils/colorConstants';
import MapViewSkeleton from 'src/components/Map/View/MapViewSkeleton';
import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';

const ThreeView = ({ map, viewItemList }) => {
  const collada = hooks.useLoadMap(map.map_three_path, MAP_COLOR.MAP_BLACK);
  if (!collada) return <MapViewSkeleton />;

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
        onClick={(e) => {
          console.log(e.point);
        }}
      >
        <primitive object={collada.colladaData.scene} position={[0, 0, 0]} />
        {map.map_three_item_path.map(
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
      <OrbitControls />
    </Canvas>
  );
};

ThreeView.propTypes = {
  map: PropTypes.object,
  viewItemList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ThreeView;
