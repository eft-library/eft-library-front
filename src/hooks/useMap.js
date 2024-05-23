import { useEffect, useState } from 'react';
import { LineBasicMaterial } from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { MAP_COLOR } from 'src/utils/consts/colorConsts';
import API from 'src/config/api';
import API_PATH from 'src/api/api_path';

export const useGetAllMap = () => {
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(API_PATH.GET_ALL_MAP);
        const responseData = response.data.data;
        setMap(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching map data:', error);
        setLoading(false);
      }
    };

    if (map === null) {
      fetchData();
    }
  }, [map]);

  return { map, loading };
};

export const useGetMap = (map_id) => {
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(API_PATH.GET_MAP + '/' + map_id);
        const responseData = response.data.data;
        setMap(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching map data:', error);
        setLoading(false);
      }
    };

    if (map === null) {
      fetchData();
    }
  }, [map]);

  return { detailMap: map, loading };
};

export const useLoadMap = (map_three_path, isMap) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadMapData = async () => {
      try {
        const loadedColladaData = await new Promise((resolve, reject) => {
          const loader = new ColladaLoader();
          loader.load(
            process.env.REACT_APP_NAS_URL + map_three_path,
            (collada) => resolve(collada),
            undefined,
            (error) => reject(error),
          );
        });

        // 모델의 모든 자식 노드를 반복하여 선을 입력값으로 설정
        loadedColladaData.scene.traverse((child) => {
          if (child.isLine) {
            // 선의 재질을 설정
            const lineMaterial = new LineBasicMaterial({
              color: MAP_COLOR.MAP_BLACK,
            });
            child.material = lineMaterial;

            if (!isMap) {
              // isMap이 false일 때 depthTest를 비활성화하고 렌더링 순서 설정
              child.renderOrder = 2;
              child.material.depthTest = false;
            }
          }

          if (!isMap && child.isMesh) {
            // isMap이 false이고 Mesh인 경우에만 depthTest를 비활성화하고 렌더링 순서 설정
            child.renderOrder = 1;
            child.material.depthTest = false;
          } else if (child.isGroup && !isMap) {
            // isMap이 false이고 Group인 경우 하위 모든 Mesh 객체의 depthTest를 비활성화하고 렌더링 순서 설정
            child.children.forEach((subChild) => {
              if (subChild.isMesh) {
                subChild.renderOrder = 1;
                subChild.material.depthTest = false;
              }
            });
          } else if (isMap) {
            // isMap이 true일 때 Mesh 객체의 렌더링 순서 설정
            child.renderOrder = 0;
          }
        });

        // 상태를 업데이트
        setMap({ colladaData: loadedColladaData });
      } catch (e) {
        console.log(e);
      }
    };

    if (map === null) {
      loadMapData();
    }
  }, []);

  return map;
};
