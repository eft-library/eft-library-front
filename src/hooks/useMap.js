import { useEffect, useState } from 'react';
import { LineBasicMaterial } from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import API from 'src/config/api';
import API_PATH from 'src/api/api_path';
import { MAP_LIST } from 'src/utils/mapConstants';

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

  return { map, loading };
};

export const useLoadMap = (map_id, lineColor) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadMapData = async () => {
      try {
        const response = await API.get(API_PATH.GET_MAP + '/' + map_id);
        const responseData = response.data.data;
        const loadedColladaData = await new Promise((resolve, reject) => {
          const loader = new ColladaLoader();
          loader.load(
            process.env.REACT_APP_NAS_URL + responseData.map_three_path,
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

export const useFindMap = (map_id, isSubMap = false) => {
  if (isSubMap) {
    const { map } = useGetMap(map_id);
    return map;
  } else {
    const { map } = useGetAllMap();
    return map.filter((item) => {
      return item.map_id === map_id;
    })[0];
  }
};
