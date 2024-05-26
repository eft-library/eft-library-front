import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

export default ExtendedOrbitControls;
