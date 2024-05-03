import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ALL_ITEM } from 'src/utils/itemConstants';
import { MAP_COLOR, ALL_COLOR } from 'src/utils/colorConstants';
import ThreeViewSkeleton from 'src/components/Map/View/ThreeViewSkeleton';
import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';
import ExtendedOrbitControls from './ExtendOrbitControls';

const ThreeView = ({ map, viewItemList }) => {
  const collada = hooks.useLoadMap(map.map_three_path, true);
  const door = hooks.useLoadMap('/tkw_map/filter/door.dae', false);
  if (!collada || !door) return <ThreeViewSkeleton />;

  return (
    <Canvas
      camera={{ position: [0, 60, 0] }}
      style={{
        backgroundColor: MAP_COLOR.MAP_THREE_BACKGROUND,
        height: '100vh',
      }}
    >
      <ExtendedOrbitControls />
      <ambientLight intensity={2} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      <group
        onClick={(e) => {
          console.log(e.point);
        }}
      >
        <primitive object={door.colladaData.scene} position={[0, 10, 0]} />
        <primitive object={collada.colladaData.scene} position={[0, 0, 0]} />

        {map.map_three_item_path.map(
          (item, index) =>
            viewItemList.includes(ALL_ITEM[item.childValue]) && (
              <mesh key={index} position={item.position} scale={2}>
                <boxGeometry args={item.boxArgs} />
                <meshStandardMaterial
                  color={ALL_COLOR[item.color]}
                  depthTest={false}
                />
              </mesh>
            ),
        )}
      </group>
    </Canvas>
  );
};

ThreeView.propTypes = {
  map: PropTypes.object,
  viewItemList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ThreeView;
