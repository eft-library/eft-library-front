import { Canvas } from '@react-three/fiber';
import './App.css';
import ModelObj from './ModelObj';
// import MyElement3D from './MyElement3D';
// import Seconde3D from './Seconde3D';

function App() {
  return (
    <>
      <Canvas>
        <axesHelper scale={10} />
        {/* <MyElement3D /> */}
        {/* <Seconde3D /> */}
        <ModelObj />
      </Canvas>
    </>
  );
}

export default App;
