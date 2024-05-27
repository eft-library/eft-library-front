import { useEffect, useState } from 'react';
import API from 'src/config/api';
import API_PATH from 'src/api/api_path';

export const useNavi = () => {
  const [navi, setNavi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(API_PATH.GET_NAVI_MENU);
        const responseData = response.data.data;
        setNavi(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching navigation data:', error);
        setLoading(false);
      }
    };

    // navi가 null일 때만 데이터를 가져오도록 설정
    if (navi === null) {
      fetchData();
    }
  }, [navi]); // navi가 변경될 때만 useEffect 재실행

  return { navi, loading };
};

export const useGetInfo = () => {
  const [mainInfo, setMainInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(API_PATH.GET_MAIN_INFO);
        const responseData = response.data.data;
        setMainInfo(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching main info data:', error);
        setLoading(false);
      }
    };

    if (mainInfo === null) {
      fetchData();
    }
  }, [mainInfo]);

  return { mainInfo, loading };
};
