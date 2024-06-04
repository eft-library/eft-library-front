import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';
import { MapControls } from '@react-three/drei';
import ItemBox from './ThreeItem';

const ThreeView = ({ map, viewItemList }) => {
  const collada = hooks.useLoadMap(map.three_image, true);

  if (!collada) return null;

  return (
    <Canvas
      camera={{ position: [0, 60, 0] }}
      style={{
        backgroundColor: ALL_COLOR.THREE_BACKGROUND,
        height: '100vh',
      }}
    >
      <MapControls />
      <ambientLight intensity={2} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      <group
        onClick={(e) => {
          console.log(e.point);
        }}
      >
        <primitive object={collada.colladaData.scene} position={[0, 0, 0]} />

        {map.three_item_path.map(
          (item, index) =>
            viewItemList.includes(item.childValue) && (
              <ItemBox
                position={item.position}
                boxArgs={item.boxArgs}
                key={index}
                value="test"
              />
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
