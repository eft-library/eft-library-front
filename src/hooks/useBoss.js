import { useEffect, useState } from 'react';
import API from 'src/config/api';
import API_PATH from 'src/api/api_path';

export const useGetAllBoss = () => {
  const [boss, setBoss] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(API_PATH.GET_ALL_BOSS);
        const responseData = response.data.data;
        setBoss(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching boss data:', error);
        setLoading(false);
      }
    };

    if (boss === null) {
      fetchData();
    }
  }, []);

  return { boss, loading };
};
