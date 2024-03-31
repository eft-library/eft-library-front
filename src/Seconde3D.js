/* eslint-disable react/no-unknown-property */
import { OrbitControls, Box } from '@react-three/drei';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function MyBox(props) {
  const geom = new THREE.BoxGeometry();
  return <mesh {...props} geometry={geom}></mesh>;
}

const Seconde3D = () => {
  const refMesh = useRef();
  const refWireMesh = useRef();

  // leva 라이브러리에서 제공하는 ui를 통한 크기 변경 컨트롤러
  // const { xSize, ySize, zSize, xSegements, ySegements, zSegements } =
  //   useControls({
  //     xSize: { value: 1, min: 0.1, max: 5, step: 0.01 },
  //     ySize: { value: 1, min: 0.1, max: 5, step: 0.01 },
  //     zSize: { value: 1, min: 0.1, max: 5, step: 0.01 },
  //     xSegements: { value: 1, min: 1, max: 10, step: 1 },
  //     ySegements: { value: 1, min: 1, max: 10, step: 1 },
  //     zSegements: { value: 1, min: 1, max: 10, step: 1 },
  //   });

  // const {
  //   radius,
  //   widthSegements,
  //   heightSegements,
  //   phiStart,
  //   phiLength,
  //   thetaStart,
  //   thetaLength,
  // } = useControls({
  //   radius: { value: 1, min: 0.1, max: 5, step: 0.1 },
  //   widthSegements: { value: 32, min: 3, max: 256, step: 1 },
  //   heightSegements: { value: 32, min: 3, max: 256, step: 1 },
  //   phiStart: { value: 0, min: 0, max: 360, step: 0.1 },
  //   phiLength: { value: 360, min: 0, max: 360, step: 0.1 },
  //   thetaStart: { value: 0, min: 0, max: 180, step: 0.1 },
  //   thetaLength: { value: 180, min: 0, max: 180, step: 0.1 },
  // });

  const {
    topRadius,
    bottomRadius,
    height,
    radialSegements,
    heightSegements,
    bOpen,
    thetaLength,
    thetaStart,
  } = useControls({
    topRadius: { value: 1, min: 0.1, max: 5, step: 0.01 },
    bottomRadius: { value: 1, min: 0.1, max: 5, step: 0.01 },
    height: { value: 1, min: 0.1, max: 5, step: 0.01 },
    radialSegements: { value: 32, min: 3, max: 256, step: 1 },
    heightSegements: { value: 1, min: 1, max: 256, step: 1 },
    bOpen: { value: false },
    thetaStart: { value: 0, min: 0, max: 360, step: 0.01 },
    thetaLength: { value: 0, min: 0, max: 360, step: 0.01 },
  });

  // useEffect(() => {
  //   refWireMesh.current.geometry = refMesh.current.geometry;
  // }, [xSize, ySize, zSize, xSegements, ySegements, zSegements]);

  // useEffect(() => {
  //   refWireMesh.current.geometry = refMesh.current.geometry;
  // }, [
  //   radius,
  //   widthSegements,
  //   heightSegements,
  //   phiStart,
  //   phiLength,
  //   thetaStart,
  //   thetaLength,
  // ]);

  useEffect(() => {
    refWireMesh.current.geometry = refMesh.current.geometry;
  }, [
    topRadius,
    bottomRadius,
    height,
    radialSegements,
    heightSegements,
    bOpen,
    thetaStart,
    thetaLength,
  ]);

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.6} />

      {/* ref를 사용해서 boxGeometry를 여러개 사용하지 않고 하나로 컨트롤하기 */}
      {/* <mesh ref={refMesh}>
        <boxGeometry
          args={[xSize, ySize, zSize, xSegements, ySegements, zSegements]}
        />
        <meshStandardMaterial color={'#1abc9c'} />
      </mesh> */}

      {/* sphereGemetry */}
      <mesh ref={refMesh}>
        <cylinderGeometry
          args={[
            topRadius,
            bottomRadius,
            height,
            radialSegements,
            heightSegements,
            bOpen,
            THREE.MathUtils.degToRad(thetaStart),
            THREE.MathUtils.degToRad(thetaLength),
          ]}
        />
        {/* <sphereGeometry
          args={[
            radius,
            widthSegements,
            heightSegements,
            THREE.MathUtils.degToRad(phiStart),
            THREE.MathUtils.degToRad(phiLength),
            THREE.MathUtils.degToRad(thetaStart),
            THREE.MathUtils.degToRad(thetaLength),
          ]}
        /> */}
        <meshStandardMaterial color={'#1abc9c'} />
      </mesh>

      <mesh ref={refWireMesh}>
        <meshStandardMaterial emissive={'yellow'} wireframe />
      </mesh>

      {/*좌표 옮기기  */}
      <Box position={[10, 0, 0]}>
        <meshStandardMaterial color={'#8e44ad'} />
      </Box>

      {/* 커스텀 함수  */}
      <MyBox position={[-10, 0, 0]}>
        <meshStandardMaterial color={'#e74c3c'} />
      </MyBox>

      <axesHelper scale={10} />
    </>
  );
};

export default Seconde3D;
