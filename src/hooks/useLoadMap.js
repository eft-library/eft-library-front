import { LineBasicMaterial } from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import api from 'src/utils/api';
import { useEffect, useState } from 'react';

/**
 * Collada 파일을 읽은 후 라인을 특정 색상으로 변경한 뒤 반환하는 함수
 */
export const useLoadMap = (mapPath, lineColor) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadMapData = async () => {
      try {
        const response = await api.get(mapPath);
        const responseData = response.data.data;
        const loadedColladaData = await new Promise((resolve, reject) => {
          const loader = new ColladaLoader();
          loader.load(
            process.env.REACT_APP_NAS_URL + responseData.three_map_path,
            (collada) => resolve(collada),
            undefined,
            (error) => reject(error),
          );
        });

        // 모델의 모든 자식 노드를 반복하여 선을 입력값으로 설정
        loadedColladaData.scene.traverse((child) => {
          if (child.isLine) {
            // 선의 재질을 입력 받은 값으로 설정
            const lineMaterial = new LineBasicMaterial({ color: lineColor });
            child.material = lineMaterial;
          }
        });

        // 상태를 업데이트
        setMap({ ...responseData, colladaData: loadedColladaData });
      } catch (e) {
        console.log(e);
      }
    };

    loadMapData();
  }, []);

  return map;
};
