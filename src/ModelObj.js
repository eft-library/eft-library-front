/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { useLoader } from '@react-three/fiber';

const ModelObj = () => {
  const model = useLoader(ColladaLoader, './models/Duck.dae');
  console.log(model);

  return (
    <>
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      <OrbitControls />
      <primitive object={model} />
    </>
  );
};

export default ModelObj;
