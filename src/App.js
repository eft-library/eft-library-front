import { Canvas } from '@react-three/fiber';
import './App.css';
import MyElement3D from './MyElement3D';

function App() {
  return (
    <>
      <Canvas>
        <MyElement3D />
      </Canvas>
    </>
  );
}

export default App;
