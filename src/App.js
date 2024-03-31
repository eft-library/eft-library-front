import { Canvas } from '@react-three/fiber';
import './App.css';
// import MyElement3D from './MyElement3D';
import Seconde3D from './Seconde3D';

function App() {
  return (
    <>
      <Canvas gl={{ alpha: true }}>
        {/* <MyElement3D /> */}
        <Seconde3D />
      </Canvas>
    </>
  );
}

export default App;
