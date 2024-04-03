import { LineBasicMaterial } from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { useLoader } from '@react-three/fiber';

export const useLoadColladaMap = (colladaDataPath, lineColor) => {
  if (colladaDataPath) {
    const colladaData = useLoader(ColladaLoader, colladaDataPath);
    const { scene } = colladaData;
    // 모델의 모든 자식 노드를 반복하여 선을 입력값으로 설정
    scene.traverse((child) => {
      if (child.isLine) {
        // 선의 재질을 검정색으로 설정
        const lineMaterial = new LineBasicMaterial({ color: lineColor });
        child.material = lineMaterial;
      }
    });
    return colladaData;
  }
};
