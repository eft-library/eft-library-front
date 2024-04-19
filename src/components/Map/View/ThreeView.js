import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ALL_ITEM } from 'src/utils/itemConstants';
import { MAP_COLOR, ALL_COLOR } from 'src/utils/colorConstants';
import MapViewSkeleton from 'src/components/Map/View/MapViewSkeleton';
import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';

const ThreeView = ({ map, viewItemList }) => {
  const mapData = hooks.useLoadMap(map.map_id, MAP_COLOR.MAP_BLACK);
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
        onClick={(e) => {
          console.log(e.point);
        }}
      >
        <primitive object={mapData.colladaData.scene} position={[0, 0, 0]} />
        {mapData.map_three_item_path.map(
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
  // map: PropTypes.objectOf(
  //   PropTypes.shape({
  //     map_name_kr: PropTypes.string.isRequired,
  //     map_name_en: PropTypes.string.isRequired,
  //     map_id: PropTypes.string.isRequired,
  //     map_three_path: PropTypes.string.isRequired,
  //     map_update_time: PropTypes.string.isRequired,
  //     map_jpg_path: PropTypes.string.isRequired,
  //     map_depth: PropTypes.number.isRequired,
  //     map_link: PropTypes.string.isRequired,
  //     map_three_item_path: PropTypes.arrayOf(
  //       PropTypes.shape({
  //         color: PropTypes.string.isRequired,
  //         boxArgs: PropTypes.arrayOf(PropTypes.number.isRequired),
  //         position: PropTypes.arrayOf(PropTypes.number.isRequired),
  //         childValue: PropTypes.string.isRequired,
  //         motherValue: PropTypes.string.isRequired,
  //       }),
  //     ),
  //     map_main_image: PropTypes.string.isRequired,
  //     map_jpg_item_path: PropTypes.arrayOf(
  //       PropTypes.shape({
  //         item: PropTypes.number,
  //       }),
  //     ),
  //     map_sub: PropTypes.arrayOf(
  //       PropTypes.shape({
  //         map_name_kr: PropTypes.string.isRequired,
  //         map_name_en: PropTypes.string.isRequired,
  //         map_id: PropTypes.string.isRequired,
  //         map_three_path: PropTypes.string.isRequired,
  //         map_update_time: PropTypes.string.isRequired,
  //         map_jpg_path: PropTypes.string.isRequired,
  //         map_depth: PropTypes.number.isRequired,
  //         map_link: PropTypes.string.isRequired,
  //         map_three_item_path: PropTypes.arrayOf(
  //           PropTypes.shape({
  //             color: PropTypes.string.isRequired,
  //             boxArgs: PropTypes.arrayOf(PropTypes.number.isRequired),
  //             position: PropTypes.arrayOf(PropTypes.number.isRequired),
  //             childValue: PropTypes.string.isRequired,
  //             motherValue: PropTypes.string.isRequired,
  //           }),
  //         ),
  //         map_main_image: PropTypes.string.isRequired,
  //         map_jpg_item_path: PropTypes.arrayOf(
  //           PropTypes.shape({
  //             item: PropTypes.number,
  //           }),
  //         ),
  //         map_parent_value: PropTypes.string.isRequired,
  //       }),
  //     ),
  //   }),
  // ).isRequired,
  viewItemList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ThreeView;
