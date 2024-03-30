/* eslint-disable react/no-unknown-property */
function MyElement3D() {
  return (
    <>
      <directionalLight position={[1, 1, 1]} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color={'#e67e22'} />
      </mesh>
    </>
  );
}

export default MyElement3D;
