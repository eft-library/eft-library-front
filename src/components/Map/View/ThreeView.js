import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ALL_ITEM } from 'src/utils/itemConstants';
import { MAP_COLOR, ALL_COLOR } from 'src/utils/colorConstants';
import ThreeViewSkeleton from 'src/components/Map/View/ThreeViewSkeleton';
import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';

const ThreeView = ({ map, viewItemList }) => {
  const collada = hooks.useLoadMap(map.map_three_path, MAP_COLOR.MAP_BLACK);
  const ExtendedOrbitControls = () => {
    const movementSpeed = 0.5;
    const { camera, gl } = useThree();
    const keys = useRef({});

    useEffect(() => {
      const controls = new OrbitControls(camera, gl.domElement);
      controls.enableKeys = false; // 키보드 조작 비활성화
      controls.zoomSpeed = 0.5;

      const handleKeyDown = (event) => {
        keys.current[event.code] = true;
      };

      const handleKeyUp = (event) => {
        keys.current[event.code] = false;
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('keyup', handleKeyUp);
      };
    }, [camera, gl]);

    useEffect(() => {
      const updateCameraPosition = () => {
        const { x, y, z } = camera.position;
        const moveDistance = movementSpeed;
        if (keys.current['KeyW']) {
          camera.position.set(x, y, z - moveDistance);
        }
        if (keys.current['KeyS']) {
          camera.position.set(x, y, z + moveDistance);
        }
        if (keys.current['KeyA']) {
          camera.position.set(x - moveDistance, y, z);
        }
        if (keys.current['KeyD']) {
          camera.position.set(x + moveDistance, y, z);
        }
      };

      const animate = () => {
        if (
          keys.current['KeyW'] ||
          keys.current['KeyS'] ||
          keys.current['KeyA'] ||
          keys.current['KeyD']
        ) {
          updateCameraPosition();
        }

        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animate);
      };
    }, [camera, movementSpeed]);

    return null;
  };
  if (!collada) return <ThreeViewSkeleton />;

  return (
    <Canvas
      camera={{ position: [0, 30, 30] }}
      style={{
        backgroundColor: MAP_COLOR.MAP_THREE_BACKGROUND,
        height: '100vh',
      }}
    >
      <axesHelper scale={10} />
      <ExtendedOrbitControls />
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
    </Canvas>
  );
};

ThreeView.propTypes = {
  map: PropTypes.object,
  viewItemList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ThreeView;
